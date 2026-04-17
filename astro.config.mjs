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
    // カテゴリー構造の統合リダイレクト
    '/category/テクノロジー/': '/',
    '/category/aiツール/': '/',
    '/category/ai戦略/': '/',
    '/category/技術検証/': '/',
    '/category/aiライフスタイル/': '/',
    '/category/開発実録/': '/',
    // タグ構造のリダイレクト
    '/tag/ライティング/': '/articles/',
    '/tag/ディレクトリ構造/': '/articles/',
    '/tag/データ移行/': '/articles/',
    '/tag/タイポグラフィ/': '/articles/',
    '/tag/ドキュメンタリー/': '/articles/',
    '/tag/開発ログ/': '/articles/',
    '/tag/フロントエンド/': '/articles/',
    '/tag/ブランディング/': '/articles/',
    '/tag/自動化/': '/articles/',
    '/tag/効率化テクニック/': '/articles/',
    '/tag/AI開発/': '/articles/',
    '/tag/Antigravity/': '/articles/',
  },
  integrations: [sitemap(), mdx()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});