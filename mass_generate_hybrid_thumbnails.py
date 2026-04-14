import os
import json
import base64
import re

# --- CONFIGURATION ---
ARTICLES_DIR = 'src/content/articles'
ASSETS_DIR = 'public/assets'
LOGOS_DIR = 'public/assets' # Where bg-*.png files are
METADATA_FILE = 'article_metadata_dump.json'

# Background mapping (Role to filename)
BACKGROUND_MAP = {
    'PROBLEM SOLVING': 'bg-problem-solving.png',
    'BEGINNER': 'bg-beginner.png',
    'USAGE': 'bg-usage.png',
    'AUTHORITY': 'bg-authority.png',
    'IMPROVEMENT': 'bg-improvement.png',
    'REVENUE': 'bg-revenue.png'
}

# Role Colors (for text accent)
ROLE_COLORS = {
    'PROBLEM SOLVING': '#22d3ee', # Cyan
    'BEGINNER': '#4ade80',        # Green
    'USAGE': '#a855f7',          # Purple
    'AUTHORITY': '#fbbf24',       # Amber
    'IMPROVEMENT': '#f97316',     # Orange
    'REVENUE': '#06b6d4'          # Dark Cyan
}

def get_base64_image(role):
    filename = BACKGROUND_MAP.get(role, 'bg-usage.png')
    path = os.path.join(LOGOS_DIR, filename)
    if not os.path.exists(path):
        # Fallback if specific asset missing
        return ""
    with open(path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

def determine_role(title, category, excerpt):
    full_text = f"{title} {category} {excerpt}".lower()
    
    if any(k in full_text for k in ['収益', '成果', '稼ぐ', 'アフィリエイト', 'monetization', 'revenue']):
        return 'REVENUE'
    if any(k in full_text for k in ['高速化', '爆速', '改善', 'リファクタリング', 'performance', 'improve']):
        return 'IMPROVEMENT'
    if any(k in full_text for k in ['エラー', '解決', 'トラブル', '直す', 'fix', 'trouble']):
        return 'PROBLEM SOLVING'
    if any(k in full_text for k in ['初心者', '導入', 'ガイド', 'スタート', 'introduction', 'start']):
        return 'BEGINNER'
    if any(k in full_text for k in ['戦略', '完全ガイド', '真実', 'ポータル', '理念', '思想', 'authority', 'vision']):
        return 'AUTHORITY'
    
    return 'USAGE' # Default

def cleanup_title(title):
    # Remove emojis and bracketed prefixes for the thumbnail title
    clean = re.sub(r'【.*?】', '', title)
    clean = re.sub(r'（.*?）', '', clean)
    clean = clean.split('｜')[0].split('：')[0].split(' - ')[0].strip()
    return clean[:20] # Limit length

def generate_svg(role, main_title, sub_title, output_path):
    bg_base64 = get_base64_image(role)
    accent_color = ROLE_COLORS.get(role, '#ffffff')
    
    # Dynamic Font Size for Main Title to prevent overflow
    # Base size is 64, reduces as length increases
    main_font_size = 64
    if len(main_title) > 8:
        main_font_size = 48
    if len(main_title) > 12:
        main_font_size = 36

    svg_template = f'''<svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
    </filter>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" stroke-width="0.5"/>
    </pattern>
  </defs>

  <!-- Background Image (Base64) -->
  <image href="data:image/png;base64,{bg_base64}" width="800" height="800" preserveAspectRatio="xMidYMid slice" />
  
  <rect width="800" height="800" fill="black" fill-opacity="0.2" />

  <!-- Signature Grid Overlay -->
  <rect width="800" height="800" fill="url(#grid)" opacity="0.1" />

  <!-- Content Box (Glassmorphism) -->
  <rect x="80" y="250" width="640" height="300" rx="20" fill="black" fill-opacity="0.5" filter="url(#blur)" />
  <rect x="80" y="250" width="640" height="300" rx="20" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)" stroke-width="1.2" />

  <!-- Corner Brackets -->
  <path d="M 110 280 L 140 280 M 110 280 L 110 310" stroke="white" stroke-width="2" opacity="0.6" />
  <path d="M 690 280 L 660 280 M 690 280 L 690 310" stroke="white" stroke-width="2" opacity="0.6" />
  <path d="M 110 520 L 140 520 M 110 520 L 110 490" stroke="white" stroke-width="2" opacity="0.6" />
  <path d="M 690 520 L 660 520 M 690 520 L 690 490" stroke="white" stroke-width="2" opacity="0.6" />

  <!-- Category Label -->
  <text x="400" y="315" font-family="sans-serif" font-size="28" font-weight="700" fill="{accent_color}" letter-spacing="0.6em" text-anchor="middle" opacity="0.9">{role}</text>

  <!-- Main Title -->
  <text x="400" y="415" font-family="sans-serif" font-size="{main_font_size}" font-weight="950" fill="white" text-anchor="middle" filter="url(#glow)">{main_title}</text>
  
  <!-- Sub Title -->
  <text x="400" y="485" font-family="sans-serif" font-size="26" font-weight="300" fill="rgba(255,255,255,0.8)" text-anchor="middle" letter-spacing="0.15em">{sub_title}</text>

  <!-- Decoration Line -->
  <rect x="340" y="525" width="120" height="4" rx="2" fill="{accent_color}" opacity="0.8" />

  <!-- Footer Brand -->
  <text x="400" y="750" font-family="monospace" font-size="12" fill="white" fill-opacity="0.4" text-anchor="middle" letter-spacing="0.4em">SYNCODE // PROTOCOL: ACTIVATED</text>
  
  <!-- Top Mark -->
  <g transform="translate(385, 60)">
    <rect width="30" height="30" fill="none" stroke="white" stroke-width="2" opacity="0.4" />
    <path d="M 5 15 L 25 15 M 15 5 L 15 25" stroke="white" stroke-width="1" opacity="0.2" />
  </g>
</svg>'''

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(svg_template)

def update_mdx(filepath, new_image_path):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Update image field in frontmatter
    # We use regex to preserve quotes or lack thereof
    new_content = re.sub(r'(image:\s*).*(\n)', rf'\1{new_image_path}\2', content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

# --- MAIN EXECUTION ---
# Load Refined Data
with open('refined_thumbnail_data.json', 'r', encoding='utf-8') as f:
    refined_data = json.load(f)

for filename, data in refined_data.items():
    filepath = os.path.join(ARTICLES_DIR, filename)
    name_no_ext = os.path.splitext(filename)[0]
    
    if not os.path.exists(filepath):
        print(f"Skipping: {filename} (File not found)")
        continue

    role = data['role']
    main_title = data['main']
    sub_title = data['sub']
    
    svg_filename = f"premium-hybrid-{name_no_ext}.svg"
    svg_path = os.path.join(ASSETS_DIR, svg_filename)
    
    print(f"Processing: {filename} -> {role} | {main_title}")
    
    generate_svg(role, main_title, sub_title, svg_path)
    update_mdx(filepath, f"/assets/{svg_filename}")

print("Successfully updated 70 articles with refined titles.")
