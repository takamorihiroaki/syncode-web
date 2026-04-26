import { BetaAnalyticsDataClient } from '@google-analytics/data';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// .envファイルを読み込む
dotenv.config();

const propertyId = process.env.GA4_PROPERTY_ID;
const outputPath = process.env.ANALYTICS_OUTPUT_PATH || '/Volumes/TOSHIBA EXT/GoogleDrive/SYNCODE_Workspace/01_Sources/GA4_Analytics_Report.md';

if (!propertyId) {
  console.error('エラー: .envファイルに GA4_PROPERTY_ID が設定されていません。');
  process.exit(1);
}

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  console.error('エラー: .envファイルに GOOGLE_APPLICATION_CREDENTIALS が設定されていません。');
  console.error('GCPサービスアカウントのJSONキーファイルへのパスを指定してください。');
  process.exit(1);
}

// クライアントの初期化（GOOGLE_APPLICATION_CREDENTIALSの環境変数を自動で読み込みます）
const analyticsDataClient = new BetaAnalyticsDataClient();

async function runReport() {
  console.log('📈 GA4からデータを取得中...');

  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: '30daysAgo',
          endDate: 'today',
        },
      ],
      dimensions: [
        {
          name: 'pagePath',
        },
      ],
      metrics: [
        {
          name: 'screenPageViews', // ページビュー数
        },
        {
          name: 'activeUsers', // アクティブユーザー数
        },
        {
          name: 'averageSessionDuration', // 平均セッション時間
        }
      ],
      orderBys: [
        {
          desc: true,
          metric: {
            metricName: 'screenPageViews',
          },
        },
      ],
      limit: 10, // 上位10件を取得
    });

    generateMarkdownReport(response);

  } catch (error) {
    console.error('データの取得中にエラーが発生しました:', error);
  }
}

function generateMarkdownReport(response) {
  const dateStr = new Date().toISOString().split('T')[0];
  let mdContent = `# 📊 SYNCODE アクセス解析レポート (GA4)\n\n`;
  mdContent += `**出力日**: ${dateStr}\n`;
  mdContent += `**対象期間**: 過去30日間\n\n`;

  mdContent += `## 🔝 トップページビュー上位10件\n\n`;
  mdContent += `| ページパス | ページビュー数 | アクティブユーザー数 | 平均セッション時間 (秒) |\n`;
  mdContent += `| :--- | :--- | :--- | :--- |\n`;

  response.rows.forEach(row => {
    const pagePath = row.dimensionValues[0].value;
    const pageViews = row.metricValues[0].value;
    const activeUsers = row.metricValues[1].value;
    const avgDuration = parseFloat(row.metricValues[2].value).toFixed(2);
    
    mdContent += `| ${pagePath} | ${pageViews} | ${activeUsers} | ${avgDuration} |\n`;
  });

  mdContent += `\n---\n`;
  mdContent += `**NotebookLMへのプロンプト例**:\n`;
  mdContent += `「このアクセス解析データを見て、次に改善すべきページとその理由を教えてください。」\n`;
  mdContent += `「平均セッション時間が短いページに対して、どのようなコンテンツを追加すべきか提案して。」\n`;

  // ファイルに書き出し
  fs.writeFileSync(outputPath, mdContent, 'utf8');
  console.log(`✅ レポートを保存しました: ${outputPath}`);
}

runReport();
