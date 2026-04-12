# 記事データの修復・正常化完了

CMS修復スクリプトの不具合により破損していた記事データをすべて修復し、サイト上で正常に表示される状態に戻しました。

## 実施内容

### 1. 記事データの復元とクリーンアップ
- `src/articles_backup` からオリジナルの記事データを `src/content/articles` へ復元しました。
- 修復スクリプト（`index.js`）を強化し、重複していたフロントマター項目やゴミ情報を自動的に除去するようにしました。

### 2. Astro 6 Content Layer への移行
- `src/content.config.ts` を修正し、Astro 5/6 の新しい Content Layer API (`loader: glob()`) を使用するようにしました。
- テンプレートで使用されている項目名（`date`, `image`, `excerpt`）に合わせて、スキーマと記事データのキー名を統一しました。

### 3. 表示確認
- `npx astro sync` および `npx astro check` を実行し、エラーがないことを確認しました。
- ブラウザツールを用いて、個別の記事ページが正常に表示されることを確認しました。

## 修復後の確認結果

````carousel
![記事詳細ページの正常な表示](file:///Users/hiroaki/.gemini/antigravity/brain/cf9e8043-3b27-4b0a-acfa-a45da6f0b5ee/article_page_top_1775405953230.png)
<!-- slide -->
![トップページの記事リスト](file:///Users/hiroaki/.gemini/antigravity/brain/cf9e8043-3b27-4b0a-acfa-a45da6f0b5ee/homepage_scrolled_1775405477433.png)
````

> [!TIP]
> 今後、コンテンツのフロントマターを変更する際は、`src/content.config.ts` のスキーマ定義も合わせて更新するようにしてください。
