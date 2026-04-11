import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const ASSETS_DIR = 'public/assets';
const MAX_WIDTH = 1200; // ブログ記事に最適な最大幅
const QUALITY = 85;     // 視覚的に劣化が少ない品質

async function optimizeImages() {
  if (!fs.existsSync(ASSETS_DIR)) {
    console.log(`Directory not found: ${ASSETS_DIR}`);
    return;
  }

  const files = fs.readdirSync(ASSETS_DIR);
  const total = files.length;
  let optimized = 0;
  let skipped = 0;

  console.log(`🚀 Starting image optimization in ${ASSETS_DIR}...`);

  for (const file of files) {
    const filePath = path.join(ASSETS_DIR, file);
    const ext = path.extname(file).toLowerCase();

    // 処理対象の拡張子
    if (!['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
      continue;
    }

    try {
      const stats = fs.statSync(filePath);
      const originalWidthKB = Math.round(stats.size / 1024);

      // すでに十分小さい（例: 200KB以下）場合はスキップ（任意）
      if (originalWidthKB < 200) {
        skipped++;
        continue;
      }

      const image = sharp(filePath);
      const metadata = await image.metadata();

      // リサイズと圧縮
      let transformer = image;
      if (metadata.width && metadata.width > MAX_WIDTH) {
        transformer = transformer.resize(MAX_WIDTH);
      }

      // 形式に応じた圧縮設定
      if (ext === '.png') {
        transformer = transformer.png({ quality: QUALITY, compressionLevel: 9 });
      } else if (ext === '.webp') {
        transformer = transformer.webp({ quality: QUALITY });
      } else {
        transformer = transformer.jpeg({ quality: QUALITY, progressive: true });
      }

      // 一時ファイルに保存してから上書き（安全のため）
      const tempPath = `${filePath}.tmp`;
      await transformer.toFile(tempPath);
      
      const newStats = fs.statSync(tempPath);
      const newSizeKB = Math.round(newStats.size / 1024);

      if (newSizeKB < originalWidthKB) {
        fs.renameSync(tempPath, filePath);
        console.log(`✅ ${file}: ${originalWidthKB}KB -> ${newSizeKB}KB (Reduced ${Math.round((1 - newSizeKB / originalWidthKB) * 100)}%)`);
        optimized++;
      } else {
        fs.unlinkSync(tempPath);
        console.log(`⏭️ ${file}: Already optimized (${originalWidthKB}KB)`);
        skipped++;
      }
    } catch (err) {
      console.error(`❌ Error processing ${file}:`, err.message);
    }
  }

  console.log(`\n🎉 Optimization finished!`);
  console.log(`- Optimized: ${optimized}`);
  console.log(`- Skipped: ${skipped}`);
  console.log(`- Total processed: ${optimized + skipped} / ${total}\n`);
}

optimizeImages();
