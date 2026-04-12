# 重複記事の整理と内部リンクの最適化計画

内容が重複している旧パフォーマンス改善記事を削除し、最新かつ高品質な新記事へサイト全体のリンクを統合します。

## ユーザーレビューが必要な項目

- **削除対象の再確認**: `antigravity-performance-fix-guide.md` を完全に削除します。
- **リンク文言の変更**: リンク先のタイトルが変更（「原因3選」→「3分で改善」など）になるため、文脈に合わせて微調整します。

## 1. 記事の整理

### [DELETE] [antigravity-performance-fix-guide.md](file:///Volumes/TOSHIBA%20EXT/syncode-web/src/content/articles/antigravity-performance-fix-guide.md)
- 重複コンテンツを排除するため、旧ファイルを削除します。

## 2. 内部リンクの統合（リンク先を新記事へ変更）

以下の各ファイルについて、旧記事へのリンク（`/articles/antigravity-performance-fix-guide/`）を新記事（`/articles/antigravity-performance-fix/`）へ書き換えます。

### [MODIFY] [antigravity-initial-setup-guide.md](file:///Volumes/TOSHIBA%20EXT/syncode-web/src/content/articles/antigravity-initial-setup-guide.md)
- 文末の「関連記事」セクションにあるリンクを更新。

### [MODIFY] [antigravity-code-not-working-guide.md](file:///Volumes/TOSHIBA%20EXT/syncode-web/src/content/articles/antigravity-code-not-working-guide.md)
- 関連記事セクションのリンクを更新。

### [MODIFY] [antigravity-additional-options-guide.md](file:///Volumes/TOSHIBA%20EXT/syncode-web/src/content/articles/antigravity-additional-options-guide.md)
- 動作が重い場合の案内リンクを更新。

## 検証プラン

### リンクの動作確認
- ブラウザサブエージェントを使用し、各記事から新記事（performance-fix）へ正しく遷移できるか、404エラーが発生しないかを確認します。
