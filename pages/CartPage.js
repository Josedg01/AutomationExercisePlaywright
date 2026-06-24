const { BasePage } = require("./BasePage");

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.checkoutBtn = ".check_out";
    this.cartInfoBox = "#cart_info";
    //this.itemsIncart = "a[href*='/view_cart']";
    this.itemInCart = ".cart_description a[href*='/product_details/1']";
  }

  async verifyItemInCart(product) {
    const viewCart = this.page.locator("a[href*='/view_cart']").first();
    await viewCart.click();
    await this.containText(this.itemInCart, product);
  }
}

module.exports = { CartPage };
