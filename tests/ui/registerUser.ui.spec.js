const { test, expect } = require("../../fixtures/uiFixtures.js");

test.describe("TS-005 - UI - Account Registration", () => {
  test(
    "TC-005 - Register a new user",
    { tag: "@smoke" },
    async ({ homePage, loginPage, signupPage }) => {
      await homePage.navigateToLogin();
      await loginPage.waitForNetworkIdle();
      await loginPage.register();
      await signupPage.waitForNetworkIdle();
      await signupPage.createAccount();
      await signupPage.deleteAccount();
    },
  );
});
