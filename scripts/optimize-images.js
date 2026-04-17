import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// 設定
const TARGET_DIRS = ['public/assets', 'dist/assets'];
const MAX_WIDTH = 400;  // サムネイル解像度を最小化
const QUALITY = 30;     // 通信量最優先の圧縮設定
const SVG_QUALITY = 15; // 背景を徹底的に軽量化

async function optimizeImages() {
  console.log('🚀 Starting deep image optimization...');

  for (const dir of TARGET_DIRS) {
    if (!fs.existsSync(dir)) {
      console.log(`Directory not found, skipping: ${dir}`);
      continue;
    }

    const files = fs.readdirSync(dir);
    console.log(`\n📂 Processing directory: ${dir} (${files.length} files)`);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const ext = path.extname(file).toLowerCase();

      // SVG処理 (埋め込み画像の最適化)
      if (ext === '.svg') {
        await optimizeSvg(filePath);
        continue;
      }

      // ラスタ画像処理
      if (!['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
        continue;
      }

      await optimizeRaster(filePath);
    }
  }

  console.log('\n🎉 Deep optimization finished!');
}

async function optimizeRaster(filePath) {
  try {
    const stats = fs.statSync(filePath);
    const originalSize = stats.size;
    const file = path.basename(filePath);

    const image = sharp(filePath);
    const metadata = await image.metadata();

    let transformer = image;
    if (metadata.width && metadata.width > MAX_WIDTH) {
      transformer = transformer.resize(MAX_WIDTH, null, { withoutEnlargement: true });
    }

    // すべて WebP に寄せるか、元の拡張子を維持しつつ限界まで圧縮
    const ext = path.extname(filePath).toLowerCase();
    if (ext === '.png') {
      transformer = transformer.png({ quality: QUALITY, palette: true, compressionLevel: 9 });
    } else if (ext === '.webp') {
      transformer = transformer.webp({ quality: QUALITY, effort: 6 });
    } else {
      transformer = transformer.jpeg({ quality: QUALITY, mozjpeg: true });
    }

    const tempPath = `${filePath}.tmp`;
    await transformer.toFile(tempPath);

    const newStats = fs.statSync(tempPath);
    if (newStats.size < originalSize) {
      fs.renameSync(tempPath, filePath);
      console.log(`✅ ${file}: ${Math.round(originalSize/1024)}KB -> ${Math.round(newStats.size/1024)}KB`);
    } else {
      fs.unlinkSync(tempPath);
    }
  } catch (err) {
    console.error(`❌ Error processing ${filePath}:`, err.message);
  }
}

async function optimizeSvg(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalSize = Buffer.byteLength(content);
    
    // base64画像を探す (png, jpeg, または既に変換された webp)
    const base64Regex = /href="data:image\/(png|jpeg|webp);base64,([^"]+)"/g;
    let match;
    let hasChanges = false;

    // 非同期処理のために結果を溜める
    const matches = [];
    while ((match = base64Regex.exec(content)) !== null) {
      matches.push({
        full: match[0],
        type: match[1],
        data: match[2],
        index: match.index
      });
    }

    for (const m of matches) {
      const buffer = Buffer.from(m.data, 'base64');
      
      // sharpでWebP化して圧縮
      const optimizedBuffer = await sharp(buffer)
        .resize(MAX_WIDTH, null, { withoutEnlargement: true })
        .webp({ quality: SVG_QUALITY, effort: 6 })
        .toBuffer();
      
      const newBase64 = optimizedBuffer.toString('base64');
      const newHref = `href="data:image/webp;base64,${newBase64}"`;
      
      // 文字列置換
      content = content.replace(m.full, newHref);
      hasChanges = true;
    }

    if (hasChanges) {
      fs.writeFileSync(filePath, content);
      const newSize = Buffer.byteLength(content);
      if (newSize < originalSize) {
        console.log(`⚡ ${path.basename(filePath)} (SVG): ${Math.round(originalSize/1024)}KB -> ${Math.round(newSize/1024)}KB`);
      }
    }
  } catch (err) {
    console.error(`❌ Error processing SVG ${filePath}:`, err.message);
  }
}

optimizeImages();
