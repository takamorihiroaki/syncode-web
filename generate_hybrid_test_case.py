import base64
import os

def get_base64(file_path):
    with open(file_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

bg_base64 = get_base64('public/assets/bg-problem-solving.png')

svg_content = f"""<svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="10" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <filter id="strongGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="2.5" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Base Background -->
  <image href="data:image/png;base64,{bg_base64}" width="800" height="800" preserveAspectRatio="xMidYMid slice" />
  
  <!-- Overlay Darkener -->
  <rect width="800" height="800" fill="rgba(0,0,0,0.3)" />

  <!-- Signature Grid -->
  <rect width="800" height="800" fill="url(#grid)" />

  <!-- Corner Frames -->
  <path d="M 60 60 L 140 60 M 60 60 L 60 140" stroke="#22d3ee" stroke-width="4" fill="none" />
  <path d="M 740 740 L 660 740 M 740 740 L 740 660" stroke="#22d3ee" stroke-width="4" fill="none" />

  <!-- Category Label -->
  <text x="400" y="240" font-family="sans-serif" font-size="32" font-weight="700" fill="#22d3ee" letter-spacing="0.5em" text-anchor="middle">PROBLEM SOLVING</text>

  <!-- Glassmorphism Box -->
  <rect x="80" y="320" width="640" height="240" rx="40" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" stroke-width="1.5" />
  
  <!-- Content -->
  <text x="400" y="440" font-family="sans-serif" font-size="64" font-weight="900" fill="white" text-anchor="middle" filter="url(#glow)">ビルドエラー完全解決</text>
  <text x="400" y="510" font-family="sans-serif" font-size="28" font-weight="300" fill="rgba(255,255,255,0.8)" text-anchor="middle" letter-spacing="0.1em">フロントマター設定の核心を突く</text>
  <rect x="340" y="560" width="120" height="6" rx="3" fill="#22d3ee" />

  <!-- Branding Footer -->
  <text x="400" y="740" font-family="sans-serif" font-size="16" fill="rgba(255,255,255,0.5)" text-anchor="middle" letter-spacing="0.2em">SYNCODE // PROTOCOL: ACTIVATED</text>
</svg>"""

output_path = "public/assets/premium-hybrid-antigravity-ai-frontmatter-fix.svg"
with open(output_path, "w") as f:
    f.write(svg_content)
print(f"Generated: {output_path}")
