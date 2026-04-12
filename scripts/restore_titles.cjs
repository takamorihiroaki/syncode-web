const fs = require('fs');
const path = require('path');

const ARTICLES_DIR = '/Volumes/TOSHIBA EXT/syncode-web/src/content/articles';

const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.mdx'));

files.forEach(file => {
  const filePath = path.join(ARTICLES_DIR, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // 本文見出しからのID除去のみを再実行
  // # SYSTEM LOG #5436195C: -> # SYSTEM LOG:
  let newContent = content.replace(/^# SYSTEM LOG #[A-Z0-9]+:/m, '# SYSTEM LOG:');
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent);
    console.log(`- Refined Title in MDX: ${file}`);
  }
});

console.log('Title cleanup completed without changing images.');
