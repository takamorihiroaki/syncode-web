import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const articlesDir = './src/content/articles';
const outputDir = './public/assets';

// Get all log-*.mdx files
const files = fs.readdirSync(articlesDir)
  .filter(file => file.startsWith('log-') && file.endsWith('.mdx'));

const articles = files.map(file => {
  const fullPath = path.join(articlesDir, file);
  const content = fs.readFileSync(fullPath, 'utf-8');
  const { data } = matter(content);
  return {
    file,
    title: data.title,
    date: data.date,
  };
});

// Sort by date then filename
articles.sort((a, b) => new Date(a.date) - new Date(b.date) || a.file.localeCompare(b.file));

function generateSVG(order, title) {
  const vol = String(order).padStart(2, '0');
  const sub = `SYSTEM LOG VOL.${vol} // DEVELOPMENT`;
  const color = '#38bdf8'; // Sky blue for logs
  const accent = '#0ea5e9';

  // Title might be too long, wrap it if necessary or reduce font size
  const fontSize = title.length > 20 ? 32 : 40;

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
  <text x="400" y="380" font-family="sans-serif" font-size="${fontSize}" font-weight="700" fill="white" text-anchor="middle" filter="url(#textGlow)">${title}</text>
  <rect x="360" y="480" width="80" height="4" rx="2" fill="${accent}" />
  <path d="M 40 40 L 100 40 M 40 40 L 40 100" stroke="${color}" stroke-width="3" />
  <path d="M 760 760 L 700 760 M 760 760 L 760 700" stroke="${color}" stroke-width="3" />
  <text x="400" y="750" font-family="sans-serif" font-size="12" fill="rgba(255,255,255,0.3)" text-anchor="middle" letter-spacing="0.2em">SYNCODE CHRONICLES // PROJECT STATUS: ACTIVE</text>
</svg>`;
}

articles.forEach((art, index) => {
  const order = index + 1;
  const svg = generateSVG(order, art.title);
  const fileName = `log-thumbnail-${String(order).padStart(2, '0')}.svg`;
  fs.writeFileSync(path.join(outputDir, fileName), svg);
  console.log(`Generated ${fileName} for ${art.file}`);
});
