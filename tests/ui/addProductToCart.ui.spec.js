const { test, expect } = require("../../fixtures/uiFixtures.js");
const testData = require("../../testData/credentials.json");

test.describe("TS-001 - UI - Shopping Cart", () => {
  test(
    "TC-001 - Add one product to cart",
    { tag: "@smoke" },
    async ({ homePage, loginPage, productsPage, cartPage }) => {
      await homePage.navigateToLogin();
      await loginPage.loginIn(testData.userEmail, testData.password);
      await homePage.navigateToProducts();
      await productsPage.verifyAllProductsVisible();
      await productsPage.searchProduct(testData.product);
      await productsPage.verifySearchedProductsVisible();
      await productsPage.addProductToCart(testData.product);
      await cartPage.verifyItemInCart(testData.product);
    },
  );
});
