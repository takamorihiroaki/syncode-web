# Menu Behavior Investigation Plan

- [x] Navigate to `http://localhost:4321` and capture styles for `.main-nav ul` and `.main-nav a`.
    - Captured DOM. Link positions: TOP(339,235), ABOUT(430,235), WORK(530,235), TOOLS(629,235). Gaps: ~90-100px.
- [x] Navigate to `http://localhost:4321/tools` and capture styles for `.main-nav ul` and `.main-nav a`.
    - Captured DOM. Link positions: TOP(384,237), ABOUT(439,237), WORK(504,237), TOOLS(586,235). Gaps: ~55-82px.
- [/] Compare the two sets of styles to identify discrepancies.
    - Result: The menu on the TOOLS page is significantly more compact (narrower gaps).
- [ ] Report findings to the user.
