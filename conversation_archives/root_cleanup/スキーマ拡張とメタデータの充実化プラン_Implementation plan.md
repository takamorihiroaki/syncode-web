# スキーマ拡張とメタデータの充実化プラン

Astroのコンテンツコレクション定義（`config.ts`）を拡張し、記事のメタデータを充実させます。これに伴い、既存のすべての記事ファイルと表示用テンプレートを一括更新します。

## ユーザーレビューが必要な項目

> [!IMPORTANT]
> 既存のフィールド名が変更されます（`date` → `pubDate`、`image` → `heroImage`）。
> これにより、すべての記事ファイルとテンプレートファイルを同時に更新する必要があります。

> [!NOTE]
> 既存の記事に「タグ」や「カテゴリ」が設定されていない場合、一律で「デフォルト値」を設定します。特定の値を設定したい場合は事前にお知らせください。

## 変更内容

### 1. スキーマ定義の更新

#### [MODIFY] [config.ts](file:///Volumes/TOSHIBA/EXT/syncode-web/src/content/config.ts)
以下のようにスキーマを拡張します：
- `pubDate`: `z.date()` (必須)
- `updatedDate`: `z.date().optional()` (任意)
- `heroImage`: `z.string()` (必須)
- `excerpt`: `z.string()` (必須)
- `tags`: `z.array(z.string())` (必須)
- `category`: `z.string()` (必須)
- `draft`: `z.boolean().default(false)` (デフォルト: false)

---

### 2. 記事ファイルの更新（計19ファイル）

#### [MODIFY] `src/content/articles/*.md`
すべての記事のFrontmatterを新スキーマに合わせて置換・追加します。
- `date` → `pubDate`
- `image` → `heroImage`
- `description` または `excerpt` → `excerpt`
- `tags`: `["General"]` (デフォルト値)
- `category`: `"Uncategorized"` (デフォルト値)
- `draft`: `false`

---

### 3. 表示用テンプレートの更新

#### [MODIFY] [index.astro](file:///Volumes/TOSHIBA/EXT/syncode-web/src/pages/index.astro)
記事一覧でのデータ参照を更新します。
- `article.data.date` → `article.data.pubDate`
- `article.data.image` → `article.data.heroImage`

#### [MODIFY] [[slug].astro](file:///Volumes/TOSHIBA/EXT/syncode-web/src/pages/articles/[slug].astro)
記事詳細ページでのデータ参照を更新します。
- `entry.data.date` → `entry.data.pubDate`
- `entry.data.image` → `entry.data.heroImage`

## オープンな質問

> [!QUESTION]
> 1. タグやカテゴリの初期値として、特定のものを指定したい記事はありますか？（特に指定がない場合は "General" / "Uncategorized" を設定します）
> 2. `excerpt` (抜粋文) は現在の `description` から引き継ぎますが、文字数制限などは設けますか？

## 検証プラン

### 自動テスト
- `npm run build` を実行し、すべての記事がスキーマチェックをパスすることを確認します。

### 手動確認
- `http://localhost:4321/` を開き、新着一覧の画像と日付が正しく表示されているか確認します。
- 各記事を開き、詳細画面での表示崩れがないか確認します。
