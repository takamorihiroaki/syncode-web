import fs from 'fs';
import path from 'path';

const PUBLIC_ASSETS_DIR = 'public/assets';
const ARCHIVE_DIR = 'archived_assets';
const USED_ASSETS_FILE = 'scratch/used_assets.txt';

if (!fs.existsSync(ARCHIVE_DIR)) {
  fs.mkdirSync(ARCHIVE_DIR);
}

const usedAssets = new Set(
  fs.readFileSync(USED_ASSETS_FILE, 'utf8')
    .split('\n')
    .map(line => line.trim().replace(/^assets\//, ''))
    .filter(line => line.length > 0)
);

const allAssets = fs.readdirSync(PUBLIC_ASSETS_DIR);
let movedCount = 0;

console.log(`Starting cleanup of ${allAssets.length} assets...`);

allAssets.forEach(file => {
  // Always keep backgrounds and small logos just in case
  if (file.startsWith('bg-') || file === 'favicon.svg' || file === 'logo.svg' || file === 'x') {
    return;
  }

  if (!usedAssets.has(file)) {
    const src = path.join(PUBLIC_ASSETS_DIR, file);
    const dest = path.join(ARCHIVE_DIR, file);
    
    // Don't move if it's a directory
    if (fs.statSync(src).isDirectory()) return;

    fs.renameSync(src, dest);
    console.log(`📦 Archived: ${file}`);
    movedCount++;
  }
});

console.log(`\nCleanup complete. Moved ${movedCount} files to ${ARCHIVE_DIR}.`);
