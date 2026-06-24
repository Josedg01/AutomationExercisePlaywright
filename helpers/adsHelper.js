async function setupAdBlocking(page) {
  await page.route("**/*", async (route) => {
    const url = route.request().url();

    const adDomains = [
      "googleads",
      "googlesyndication",
      "doubleclick",
      "adservice",
      "adsystem",
      "amazon-adsystem",
      "googletagmanager",
      "googletagservices",
      "adsafeprotected",
      "adnxs",
      "taboola",
      "outbrain",
    ];

    const isAdRequest = adDomains.some((domain) => url.includes(domain));

    if (isAdRequest) {
      await route.abort();
      return;
    }

    await route.continue();
  });
}

async function setupAdCloser(page) {
  const adFrame = page
    .locator('iframe[id^="aswift"], iframe[name^="aswift"]')
    .first();

  await page.addLocatorHandler(adFrame, async () => {
    for (const frame of page.frames()) {
      const possibleCloseButtons = [
        '[aria-label="Close ad"]',
        '[aria-label="Close"]',
        '[aria-label*="Close"]',
        '[aria-label*="cerrar"]',
        'button:has-text("Close")',
        'div[role="button"]',
      ];

      for (const selector of possibleCloseButtons) {
        try {
          const closeButton = frame.locator(selector).first();

          if (await closeButton.isVisible({ timeout: 500 })) {
            await closeButton.click({ timeout: 1000 });
            return;
          }
        } catch (error) {
          // Ignore frames/selectors where the close button does not exist
        }
      }
    }
  });
}

async function setupAdHandling(page) {
  await setupAdBlocking(page);
  await setupAdCloser(page);
}

module.exports = { setupAdHandling };
