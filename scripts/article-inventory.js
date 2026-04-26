import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const articlesDir = '/Volumes/TOSHIBA EXT/syncode-web/src/content/articles';
const outputPath = '/Volumes/TOSHIBA EXT/GoogleDrive/SYNCODE_Workspace/01_Sources/Article_Inventory.md';

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

async function generateInventory() {
  console.log('📦 記事インベントリを作成中...');
  
  const allFiles = getAllFiles(articlesDir).filter(f => f.endsWith('.mdx'));
  
  const articles = allFiles.map(filePath => {
    const content = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(content);
    return {
      filename: path.basename(filePath),
      title: data.title || 'タイトルなし',
      date: data.date ? new Date(data.date).toISOString().split('T')[0] : '日付なし',
      category: data.category || '未分類',
      tags: data.tags || []
    };
  }).sort((a, b) => b.date.localeCompare(a.date));

  let md = `# 📦 SYNCODE 記事インベントリ (全${articles.length}件)\n\n`;
  md += `**最終更新**: ${new Date().toLocaleString('ja-JP')}\n\n`;
  md += `| 日付 | カテゴリ | タイトル | タグ |\n`;
  md += `| :--- | :--- | :--- | :--- |\n`;

  articles.forEach(a => {
    md += `| ${a.date} | ${a.category} | ${a.title} | ${a.tags.join(', ')} |\n`;
  });

  md += `\n--\n`;
  md += `**NotebookLMへのプロンプト例**:\n`;
  md += `「この記事一覧を見て、今後さらに強化すべきトピックや、シリーズ化できそうな内容を提案してください。」\n`;
  md += `「特定のカテゴリに偏りがないか分析し、読者の関心を広げるための新しい切り口を考えてください。」\n`;

  // 出力先ディレクトリが存在することを確認
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    console.log(`⚠️ 出力先ディレクトリが存在しません: ${outputDir}`);
    // ローカルのscratchにも保存しておく
    const fallbackPath = path.join(process.cwd(), 'scratch/Article_Inventory.md');
    if (!fs.existsSync(path.join(process.cwd(), 'scratch'))) {
        fs.mkdirSync(path.join(process.cwd(), 'scratch'));
    }
    fs.writeFileSync(fallbackPath, md, 'utf8');
    console.log(`✅ 代替パスに保存しました: ${fallbackPath}`);
  } else {
    fs.writeFileSync(outputPath, md, 'utf8');
    console.log(`✅ 記事インベントリを保存しました: ${outputPath}`);
  }
}

generateInventory();
