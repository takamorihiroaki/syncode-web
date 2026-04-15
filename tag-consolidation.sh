#!/bin/bash
cd "/Volumes/TOSHIBA EXT/syncode-web/src/content/articles"

# タグ統合マッピング（重複・類似タグの統合）
# sed -i '' で直接ファイルを編集

# 1. トラブル系統合 → トラブルシューティング
find . -name "*.mdx" -exec sed -i '' 's/^  - トラブル解決$/  - トラブルシューティング/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - エラー解決$/  - トラブルシューティング/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - エラー対策$/  - トラブルシューティング/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - 課題解決$/  - トラブルシューティング/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - デバッグ$/  - トラブルシューティング/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - リカバリ$/  - トラブルシューティング/' {} +

# 2. AI活用系統合 → AI開発
find . -name "*.mdx" -exec sed -i '' 's/^  - AI活用$/  - AI開発/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - AI連携$/  - AI開発/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - AI効率化$/  - AI開発/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - AIとの共創$/  - AI共創/' {} +

# 3. デザイン系統合 → デザイン
find . -name "*.mdx" -exec sed -i '' 's/^  - デザイン哲学$/  - デザイン/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - デザインシステム$/  - デザイン/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - ミニマリズム$/  - デザイン/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - タイポグラフィ$/  - デザイン/' {} +

# 4. 効率化系統合 → 開発効率化
find . -name "*.mdx" -exec sed -i '' 's/^  - 効率化$/  - 開発効率化/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - 効率化テクニック$/  - 開発効率化/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - 作業効率化$/  - 開発効率化/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - 実務効率化$/  - 開発効率化/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - 業務効率化$/  - 開発効率化/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - 生産性向上$/  - 開発効率化/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - 爆速開発$/  - 開発効率化/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - 開発手法$/  - 開発効率化/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - 開発フロー$/  - 開発効率化/' {} +

# 5. ブログ運営系統合 → ブログ運営
find . -name "*.mdx" -exec sed -i '' 's/^  - ブログ設計$/  - ブログ運営/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - サイト運用$/  - ブログ運営/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - ブログ開設$/  - ブログ運営/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - サイト成長$/  - ブログ運営/' {} +

# 6. 開発ログ系統合 → 開発ログ
find . -name "*.mdx" -exec sed -i '' 's/^  - 開発秘話$/  - 開発ログ/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - 原点回帰$/  - 開発ログ/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - ドキュメンタリー$/  - 開発ログ/' {} +

# 7. ブランド系統合 → ブランド設計
find . -name "*.mdx" -exec sed -i '' 's/^  - ブランドストーリー$/  - ブランド設計/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - ブランディング$/  - ブランド設計/' {} +

# 8. サイト設計系統合 → サイト設計
find . -name "*.mdx" -exec sed -i '' 's/^  - 構造設計$/  - サイト設計/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - 回遊設計$/  - サイト設計/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - サイト設計$/  - サイト設計/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - ディレクトリ構造$/  - サイト設計/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - スキーマ設計$/  - サイト設計/' {} +

# 9. 収益化系統合 → ブログ収益化
find . -name "*.mdx" -exec sed -i '' 's/^  - 収益化$/  - ブログ収益化/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - アンフィリエイト$/  - ブログ収益化/' {} +

# 10. SEO系統合 → SEO
find . -name "*.mdx" -exec sed -i '' 's/^  - サーチコンソール$/  - SEO/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - サチコ$/  - SEO/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - データ駆動型$/  - SEO/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - メタデータ$/  - SEO/' {} +

# 11. UX系統合 → UI-UX
find . -name "*.mdx" -exec sed -i '' 's/^  - UX$/  - UI-UX/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - UX設計$/  - UI-UX/' {} +

# 12. コンテンツ系統合 → コンテンツ制作
find . -name "*.mdx" -exec sed -i '' 's/^  - コンテンツ統合$/  - コンテンツ制作/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - 編集$/  - コンテンツ制作/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - 文脈編集$/  - コンテンツ制作/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - ライティング$/  - コンテンツ制作/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - AIライティング$/  - コンテンツ制作/' {} +

# 13. インフラ系統合 → インフラ
find . -name "*.mdx" -exec sed -i '' 's/^  - インフラ構築$/  - インフラ/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - インフラ整備$/  - インフラ/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - システム構築$/  - インフラ/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - システム保守$/  - インフラ/' {} +

# 14. CSS系統合 → CSS
find . -name "*.mdx" -exec sed -i '' 's/^  - CSSアニメーション$/  - CSS/' {} +

# 15. GA4統合 → Google Analytics
find . -name "*.mdx" -exec sed -i '' 's/^  - GA4$/  - Google Analytics/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - IP除外$/  - Google Analytics/' {} +

# 16. プロンプト系統合 → プロンプトエンジニアリング
find . -name "*.mdx" -exec sed -i '' 's/^  - プロンプト例$/  - プロンプトエンジニアリング/' {} +

# 17. テスト/不要タグの削除
find . -name "*.mdx" -exec sed -i '' '/^  - タグ1$/d' {} +
find . -name "*.mdx" -exec sed -i '' '/^  - タグ2$/d' {} +
find . -name "*.mdx" -exec sed -i '' '/^  - General$/d' {} +
find . -name "*.mdx" -exec sed -i '' '/^  - 結論$/d' {} +

# 18. 英語表記統一
find . -name "*.mdx" -exec sed -i '' 's/^  - Vibe Coding$/  - バイブコーディング/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - Markdown$/  - MDX/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - Customization$/  - カスタマイズ/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - Additional Options$/  - カスタマイズ/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - Browser Control$/  - Antigravity/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - AIツール$/  - Antigravity/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - AIライフスタイル$/  - AI共創/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - 使い方$/  - 初心者向け/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - 初心者ガイド$/  - 初心者向け/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - 共創$/  - AI共創/' {} +
find . -name "*.mdx" -exec sed -i '' 's/^  - 技術検証$/  - Astro/' {} +

echo "タグ統合完了"
