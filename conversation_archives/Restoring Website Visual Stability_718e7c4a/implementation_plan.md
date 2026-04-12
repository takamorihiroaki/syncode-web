# SYNCODE 最終安定版への完全復元計画 (Total Restoration to cd776ec2)

最新のログ（Conversation cd776ec2: 2026-04-11T09:28 改訂）に基づき、サイトを「完成形」として合意された最終安定状態へ復元します。
これには、一時的に試行された「Premium SVG」の廃止と、初期の高品質な「3D Blueprint」スタイルへの回帰が含まれます。

## ユーザー確認事項

> [!IMPORTANT]
> この修正により、各記事のサムネイルは文字入りのSVGから、初期の「文字なし 3D Blueprint」スタイルのPNG画像に戻ります。これに伴い、カード上では記事タイトルと抜粋が再び表示されるようになり、情報の可視性とデザインの安定性を両立させます。

## 提案する変更内容

### 1. アセットの差し戻し (Images/MDX)

#### [MODIFY] 記事MDXファイル群 (`src/content/articles/*.mdx`)
- サムネイル画像を `.svg`（Premium SVG）から、初期の `.png`（3D Blueprint / Square PNG）へ差し戻します。
- 例: `/assets/premium-chapter-1.svg` → `/assets/series-vol1-square.png`

### 2. カードコンポーネントの復元 (ArticleCard)

#### [MODIFY] [ArticleCard.astro](file:///Volumes/TOSHIBA%20EXT/syncode-web/src/components/ArticleCard.astro)
- 画像に文字が含まれなくなるため、`premium` バリアントにおいてもタイトルと抜粋（excerpt）を再び表示するように戻します。
- 不要なホバーアニメーション（拡大など）を完全に排除し、レイアウトの不審な動きを抑止します。

### 3. レイアウトとタイポグラフィの安定化

#### [MODIFY] [index.astro](file:///Volumes/TOSHIBA%20EXT/syncode-web/src/pages/index.astro)
- グリッドレイアウトを安定した3カラム (`repeat(3, 1fr)`) に固定します。

#### [MODIFY] [global.css](file:///Volumes/TOSHIBA%20EXT/syncode-web/src/styles/global.css)
- 漆黒（Jet Black）の背景と、センター揃えのヘッダー設定（!important）が確実に適用されているか再確認します。
- 10.8pt / Tracking 80 のタイポグラフィ設定を適用します。

## オープンクエスチョン

- 初期アセット（3D Blueprint）のPNGについて、章ごとに正しいファイル名が割り当てられているか（例：1章=vol1, 2章=vol2）を確認しながら進めます。もし特定の章で別の画像を使いたい場合はお知らせください。

## 検証計画

### 視覚確認
- ブラウザツールを使用し、トップページと記事ページが「文字なしスクエア画像」と「センター揃え」で正しく表示されているかを確認します。

### 動作確認
- `npm run build` を実行し、画像パスの変更によるエラーが発生しないことを確認します。
