import os
import re

# プロジェクトのルートディレクトリを基準にする
base_dir = "/Volumes/TOSHIBA EXT/syncode-web"
articles_dir = os.path.join(base_dir, "src/content/articles")
files = [f for f in os.listdir(articles_dir) if f.endswith(".md")]

cta_top = """
<div class="cta-box top">

👉 全体像がまだの方はこちら  
[Antigravity Additional Options完全ガイド](/articles/antigravity-additional-options-guide/)

</div>
"""

cta_middle = """
<div class="cta-box middle">

👉 初期設定がまだの方はこちら  
[初期設定ガイド](/articles/antigravity-initial-setup-guide/)

</div>
"""

cta_bottom = """
<div class="cta-box bottom">

👉 次にやるべきこと（0→1ガイド）  
[ブログ収益化の始め方（0→1ガイド）](/articles/antigravity-monetization-guide/)

</div>
"""

def process_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    file_name = os.path.basename(file_path)
    
    # すでに挿入済みの場合はスキップ
    if "cta-box" in content:
        print(f"Skipping {file_name}: CTA already exists.")
        return

    # 自身のページへのリンクは除外
    current_cta_top = cta_top if "additional-options-guide" not in file_name else ""
    current_cta_middle = cta_middle if "initial-setup-guide" not in file_name else ""
    current_cta_bottom = cta_bottom if "monetization-guide" not in file_name else ""

    # Frontmatterの終端を探す
    fm_match = re.search(r'^---.*?---\n', content, re.DOTALL)
    if not fm_match:
        return
    
    fm_end = fm_match.end()
    
    # 1. 上部CTAの挿入位置（導入文の直後）
    first_h2 = re.search(r'^##\s', content[fm_end:], re.MULTILINE)
    if first_h2:
        # 最初の見出しの直後の段落末を探す
        h2_start = fm_end + first_h2.start()
        h2_para_end = re.search(r'\n\s*\n', content[fm_end+first_h2.end():])
        if h2_para_end:
            top_pos = fm_end+first_h2.end() + h2_para_end.end()
        else:
            top_pos = fm_end+first_h2.end()
    else:
        top_pos = fm_end + 100

    # 2. 中盤CTAの挿入位置（記事の半分あたり）
    mid_point = len(content) // 2
    mid_h2 = re.search(r'^##\s', content[mid_point:], re.MULTILINE)
    if mid_h2:
        mid_pos = mid_point + mid_h2.start()
    else:
        mid_pos = mid_point

    # 3. 末尾CTAの挿入位置（まとめや関連記事の前）
    related_sec = re.search(r'^##\s+(関連記事|関連記事（導線強化）|まとめ)', content, re.MULTILINE)
    if related_sec:
        bottom_pos = related_sec.start()
    else:
        last_hr = content.rfind('\n---\n')
        if last_hr > (len(content) * 0.7):
            bottom_pos = last_hr
        else:
            bottom_pos = len(content)

    # コンテンツの再構築
    parts = []
    parts.append(content[:top_pos].rstrip())
    if current_cta_top:
        parts.append("\n\n" + current_cta_top.strip() + "\n")
    
    parts.append(content[top_pos:mid_pos].rstrip())
    if current_cta_middle:
        parts.append("\n\n" + current_cta_middle.strip() + "\n")
    
    parts.append(content[mid_pos:bottom_pos].rstrip())
    if current_cta_bottom:
        parts.append("\n\n" + current_cta_bottom.strip() + "\n")
    
    parts.append("\n" + content[bottom_pos:].lstrip())

    final_content = "".join(parts)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(final_content)
    print(f"Processed {file_name}")

for file in files:
    process_file(os.path.join(articles_dir, file))
