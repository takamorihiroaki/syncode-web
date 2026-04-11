description: "Auto-generated excerpt for build fix."
tags: ["General"]
category: "Technology"
draft: false
---
title: "Antigravity（Agent Manager）Markdown 執筆ガイド"
pubDate: 2026-04-01
description: "Antigravity（Agent Manager）のチャットやブログ出力において、文章の欠落や表示崩れを物理的に回避するための執筆ルールをまとめます。"
heroImage: "/assets/antigravity-markdown-writing-guide.png"
description: "Auto-generated excerpt for build fix."
tags: ["General"]
category: "Technology"
draft: false
---


## Antigravity（Agent Manager）Markdown 執筆ガイド

Antigravity（Agent Manager）のチャットやブログ出力において、
文章の欠落や表示崩れを物理的に回避するための執筆ルールをまとめます。

以下のルールを遵守することで、システムの解析エラーを抑制し、
意図した通りのレイアウトを維持できます。

description: "Auto-generated excerpt for build fix."
tags: ["General"]
category: "Technology"
draft: false
---

### 1. 構造の分断と空行の徹底

Markdownパーサの誤認を防ぐため、要素間には必ず物理的な距離を設けます。

* **見出しの直後は空行を必須とする**

見出し（## 等）の直後に文章を連結させず、
必ず1行以上の空行を挿入してください。

* **画像の前後は完全に独立させる**

画像記法（![alt](url)）の上下には必ず空行を入れ、
前後のテキストと接触させないようにします。

* **1段落は2〜3行以内に収める**

長文のベタ書きは解析エラーやトークン制限による端折りの原因となるため、
こまめに改行を行います。

description: "Auto-generated excerpt for build fix."
tags: ["General"]
category: "Technology"
draft: false
---

### 2. 手順・リストの安全な記述法

手順説明など、構造が複雑になりやすい箇所は以下の形式を推奨します。

1. **手順のリスト化**
箇条書き（* や -）または番号付きリストを使用し、
文章の中に手順を埋め込まないようにします。

2. **パースの強制分断**
リストが意図せず結合する場合は、
HTMLコメント（）を挿入して解析を物理的に切り離します。

description: "Auto-generated excerpt for build fix."
tags: ["General"]
category: "Technology"
draft: false
---

### 3. 表示が反映されない場合の対応

記述ルールを適用しても画面に変化がない場合は、
コードではなく環境側に原因があります。

* **ブラウザのハードリロード**

キャッシュの影響を排除するため、
Cmd+Shift+R（Mac）またはCtrl+F5（Win）を実行してください。

* **開発サーバーの再起動**

一度サーバープロセスを停止し、再度起動します。

description: "Auto-generated excerpt for build fix."
tags: ["General"]
category: "Technology"
draft: false
---

### まとめ

* 見出し、画像、段落の前後には必ず空行を入れる。
* 手順は文章にせず、リスト記法で構造化する。
* 反映されない時は記述の修正を止め、環境のリセットを優先する。