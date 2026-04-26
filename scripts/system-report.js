import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const outputPath = '/Volumes/TOSHIBA EXT/GoogleDrive/SYNCODE_Workspace/01_Sources/System_Health_Report.md';
const projectRoot = '/Volumes/TOSHIBA EXT/syncode-web';

async function generateReport() {
  console.log('🛠️ システム診断を実行中...');
  
  let report = `# 🛠️ SYNCODE システム診断レポート\n\n`;
  report += `**診断日時**: ${new Date().toLocaleString('ja-JP')}\n\n`;

  // 1. プロジェクト統計
  try {
    const articles = fs.readdirSync(path.join(projectRoot, 'src/content/articles')).filter(f => f.endsWith('.mdx')).length;
    const components = fs.readdirSync(path.join(projectRoot, 'src/components')).filter(f => f.endsWith('.astro')).length;
    const pages = fs.readdirSync(path.join(projectRoot, 'src/pages')).filter(f => f.endsWith('.astro') || f.endsWith('.mdx')).length;

    report += `## 📊 プロジェクト統計\n`;
    report += `*   **記事数 (MDX)**: ${articles}\n`;
    report += `*   **コンポーネント数**: ${components}\n`;
    report += `*   **ページ数**: ${pages}\n\n`;
  } catch (e) {
    report += `*統計の取得中にエラーが発生しました.*\n\n`;
  }

  // 2. Astro Check (構文・型チェック)
  report += `## 🔍 コード品質チェック (Astro Check)\n`;
  try {
    console.log('  - Astro Checkを実行中...');
    const checkOutput = execSync('npx astro check', { cwd: projectRoot, encoding: 'utf8', stdio: 'pipe' });
    report += `✅ **問題は見つかりませんでした。**\n\n\`\`\`\n${checkOutput}\n\`\`\`\n`;
  } catch (error) {
    report += `⚠️ **いくつかの問題が検出されました:**\n\n\`\`\`\n${error.stdout || error.message}\n\`\`\`\n`;
  }

  // 3. NotebookLMへの提案
  report += `## 🧠 NotebookLMへのプロンプト例\n`;
  report += `「システム診断で検出されたエラーを分析し、修正のための具体的なコードを提案してください。」\n`;
  report += `「現在の記事数とコンポーネント数のバランスを見て、サイトの構造をより整理するためのアドバイスをください。」\n`;

  fs.writeFileSync(outputPath, report, 'utf8');
  console.log(`✅ システムレポートを保存しました: ${outputPath}`);
}

generateReport();
