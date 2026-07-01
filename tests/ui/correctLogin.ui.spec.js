const { test, expect } = require("../../fixtures/uiFixtures.js");
const testData = require("../../testData/credentials.json");

test.describe("TS-002 - UI - Login - Valid Credentials", () => {
  test(
    "TC-002 - Correct Login",
    { tag: "@smoke" },
    async ({ homePage, loginPage }) => {
      await homePage.navigateToLogin();
      await loginPage.loginIn(testData.userEmail, testData.password);
    },
  );
});
