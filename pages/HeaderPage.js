const { BaseHelper } = require("../helpers/BaseHelper");

class HeaderPage extends BaseHelper {
  constructor(page) {
    super(page);
    this.homeBtn = ".fa-home";
    this.loginBtn = "a[href*='login']";
    this.productsLinkPage = "a[href*='/products']";
    this.contactUsLinkPage = "a[href='/contact_us']";
    this.viewCart = "a[href*='/view_cart']";
    this.itemInCart = ".cart_description a[href*='/product_details/1']";
    this.loggedInLabel = "li:nth-child(10) a:nth-child(1)";
    this.deleteAccountBtn = "[href*='/delete_account']";
    this.logoutBtn = "[href*='/logout']";
  }
}

module.exports = { HeaderPage };
