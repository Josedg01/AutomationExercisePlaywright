const { BasePage } = require("./BasePage");

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.loginBtn = "a[href*='login']";
    this.viewCart = "a[href*='/view_cart']";
    this.itemInCart = ".cart_description a[href*='/product_details/1']";
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

    await productCard
      .locator('.overlay-content a:has-text("Add to cart")')
      .click();

    const viewCart = this.page.locator("a[href*='/view_cart']").first();
    await viewCart.click();
    await this.containText(this.itemInCart, product);
  }
}

module.exports = { HomePage };
