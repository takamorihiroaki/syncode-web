# 記事サムネイルのスタイル統一

現在の記事リストにおいて、一部のサムネイルが幾何学的な抽象図解（明るい背景）となっており、最近の記事のスタイル（暗い背景、具体的なAIイラスト、タイトルテキストのオーバーレイ）と乖離しています。
これを修正するため、主要な記事のサムネイルを再生成し、デザインの統一を図ります。

## 修正対象
以下の記事のサムネイルが現状のデザインルールから外れている、またはシリーズ内での不一致があるため、再生成を行います。

### 1. 「Special Documentary」シリーズ (第1章〜第4章)
- 第1章：ディレクトリ構成とパスの「1文字」が分ける生死 (現在は幾何学抽象)
- 第2章：環境要因の切り分け（3軸デバッグの徹底） (現在は幾何学抽象)
- 第3章：AIの「情緒的ノイズ」を排除する技術 (現在はイラスト＋テキスト)
- 第4章：アンチグラビティのアプローチによる再構築 (現在はイラスト＋テキスト)
  - **方針**: 4枚すべてを「暗い背景、未来的な技術イラスト、タイトルテキスト入りのプレミアムスタイル」で統一。

### 2. 「新着情報」セクションで目立つ不一致
- 【完全版】Antigravityの「ファイル添付・操作」マスターガイド (現在は幾何学抽象)
- AIエージェントに実務を丸投げする。GA4同期の手順 (現在は明るい背景の図解)

## 提案するデザインスタイル
- **背景**: 深い黒または紺を基調とした技術的なグラデーション
- **イラスト**: 未来的なワークステーション、デジタルの脳、光る接続、協力する手などの高品質なAIイラスト
- **テキストオーバーレイ**: 視認性の高い太めのゴシック体（白）で記事タイトルまたは章番号を中央、あるいはバランスの良い位置に配置
- **アスペクト比**: 1:1 (正方形) を踏襲

## 変更内容

### [Assets (NEW)]
- `/assets/series-vol1-square-new.png`
- `/assets/series-vol2-square-new.png`
- `/assets/series-vol3-square-new.png`
- `/assets/series-vol4-square-new.png`
- `/assets/antigravity-file-ops-mastery-new.png`
- `/assets/ga4-sync-technical-guide-new.png`

### [Content (MODIFY)]
- `src/content/articles/chapter-1.mdx`: `image` パスを更新
- `src/content/articles/chapter-2.mdx`: `image` パスを更新
- `src/content/articles/chapter-3.mdx`: `image` パスを更新
- `src/content/articles/chapter-4.mdx`: `image` パスを更新
- `src/content/articles/antigravity-file-ops-mastery.mdx`: `image` パスを更新
- `src/content/articles/ga4-sync-technical-guide.mdx`: `image` パスを更新

## 検証プラン
- ブラウザでホームページを確認し、サムネイルのスタイルが統一されているか視認
- 全ての画像が正常にロードされていることを確認
