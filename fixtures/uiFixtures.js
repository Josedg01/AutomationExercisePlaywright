const base = require("@playwright/test");

const { BaseHelper } = require("../helpers/BaseHelper.js");
const { setupAdHandling } = require("../helpers/adsHelper.js");
const { HomePage } = require("../pages/HomePage.js");
const { LoginPage } = require("../pages/LoginPage.js");
const { CartPage } = require("../pages/CartPage.js");
const { ProductsPage } = require("../pages/ProductsPage.js");
const { ContactPage } = require("../pages/ContactPage.js");
const { SignupPage } = require("../pages/SignupPage.js");

// Ad handling and the initial navigation used to be repeated in a
// `test.beforeEach` (or worse, inline) in every spec file. Doing it once
// here, before the `page` fixture is handed to the test, keeps every UI
// test starting from the same known state without duplicating setup code.
const test = base.test.extend({
  page: async ({ page }, use) => {
    await setupAdHandling(page);
    await new BaseHelper(page).goTo();
    await use(page);
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  contactPage: async ({ page }, use) => {
    await use(new ContactPage(page));
  },
  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },
});

module.exports = { test, expect: base.expect };
