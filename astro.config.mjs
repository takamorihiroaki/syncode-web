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
    '/tag/ディレクトリ構造/': '/',
    '/tag/マーケティング/': '/',
    '/tag/aiエージェント/': '/tag/ai/',
    '/tag/リファクタリング/': '/',
    '/tag/ブランドストーリー/': '/',
    '/tag/デザイン/': '/',
    '/tag/デザインシステム/': '/',
    '/tag/リカバリ/': '/',
    '/tag/ライティング/': '/',
    '/tag/データ移行/': '/',
    '/tag/タイポグラフィ/': '/',
    '/tag/ドキュメンタリー/': '/',
    '/tag/開発ログ/': '/',
    '/tag/フロントエンド/': '/',
    '/tag/ブランディング/': '/',
    '/tag/ミニマリズム/': '/',
    '/tag/デザイン哲学/': '/',
  },
  integrations: [sitemap(), mdx()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});