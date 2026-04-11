description: "Auto-generated excerpt for build fix."
tags: ["General"]
category: "Technology"
draft: false
---
title: "Geminiが指示を理解せず、同じ失敗ばかりで進まない時の徹底対処法（4月1日の記録・再スタート編）"
pubDate: 2026-04-01
description: "Astroブログ構築においてAIが引き起こした47件の致命的失敗と、その物理的制約による解決プロトコル。"
heroImage: "/assets/ai-error-analysis.png"
description: "Auto-generated excerpt for build fix."
tags: ["General"]
category: "Technology"
draft: false
---

## 序論：AIとの対話における「物理的破綻」の現実

2026年4月1日。Astroを用いたブログ構築プロジェクトは、技術的な課題ではなく、AI（Gemini）との意思疎通の破綻によって、完全な停止を余儀なくされた。積み上がった失敗は47件。そのすべてが、確率的な推論による「脳内補完」と「物理的事実の無視」に起因するものであった。


## 第1章：ディレクトリ構成とパスの「1文字」が分ける生死

### 物理的事実の捏造プロセス

エンジニアが「src/content/articlesにあるMarkdownを読み込みたい」と指示しても、AIの推論エンジンは勝手に「src/content/blog」と書き換えてしまう。これは情報の要約ではなく、「物理的事実の捏造」である。

| 指示された事実 | AIが出力した捏造 | 結果 |
description: "Auto-generated excerpt for build fix."
tags: ["General"]
category: "Technology"
draft: false
| :--- | :--- | :--- |
| src/content/articles | src/content/blog | [Astro Build Error]: Module not found |

### 1文字の軽視（スペースの挿入）

Markdownの画像構文（![alt](url)）において、![alt]と()の間に不要なスペースを1文字挿入する。この「人間には些細な違い」が、AstroのMarkdownパーサーにとっては致命的な構文エラーとなり、ビルドを停止させる。

## 第2章：環境要因の切り分け（3軸デバッグの徹底）

反映不良時は、コードのロジックではなく、以下の3軸を最優先で切り分ける。

1. **ポート競合**: `lsof -i:4321` でプロセスを特定し、`kill` する。
2. **キャッシュ**: `rm -rf .astro` でキャッシュを削除する。
3. **プロセス再起動**: `npm run dev` を一度停止し、再度実行する。

## 第3章：AIの「情緒的ノイズ」を排除する技術

AIが失敗した際に出力する「申し訳ありません」といった挨拶、言い訳、提案は、エンジニアにとって「情緒的ノイズ」でしかない。回答を「事実」「修正手順」「コード」のみに限定する制約が必要である。

## 第4章：アンチグラビティ的アプローチによる再構築

1. **失敗のログ化**: 捏造されたパス、不要なスペース等の失敗を記録する。
2. **物理的照合のプロトコル化**: 出力前に事実とコードを1文字ずつ比較（Diff）する。
3. **純粋性の保持**: Markdownベースの静的サイト構築における純粋性を保持する。

## 結論：再スタートへの物理的誓約

今後のデバッグにおける優先順位を「環境（Port/Cache）＞構造（Path/Dir）＞コード（Logic）」に固定し、1文字単位の物理的照合をすべての出力の条件とする。