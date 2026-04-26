import { google } from 'googleapis';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const siteUrl = process.env.GSC_SITE_URL;
const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const outputPath = process.env.GSC_OUTPUT_PATH || '/Volumes/TOSHIBA EXT/GoogleDrive/SYNCODE_Workspace/01_Sources/GSC_Analytics_Report.md';

if (!siteUrl) {
  console.error('エラー: .envファイルに GSC_SITE_URL が設定されていません。');
  process.exit(1);
}

const auth = new google.auth.GoogleAuth({
  keyFile: keyPath,
  scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
});

const searchconsole = google.searchconsole({ version: 'v1', auth });

async function runReport() {
  console.log('🔍 Search Consoleからデータを取得中...');

  try {
    const res = await searchconsole.searchanalytics.query({
      siteUrl: siteUrl,
      requestBody: {
        startDate: '30daysAgo',
        endDate: 'today',
        dimensions: ['query'],
        rowLimit: 15,
      },
    });

    generateMarkdownReport(res.data.rows || []);

  } catch (error) {
    console.error('Search Consoleデータの取得中にエラーが発生しました:', error.message);
  }
}

function generateMarkdownReport(rows) {
  const dateStr = new Date().toISOString().split('T')[0];
  let mdContent = `# 🔍 SYNCODE 検索パフォーマンスレポート (GSC)\n\n`;
  mdContent += `**出力日**: ${dateStr}\n`;
  mdContent += `**対象期間**: 過去30日間\n\n`;

  mdContent += `## 🔑 上位検索キーワード (Top 15)\n\n`;
  mdContent += `| キーワード | クリック数 | 表示回数 | CTR | 掲載順位 |\n`;
  mdContent += `| :--- | :--- | :--- | :--- | :--- |\n`;

  rows.forEach(row => {
    const query = row.keys[0];
    const clicks = row.clicks;
    const impressions = row.impressions;
    const ctr = (row.ctr * 100).toFixed(2) + '%';
    const position = row.position.toFixed(1);
    
    mdContent += `| ${query} | ${clicks} | ${impressions} | ${ctr} | ${position} |\n`;
  });

  mdContent += `\n--\n`;
  mdContent += `**NotebookLMへのプロンプト例**:\n`;
  mdContent += `「これらのキーワードの中で、表示回数は多いがクリック数が少ない（伸び代がある）ものはどれですか？」\n`;
  mdContent += `「上位キーワードに共通するユーザーの検索意図を分析し、新しい記事のタイトルを5つ提案してください。」\n`;

  fs.writeFileSync(outputPath, mdContent, 'utf8');
  console.log(`✅ レポートを保存しました: ${outputPath}`);
}

runReport();
