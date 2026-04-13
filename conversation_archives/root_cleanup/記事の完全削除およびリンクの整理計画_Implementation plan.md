# 記事の完全削除およびリンクの整理計画

不要となった記事 `antigravity-browser-control-guide-chatgpt.md` を完全に削除し、他の記事からのリンクを整理します。

## 実施内容

### 1. ファイルの削除 [DELETE]
以下のファイルをプロジェクトから削除します。
- `src/content/articles/antigravity-browser-control-guide-chatgpt.md`
- `src/articles_backup/antigravity-browser-control-guide-chatgpt.md`

### 2. 内部リンクの削除 [MODIFY]
他の記事内で上記記事を 紹介しているリンクを削除します。

#### [antigravity-browser-control-guide.md](file:///Volumes/TOSHIBA%20EXT/syncode-web/src/content/articles/antigravity-browser-control-guide.md)
および
#### [antigravity-browser-control-guide.md](file:///Volumes/TOSHIBA%20EXT/syncode-web/src/articles_backup/antigravity-browser-control-guide.md)
- 「Antigravityと他AIツールの比較記事」への言及を削除します（中盤および末尾）。

## 検証計画
- トップページ (`http://localhost:4321/`) から該当の記事が消えていることを確認します。
- `src/content/articles/antigravity-browser-control-guide.md` のページをブラウザで開き、削除した記事へのリンクが残っていないことを確認します。
- サイト全体を `grep` し、リンクが残っていないことを再確認します。
