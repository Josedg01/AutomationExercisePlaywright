const { test, expect } = require("@playwright/test");

const { BasePage } = require("../../pages/BasePage.js");
const { HomePage } = require("../../pages/HomePage.js");
const { LoginPage } = require("../../pages/LoginPage.js");
const { CartPage } = require("../../pages/CartPage.js");
const { ProductsPage } = require("../../pages/ProductsPage.js");
const { setupAdHandling } = require("../../helpers/adsHelper.js");
const testData = JSON.parse(
  JSON.stringify(require("../../testData/credentials.json")),
);

test.beforeEach(async ({ page }) => {
  await setupAdHandling(page);
});

test("Add one product to cart", async ({ page }) => {
  const basePage = new BasePage(page);
  await basePage.goTo();
  const homePage = new HomePage(page);
  await homePage.navigateToLogin();
  const loginPage = new LoginPage(page);
  await loginPage.loginIn(testData.userEmail, testData.password);
  await homePage.navigateToProducts(page);
  const productPage = new ProductsPage(page);
  await productPage.verifyAllProductsVisible();
  await productPage.searchProduct(testData.product);
  await productPage.verifySearchedProductsVisible();
  await productPage.addProductToCart(testData.product);
  const cartPage = new CartPage(page);
  await cartPage.verifyItemInCart(testData.product);
});
