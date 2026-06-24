const { expect } = require("@playwright/test");
const { BasePage } = require("./BasePage");

class ContactPage extends BasePage {
  constructor(page) {
    super(page);
    this.getInTouchTitle = ".contact-form .title";
    this.nameInput = '[data-qa="name"]';
    this.emailInput = '[data-qa="email"]';
    this.subjectInput = '[data-qa="subject"]';
    this.messageInput = '[data-qa="message"]';
    this.submitButton = '[data-qa="submit-button"]';
    this.successMessage = page.locator(".status.alert.alert-success");
  }

  async verifyContactPageVisible() {
    await this.expectVisible(this.getInTouchTitle);
  }

  async submitContactForm(name, email, subject, message) {
    await this.fill(this.nameInput, name);
    await this.fill(this.emailInput, email);
    await this.fill(this.subjectInput, subject);
    await this.fill(this.messageInput, message);
    await this.page.waitForTimeout(5000);
    this.page.once("dialog", async (dialog) => {
      await dialog.accept();
    });

    await this.click(this.submitButton);
  }

  async verifySuccessMessage() {
    await expect(this.successMessage).toContainText(
      "Success! Your details have been submitted successfully.",
    );
  }
}

module.exports = { ContactPage };
