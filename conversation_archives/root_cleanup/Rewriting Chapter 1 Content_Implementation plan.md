# 「真・復旧」実装計画：候補A（文字なし3D）への回帰

お客様に選択いただいた「文字なしの3D画像」をベースに、サイト全体の不整合を一掃し、SYNCODEの原点である「洗練された秩序」を復元します。

## 1. コンテンツの修正（MDX）
以下の4ファイルを、最初期の完全版画像へと差し戻します。
- `src/content/articles/site-reform-ch1-showcase-library.mdx`: `structural_reform_ch1_showcase_library_1775892783977.png`
- `src/content/articles/site-reform-ch2-ui-minimalism.mdx`: `structural_reform_ch2_ui_minimalism_1775892813143.png`
- `src/content/articles/site-reform-ch3-technical-seo.mdx`: `structural_reform_ch3_technical_seo_1775892826717.png`
- `src/content/articles/site-reform-ch4-ai-autonomy-recap.mdx`: `structural_reform_ch4_ai_autonomy_1775892857482.png`

## 2. トップページのレイアウト修正（index.astro）
- **情報の整理**: 2つのセクションで同じ記事が表示されないよう、Latest Articlesから連載記事を確実に除外。
- **グリッドの最適化**: 巨大化を防ぐため、グリッドをPC 3列 / Tablet 2列 / SP 1列に厳密に固定。

## 3. 連載枠の純化（SeriesSection.astro）
- 画像内のデザインに集中できるよう、システム側の装飾（Chapterラベル等）を極限までシンプルに戻します。

## 4. 検証と本番反映
- デプロイ後にブラウザサブエージェント等を用いて、お客様の仰る「一番最初」の状態と一致しているか、視覚的に最終確認を行います。
