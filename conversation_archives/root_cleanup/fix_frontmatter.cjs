const fs = require('fs');
const path = require('path');

const dir = 'src/content/articles';

fs.readdirSync(dir).forEach(file => {
    if (!file.endsWith('.md')) return;

    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    // frontmatterの開始と終了だけを厳密に取る
    const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

    if (!match) return;

    const frontmatter = match[1];
    const body = match[2];

    // frontmatterを1つに正規化
    const fixed = `---\n${frontmatter.trim()}\n---\n${body.trimStart()}`;

    fs.writeFileSync(filePath, fixed, 'utf-8');
    console.log(`Fixed: ${file}`);
});