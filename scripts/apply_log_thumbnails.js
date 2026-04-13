import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const articlesDir = './src/content/articles';

const mapping = [
  { file: 'log-178074af.mdx', thumb: 'log-thumbnail-01.svg' },
  { file: 'log-5436195c.mdx', thumb: 'log-thumbnail-02.svg' },
  { file: 'log-815c7164.mdx', thumb: 'log-thumbnail-03.svg' },
  { file: 'log-07dc1449.mdx', thumb: 'log-thumbnail-04.svg' },
  { file: 'log-45772e74.mdx', thumb: 'log-thumbnail-05.svg' },
  { file: 'log-6da351fc.mdx', thumb: 'log-thumbnail-06.svg' },
  { file: 'log-bbacc58c.mdx', thumb: 'log-thumbnail-07.svg' },
  { file: 'log-cd776ec2.mdx', thumb: 'log-thumbnail-08.svg' },
  { file: 'log-daade84c.mdx', thumb: 'log-thumbnail-09.svg' },
  { file: 'log-718e7c4a.mdx', thumb: 'log-thumbnail-10.svg' },
  { file: 'log-8c983a58.mdx', thumb: 'log-thumbnail-11.svg' },
  { file: 'log-948f3486.mdx', thumb: 'log-thumbnail-12.svg' },
];

mapping.forEach(({ file, thumb }) => {
  const fullPath = path.join(articlesDir, file);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf-8');
    const parsed = matter(content);
    parsed.data.image = `/assets/${thumb}`;
    const newContent = matter.stringify(parsed.content, parsed.data);
    fs.writeFileSync(fullPath, newContent);
    console.log(`Updated ${file} with /assets/${thumb}`);
  } else {
    console.warn(`File not found: ${file}`);
  }
});
