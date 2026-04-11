#!/bin/bash
ASSETS_DIR="/Volumes/TOSHIBA EXT/syncode-web/public/assets"
mkdir -p "$ASSETS_DIR"

generate_svg() {
    local order=$1
    local title=$2
    local sub=$3
    local color="#0ea5e9"
    local accent="#38bdf8"
    
    if [ "$order" -le 6 ]; then
        color="#6366f1"
        accent="#818cf8"
    fi

    cat <<SVG > "$ASSETS_DIR/series-vol$(printf "%02d" $order)-premium.svg"
<svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="mainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#020617;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0f172a;stop-opacity:1" />
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
    </pattern>
    <filter id="textGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <rect width="800" height="800" fill="url(#mainGrad)"/>
  <rect width="800" height="800" fill="url(#grid)"/>
  <rect x="150" y="250" width="500" height="300" rx="20" fill="rgba(255, 255, 255, 0.02)" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
  <text x="400" y="220" font-family="sans-serif" font-size="20" font-weight="700" fill="$color" letter-spacing="0.4em" text-anchor="middle">$sub</text>
  <text x="400" y="370" font-family="sans-serif" font-size="44" font-weight="700" fill="white" text-anchor="middle" filter="url(#textGlow)">$title</text>
  <rect x="360" y="480" width="80" height="4" rx="2" fill="$accent" />
  <path d="M 40 40 L 100 40 M 40 40 L 40 100" stroke="$color" stroke-width="3" />
  <path d="M 760 760 L 700 760 M 760 760 L 760 700" stroke="$color" stroke-width="3" />
  <text x="400" y="750" font-family="sans-serif" font-size="12" fill="rgba(255,255,255,0.3)" text-anchor="middle" letter-spacing="0.2em">SYNCODE CHRONICLES // PROJECT STATUS: ACTIVE</text>
</svg>
SVG
}

generate_svg 1 "AIとの同期、その始まり。" "CHRONICLES VOL.01 // INCEPTION"
generate_svg 2 "システムへ昇華。" "CHRONICLES VOL.02 // EVOLUTION"
generate_svg 3 "対話の続き（エラー）。" "CHRONICLES VOL.03 // DIALOGUE"
generate_svg 4 "アイデンティティの形成。" "CHRONICLES VOL.04 // IDENTITY"
generate_svg 5 "審美眼の再構築。" "CHRONICLES VOL.05 // AESTHETICS"
generate_svg 6 "第一期の完結と反省。" "CHRONICLES VOL.06 // REFLECTION"
generate_svg 7 "物理的破綻の現実" "CHRONICLES VOL.07 // BREAKDOWN"
generate_svg 8 "第1章：ディレクトリ構成" "CHRONICLES VOL.08 // STRUCTURE"
generate_svg 9 "第2章：3軸デバッグ" "CHRONICLES VOL.09 // DEBUGGING"
generate_svg 10 "第3章：情緒的ノイズ排除" "CHRONICLES VOL.10 // PRECISION"
generate_svg 11 "第4章：再構築プロトコル" "CHRONICLES VOL.11 // RECONSTRUCTION"
generate_svg 12 "終章：再スタートへの誓約" "CHRONICLES VOL.12 // COVENANT"
