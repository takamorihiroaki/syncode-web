import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { exec } from 'child_process';
import readline from 'readline';

const ARTICLES_DIR = './src/content/articles';
const SITE_URL = 'https://syncode.jp';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

function openUrl(url) {
  const start = (process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open');
  exec(`${start} "${url.replace(/"/g, '\\"')}"`);
}

async function preparePost() {
  const args = process.argv.slice(2);
  const targetDate = args[0]; // 引数があればその日付、なければ今日
  const today = new Date().toISOString().split('T')[0];
  const dateToFilter = targetDate === 'all' ? null : (targetDate || today);

  const files = fs.readdirSync(ARTICLES_DIR);
  const matchedArticles = [];

  for (const file of files) {
    if (!file.endsWith('.mdx')) continue;

    const filePath = path.join(ARTICLES_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(content);

    // 日付指定がある場合はその日付、'all'の場合は全記事、指定なしは今日
    const isTargetDate = dateToFilter ? data.date === dateToFilter : true;

    if (isTargetDate && data.draft !== true) {
      const slug = file.replace('.mdx', '');
      matchedArticles.push({
        title: data.title,
        url: `${SITE_URL}/articles/${slug}/`,
        tags: data.tags || [],
        date: data.date
      });
    }
  }

  // 日付順（降順）にソート
  matchedArticles.sort((a, b) => new Date(b.date) - new Date(a.date));

  if (matchedArticles.length === 0) {
    console.log(`${dateToFilter || '全期間'} の対象記事は見つかりませんでした。`);
    rl.close();
    return;
  }

  console.log(`\n対象記事（${dateToFilter || '全期間'}）が ${matchedArticles.length} 件見つかりました。\n`);

  for (let i = 0; i < matchedArticles.length; i++) {
    const article = matchedArticles[i];
    const hashtags = article.tags.map(tag => `${tag.replace(/\s+/g, '')}`).join(',');
    
    const text = `【NEW POST】\n${article.title}\n\n`;
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(article.url);
    const encodedHashtags = encodeURIComponent(hashtags);
    
    const intentUrl = `https://x.com/intent/tweet?text=${encodedText}&url=${encodedUrl}&hashtags=${encodedHashtags}`;
    
    console.log(`[${i + 1}/${matchedArticles.length}] --------------------------------`);
    console.log(`日付: ${article.date}`);
    console.log(`記事: ${article.title}`);
    console.log(`URL: ${article.url}`);
    
    const answer = await question('投稿画面を開きますか？ [Enter:開く / s:スキップ / q:終了]: ');
    
    if (answer.toLowerCase() === 'q') {
      console.log('終了します。');
      break;
    } else if (answer.toLowerCase() === 's') {
      console.log('スキップしました。');
      continue;
    } else {
      console.log('ブラウザを開いています...');
      openUrl(intentUrl);
    }
  }
  
  console.log(`\nすべての処理が完了しました。`);
  rl.close();
}

preparePost();
