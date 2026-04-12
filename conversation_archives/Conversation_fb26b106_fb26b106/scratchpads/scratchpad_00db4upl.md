# Task Checklist
- [x] Open http://localhost:4321/articles/chapter-3 (Encountered 500 error: "Missing parameter: slug")
- [ ] Verify article title "Chapter 3: Techniques for Eliminating 'Emotive Noise' from AI" (Unable to verify due to 500 error)
- [ ] Verify if image `/assets/ai-error-analysis05.png` is visible (Unable to verify)
- [ ] Verify if text content is present (Unable to verify)
- [x] Capture screenshot for confirmation (Captured error page)

# Findings
- The site is currently broken with a 500 Internal Server Error.
- The error message is `TypeError: Missing parameter: slug`.
- This error occurs in `getStaticPaths`, indicating that one or more articles in the collection are missing a valid `slug` parameter, or the routing code is incorrectly handling the collection.
- All article pages (chapter-2, chapter-3, markdown-guide) are inaccessible due to this error.
- As a browser agent, I cannot modify the source code or markdown files to fix this issue.
