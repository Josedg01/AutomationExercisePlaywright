const { BasePage } = require("./BasePage");

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.loginBtn = "a[href*='login']";
    this.productsLinkPage = "a[href*='/products']";
    this.contactUsLinkPage = "a[href='/contact_us']";
    this.viewCart = "a[href*='/view_cart']";
    this.itemInCart = ".cart_description a[href*='/product_details/1']";
  }

  async navigateToLogin() {
    await this.click(this.loginBtn);
  }

  async navigateToProducts() {
    await this.click(this.productsLinkPage);
  }

  async navigateToContactUs() {
    await this.click(this.contactUsLinkPage);
  }
}

module.exports = { HomePage };
