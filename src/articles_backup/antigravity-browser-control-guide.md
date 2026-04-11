description: "Auto-generated excerpt for build fix."
tags: ["General"]
category: "Technology"
draft: false
---
title: "【初心者向け】AntigravityのBrowser Controlが動かない？「Agent Manager」を使った正しい初期設定と解決手順"
pubDate: 2026-04-04
description: "Antigravity（Agent Manager）のチャット入力欄に画像やスクリーンショットを添付する基本的な使い方や手順を詳しく解説します。"
heroImage: "/assets/antigravity-browser-control-main.png"
description: "Auto-generated excerpt for build fix."
tags: ["General"]
category: "Technology"
draft: false
---

## 導入

Googleの最新AIエージェント「Antigravity」。その目玉機能である、AIが自律的にブラウザを操作してサイトを検証してくれる「Browser Control（プレビュー機能）」は、Web制作の効率を劇的に引き上げる機能です。

> [!TIP]
> **この記事で紹介しているAntigravityは無料で試せます。**
> 実際に触りながら読むと理解が早いです。
> 👉 [Antigravityを今すぐ開く（無料）](https://antigravity.ai/)

しかし、「プレビュー画面が真っ黒のまま進まない」「AIがサイトを認識してくれない」とつまずくケースが散見されます。

最大の原因は、エディタ側の設定ではなく **「Antigravity（Agent Manager）側でワークスペースのセットアップをしていないこと」** です。

description: "Auto-generated excerpt for build fix."
tags: ["General"]
category: "Technology"
draft: false
---

## 実験内容

**「AntigravityのAgent Managerからワークスペースを構築し、Browser Controlを自律稼働させる」**

ローカルで開発中のWebサイト（Astro環境）のプレビューを表示させようとした際、AIに対して「どのフォルダを操作すべきか」という **AI専用の前提条件（コンテキスト）** を与えていなかったことが判明。

VS Code自体の機能ではなく、Antigravityの「Agent Manager」を通じて環境を構築するプロセスを検証しました。

description: "Auto-generated excerpt for build fix."
tags: ["General"]
category: "Technology"
draft: false
---

## 手順

### 手順1：「Open Agent Manager」を起動する

画面右上にあるAntigravity専用のアイコン **「Open Agent Manager」** をクリックします。

エージェント専用の管理画面が立ち上がり、AIがプロジェクトを認識する準備が整います。

> [!TIP]
> **👉 迷った方はこちらからすぐ開けます**
> [Antigravityを起動して設定を試す](https://antigravity.ai/)

### 手順2：「Open local folder」でAIに作業場を教える

Agent Managerの画面中央に表示される「Before you begin」内の青いボタン **「Open local folder」** をクリックし、作成中のWebサイトのフォルダ（例：`syncode-web`）を選択します。

この操作により、初めてAIとローカル環境が物理的にリンクされます。

> [!IMPORTANT]
> **👉 まだ開いていない方はこちら**
> ステップ通りに進めれば確実に動作します。
> [Antigravityを開いて接続する](https://antigravity.ai/)

### 手順3：サーバー起動とAIへの「プレビュー指示」

ターミナルで開発サーバー（`npm run dev`等）を起動後、画面右上の「Open Browser」アイコンをクリックして、Browser Controlの待機画面を出します。

チャット欄からAIへ **「今のプレビュー画面を表示して」** と直接指示を出すことで、AIが自律的なブラウザ操作を開始します。

description: "Auto-generated excerpt for build fix."
tags: ["General"]
category: "Technology"
draft: false
---

## 結果と考察

Agent Manager経由で「Open local folder」を指定した結果、AIが `localhost:4321` のプレビュー環境に正確にアクセスしました。

Antigravityのような高度なエージェントは **「コンテキスト（文脈）の共有」** が不可欠です。

Antigravity側のシステムに直接作業ディレクトリを認識させることが、すべての機能を正常に動かす絶対条件であると確認されました。

> [!TIP]
> **👉 より実践的な使い方はこちら**
> ブラウザ操作ができるようになったら、次に「画像の送信」を組み合わせると作業効率が爆上がりします。
> [Antigravityのおすすめ活用法（画像添付ガイド）](/articles/antigravity-image-attachment-guide)

description: "Auto-generated excerpt for build fix."
tags: ["General"]
category: "Technology"
draft: false
---

## 失敗と改善案

初期設定（Before you begin）をスキップした場合、AIがカレントディレクトリを認識できずエラーを連発します。

* **失敗：** チャットパネルの操作のみを行い、Agent Managerの初期画面を飛ばした。
* **改善案：** 作業開始時は必ず「Open Agent Manager」を開き、Workspacesに現在のフォルダが登録されているか物理確認を行う。


description: "Auto-generated excerpt for build fix."
tags: ["General"]
category: "Technology"
draft: false
---

## まとめ

AntigravityのBrowser Controlが動かない時は、以下の手順を順に実行してください。

1.  **右上の「Open Agent Manager」を開く。**
2.  **「Open local folder」からプロジェクトフォルダを指定する。**
3.  **ブラウザ待機画面を出した後、チャットでAIに指示を出す。**

上記手順に従い、Agent Managerの設定状態を1文字単位で照合してください。

description: "Auto-generated excerpt for build fix."
tags: ["General"]
category: "Technology"
draft: false
---

## 次にやるべきこと

ここまで読んだ方は、まず実際に触ってみてください。理論で理解するより、1回の接続成功があなたの理解を10倍加速させます。

▼ **Antigravityを無料で試す**
[公式サイトで無料トライアルを開始する](https://antigravity.ai/)

description: "Auto-generated excerpt for build fix."
tags: ["General"]
category: "Technology"
draft: false
---

▼ **次に読む**

- [【活用術】Antigravityのおすすめ活用法3選](/articles/antigravity-image-attachment-guide)
  画像やファイルを組み合わせて、さらに自律的なエージェントへ進化させる方法。

EOF