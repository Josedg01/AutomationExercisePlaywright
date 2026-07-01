const { BaseHelper } = require("../helpers/BaseHelper");
const { expect } = require("@playwright/test");

class ProductsPage extends BaseHelper {
  constructor(page) {
    super(page);
    this.loginBtn = "a[href*='login']";
    this.viewCart = "a[href*='/view_cart']";
    this.itemInCart = ".cart_description a[href*='/product_details/1']";
    this.productsTitle = ".features_items .title";
    this.searchInput = "#search_product";
    this.searchButton = "#submit_search";
    this.continueShoppingButton = ".btn-success";
  }

  async verifyAllProductsVisible() {
    await this.expectVisible(this.productsTitle);
  }

  async searchProduct(productName) {
    await this.fill(this.searchInput, productName);
    await this.click(this.searchButton);
  }

  async verifySearchedProductsVisible(productName) {
    await this.expectVisible(this.productsTitle);
    await expect(
      this.page
        .locator(".productinfo p")
        .filter({ hasText: productName })
        .first(),
    ).toBeVisible();
  }

  async navigateToLogin() {
    await this.click(this.loginBtn);
  }

  async addProductToCart(product) {
    const productCard = this.page
      .locator(".single-products")
      .filter({ hasText: product })
      .first();

    await productCard.hover();
    await this.page.waitForTimeout(5000);
    await productCard
      .locator('.overlay-content a:has-text("Add to cart")')
      .click();
  }
}

module.exports = { ProductsPage };
