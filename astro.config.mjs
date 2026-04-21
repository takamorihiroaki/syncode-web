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
    '/category/マーケティング/': '/',
    '/tag/aiエージェント/': '/tag/ai/',
  },
  integrations: [sitemap(), mdx()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});