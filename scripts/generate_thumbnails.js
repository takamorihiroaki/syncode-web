const fs = require('fs');
const path = require('path');

const articles = [
  { order: 1, file: 'post-1.mdx', title: 'AIとの同期、その始まり。', sub: 'CHRONICLES VOL.01 // INCEPTION' },
  { order: 2, file: 'post-2.mdx', title: 'システムへ昇華。', sub: 'CHRONICLES VOL.02 // EVOLUTION' },
  { order: 3, file: 'post-3.mdx', title: '対話の続き。', sub: 'CHRONICLES VOL.03 // DIALOGUE' },
  { order: 4, file: 'post-4.mdx', title: 'アイデンティティの形成。', sub: 'CHRONICLES VOL.04 // IDENTITY' },
  { order: 5, file: 'post-5.mdx', title: '審美眼の再構築。', sub: 'CHRONICLES VOL.05 // AESTHETICS' },
  { order: 6, file: 'post-6.mdx', title: '第一期の完結と反省。', sub: 'CHRONICLES VOL.06 // REFLECTION' },
  { order: 7, file: 'introduction-physical-breakdown.mdx', title: '物理的破綻の現実', sub: 'CHRONICLES VOL.07 // BREAKDOWN' },
  { order: 8, file: 'chapter-1.mdx', title: '第1章：ディレクトリ構成', sub: 'CHRONICLES VOL.08 // STRUCTURE' },
  { order: 9, file: 'chapter-2.mdx', title: '第2章：3軸デバッグ', sub: 'CHRONICLES VOL.09 // DEBUGGING' },
  { order: 10, file: 'chapter-3.mdx', title: '第3章：情緒的ノイズの排除', sub: 'CHRONICLES VOL.10 // PRECISION' },
  { order: 11, file: 'chapter-4.mdx', title: '第4章：再構築のプロトコル', sub: 'CHRONICLES VOL.11 // RECONSTRUCTION' },
  { order: 12, file: 'conclusion.mdx', title: '終章：再スタートへの誓約', sub: 'CHRONICLES VOL.12 // COVENANT' },
];

function generateSVG(order, title, sub) {
  const color = order <= 6 ? '#6366f1' : '#0ea5e9'; // 前半は紫系、後半は青系
  const accent = order <= 6 ? '#818cf8' : '#38bdf8';

  return `<svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="mainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#020617;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0f172a;stop-opacity:1" />
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
    </pattern>
    <filter id="textGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <rect width="800" height="800" fill="url(#mainGrad)"/>
  <rect width="800" height="800" fill="url(#grid)"/>
  <rect x="150" y="250" width="500" height="300" rx="20" fill="rgba(255, 255, 255, 0.02)" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
  <text x="400" y="220" font-family="sans-serif" font-size="20" font-weight="700" fill="${color}" letter-spacing="0.4em" text-anchor="middle">${sub}</text>
  <text x="400" y="370" font-family="sans-serif" font-size="48" font-weight="700" fill="white" text-anchor="middle" filter="url(#textGlow)">${title}</text>
  <rect x="360" y="480" width="80" height="4" rx="2" fill="${accent}" />
  <path d="M 40 40 L 100 40 M 40 40 L 40 100" stroke="${color}" stroke-width="3" />
  <path d="M 760 760 L 700 760 M 760 760 L 760 700" stroke="${color}" stroke-width="3" />
  <text x="400" y="750" font-family="sans-serif" font-size="12" fill="rgba(255,255,255,0.3)" text-anchor="middle" letter-spacing="0.2em">SYNCODE CHRONICLES // PROJECT STATUS: ACTIVE</text>
</svg>`;
}

articles.forEach(art => {
  const svg = generateSVG(art.order, art.title, art.sub);
  const fileName = `series-vol${String(art.order).padStart(2, '0')}-premium.svg`;
  fs.writeFileSync(path.join('/Volumes/TOSHIBA EXT/syncode-web/public/assets', fileName), svg);
  console.log(`Generated ${fileName}`);
});
