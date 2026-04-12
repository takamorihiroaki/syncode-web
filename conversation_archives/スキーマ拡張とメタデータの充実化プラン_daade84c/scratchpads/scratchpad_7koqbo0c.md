# Code Block Visibility Check Task

- [x] Open http://localhost:4321/articles/antigravity-markdown-layout-break-fix-guide
- [x] Locate code blocks (pre/code elements)
- [x] Identify elements like "## 手順" or "1." within code blocks
- [x] Record computed styles (visual confirmation and CSS check)
- [x] Record any findings or issues discovered during the check

## Findings
- Visually, the text inside code blocks (e.g., "まずこれをやります") is very dark grey on a dark background, making it almost impossible to read.
- "## 手順" is rendered in a light blue color (approx. #79b8ff or similar).
- List numbers ("1.", "2.", "3.") are rendered in a light orange/yellow color.
- The background of the code blocks is dark (approx. #1e1e1e or #000000), which contradicts the `#f7f7f7` setting found in `global.css`, indicating an override (likely from a syntax highlighter like Shiki).
- Contrast ratio between the faint grey text and the dark background is extremely low, confirming the reported issue.
