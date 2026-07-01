const { HeaderPage } = require("./HeaderPage");

class HomePage extends HeaderPage {
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
