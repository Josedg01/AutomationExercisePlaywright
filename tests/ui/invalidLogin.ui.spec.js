const { test, expect } = require("../../fixtures/uiFixtures.js");
const testData = require("../../testData/credentials.json");

test.describe("TS-003 - UI - Login - Invalid Credentials", () => {
  test(
    "TC-003 - Invalid Login",
    { tag: "@regression" },
    async ({ homePage, loginPage }) => {
      await homePage.navigateToLogin();
      await loginPage.wrongLogin(
        testData.wrongUserEmail,
        testData.wrongPassword,
      );
    },
  );
});
