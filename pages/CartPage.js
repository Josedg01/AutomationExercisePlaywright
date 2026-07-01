const { HeaderPage } = require("./HeaderPage");

class CartPage extends HeaderPage {
  constructor(page) {
    super(page);
    this.checkoutBtn = ".check_out";
    this.cartInfoBox = "#cart_info";
  }

  async verifyItemInCart(product) {
    const viewCart = this.page.locator(this.viewCart).first();
    await viewCart.click();
    await this.containText(this.itemInCart, product);
  }
}

module.exports = { CartPage };
