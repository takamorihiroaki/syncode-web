# UnsupportedImageFormat ビルドエラーの修正プラン

`npm run deploy` 実行時に発生している `UnsupportedImageFormat` エラー（`urlFormat` 関数が渡されているというエラー）を解決します。

## 現状の分析と仮説

### エラー内容
- `/articles/gemini-error-recap/` のレンダリング中に発生。
- 画像フォーマットとして Node.js の `url.format` 関数のソースコードのような文字列が渡され、バリデーションに失敗している。

### 仮説
- 記事内のテキスト `![alt](url)` が MDX パーサーによって「画像」として認識され、かつ `url` という部分がビルド環境のグローバルな `url` モジュールと解釈されて、そのプロパティが画像処理エンジンに渡されている。
- 特に Astro 5/6 では、Markdown 内の画像を自動的に最適化しようとするため、この誤認が致命的なエラーとなっている可能性が高い。

## 修正内容

### 1. 記事内の Markdown 構文テキストの修正
以下のファイルのテキストに含まれる `![alt](url)` などの構文を、バッククリックで囲むかエスケープすることで、パーサーに「画像」ではなく「単なるテキスト」として認識させます。

- **[MODIFY] [gemini-error-recap.mdx](file:///Volumes/TOSHIBA%20EXT/syncode-web/src/content/articles/gemini-error-recap.mdx)**
    - `![alt](url)` -> `` `![alt](url)` ``
- **[MODIFY] [chapter-1.mdx](file:///Volumes/TOSHIBA%20EXT/syncode-web/src/content/articles/chapter-1.mdx)**
    - `![alt](url)` -> `` `![alt](url)` ``

## 検証プラン

### ビルドテスト
- `npm run build` を実行し、エラーが解消され、すべての記事が正常にレンダリングされることを確認します。
- `/articles/gemini-error-recap/` が正常に生成されているか確認します。
