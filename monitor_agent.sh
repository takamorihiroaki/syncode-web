#!/bin/bash

TARGET="https://cloudcode-pa.googleapis.com"
INTERVAL=60

while true; do
    TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$TARGET")

    if [ "$STATUS" -eq 503 ]; then
        echo "[$TIMESTAMP] HTTP 503: サーバーは高負荷状態です。${INTERVAL}秒後に再確認します。"
    elif [ "$STATUS" -eq 000 ]; then
        echo "[$TIMESTAMP] 通信エラー: ネットワークの接続状態を確認してください。"
    else
        echo "[$TIMESTAMP] ステータスが $STATUS に変化しました。復旧した可能性があります。"
        afplay /System/Library/Sounds/Glass.aiff 2>/dev/null
        break
    fi
    sleep "$INTERVAL"
done
