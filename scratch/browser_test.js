const { chromium } = require('playwright');

(async () => {
  try {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://example.com');
    console.log('Title:', await page.title());
    await browser.close();
    console.log('Browser test successful');
  } catch (e) {
    console.error('Browser test failed:', e);
    process.exit(1);
  }
})();
