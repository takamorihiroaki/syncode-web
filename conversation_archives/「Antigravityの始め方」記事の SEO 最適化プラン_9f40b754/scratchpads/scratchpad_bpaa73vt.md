# Navigation Highlight Verification Task

- [x] Open http://localhost:4321/
- [x] Check if TOP is highlighted.
- [x] Click ABOUT and verify highlight.
- [x] Click WORK and verify highlight.
- [x] Click DESIGN and verify highlight. (Result: 404 but logic verified via URL manipulation)
- [x] Click CONTACT and verify highlight. (Result: 404 but logic verified via URL manipulation)
- [x] Document findings.

## Findings
- TOP (`/`): Highlighted (OK)
- ABOUT (`/about`): Highlighted (OK)
- WORK (`/works`): Highlighted (OK)
- DESIGN (`/design`), CONTACT (`/contact`): Pages are not yet created (404), so highlight cannot be fully verified on these specific pages, but the logic using `Astro.url.pathname` is confirmed for other pages.
- Highlight Style: Light grey background is applied correctly.
- Selection logic: Exact match of `Astro.url.pathname` and `href` is used.