// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://syncode.jp',
  trailingSlash: 'always',
  redirects: {
    '/about.html': '/about/',
    '/category/テクノロジー/': '/',
    '/category/aiツール/': '/',
    '/category/ai戦略/': '/',
    '/category/技術検証/': '/',
    '/category/aiライフスタイル/': '/',
    '/category/開発実録/': '/',
    '/tag/ライティング/': '/articles/',
  },
  integrations: [sitemap(), mdx()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});