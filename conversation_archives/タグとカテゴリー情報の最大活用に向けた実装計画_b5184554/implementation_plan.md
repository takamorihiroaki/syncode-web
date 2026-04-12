# タグとカテゴリー情報の最大活用に向けた実装計画

サイト全体でタグ（Tags）とカテゴリー（Category）を視覚的・機能的に統合し、ユーザーがコンテンツを見つけやすくするための改修を行います。

## ユーザーレビューが必要な項目
- **ナビゲーションの変更**: カテゴリー一覧をトップページやヘッダーに追加する設計について。
- **デザインの方向性**: タグやカテゴリーのバッジデザイン（シンプル、ミニマルなスタイルを想定）。

## 提案する変更内容

### 1. 共通コンポーネントの作成
再利用可能なバッジ形式のコンポーネントを作成します。

#### [NEW] [Tag.astro](file:///Volumes/TOSHIBA%20EXT/syncode-web/src/components/Tag.astro)
- タグを表示する小さなラベル。クリックするとそのタグの記事一覧へ遷移します。

#### [NEW] [Category.astro](file:///Volumes/TOSHIBA%20EXT/syncode-web/src/components/Category.astro)
- カテゴリーを表示するラベル。記事タイトル上などに配置します。

---

### 2. 記事詳細ページの強化
#### [MODIFY] [[slug].astro](file:///Volumes/TOSHIBA%20EXT/syncode-web/src/pages/articles/%5Bslug%5D.astro)
- タイトルの上に「カテゴリー」を表示。
- 本文の下（またはアイキャッチの下）に「タグ一覧」を表示。

---

### 3. アーカイブページの新規作成
特定のタグやカテゴリーに属する記事を一覧表示する動的ルートを作成します。

#### [NEW] [[category].astro](file:///Volumes/TOSHIBA%20EXT/syncode-web/src/pages/category/%5Bcategory%5D.astro)
- `/category/[category]` のURLで、そのカテゴリーの記事を一覧表示。

#### [NEW] [[tag].astro](file:///Volumes/TOSHIBA%20EXT/syncode-web/src/pages/tag/%5Btag%5D.astro)
- `/tag/[tag]` のURLで、そのタグの記事を一覧表示。

---

### 4. トップページの強化
#### [MODIFY] [index.astro](file:///Volumes/TOSHIBA%20EXT/syncode-web/src/pages/index.astro)
- 各記事カードにカテゴリーとタグを表示。
- 「新着情報」セクションの前に、主要なカテゴリーやタグで絞り込めるフィルター／ナビゲーションセクションを追加。

---

### 5. デザインシステムとスタイルの更新
#### [MODIFY] [global.css](file:///Volumes/TOSHIBA%20EXT/syncode-web/src/styles/global.css)
- タグ（バッジ）やカテゴリー（ラベル）のスタイルを定義。
- ホバーエフェクトなどのマイクロインタラクションを追加。

## 開問事項
1. **サイドバーの有無**: 記事ページにサイドバーを作り、そこにカテゴリー一覧や人気タグを表示させる構成にしますか？それとも現在のシングルカラム（1列）を維持しますか？
2. **優先表示**: トップページで特に目立たせたいカテゴリーやタグはありますか？

## 検証計画

### 自動テスト
- `npm run build` を実行し、動的ルート（カテゴリー・タグページ）が正しく生成されるか確認。

### 目視確認
- 各記事ページでタグ・カテゴリーが表示されているか確認。
- タグをクリックして、そのタグの記事一覧ページへ遷移できるか確認。
- トップページのカード内にタグが表示され、デザインが崩れていないか確認。
