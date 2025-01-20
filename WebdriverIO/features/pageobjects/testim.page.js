const { $, browser, expect } = require("@wdio/globals");
require("dotenv").config();
const data = require("../data/testimData.json");
const helper = require("../../utils/helper");
class Testim {
  get headers() {
    return $$(".has-drop");
  }
  get company() {
    return $("//a[text()='Company']");
  }
  get customer() {
    return $("//span[text()='Customers']");
  }
  get review() {
    return $("//h3[contains(text(),'saying')]");
  }
  get name() {
    return $("(//div[@class='item-name'])[1]");
  }
  get title() {
    return $("(//div[@class='item-position'])[1]");
  }
  get content() {
    return $("(//div[@class='item-body'])[1]");
  }
  get footer() {
    return $("#footer");
  }
  get link() {
    return $$(".col");
  }
  get icon() {
    return $$("//div[@class='f-icons']//div");
  }
  get footerText() {
    return $$("//div[@class='col-terms']//li");
  }
  getSection(data) {
    return $(`//a[text()="${data}"]`);
  }
  async navigate() {
    await helper.allureStep("Navigate to the base URL", async () => {
      await browser.url(process.env.testimBaseURL);
    });
  }
  async validateHeader() {
    await helper.allureStep("Validate headers on the page", async () => {
      helper.checkComponent(this.headers,"headers");
    });
  }
  async navigateComanySection() {
    await helper.allureStep("Navigate to the Company section", async () => {
      await this.company.click();
      await this.company.waitForExist();
    });
  }
  async checkCompanySection() {
    await helper.allureStep("Check Company section visibility", async () => {
      helper.checkSection(this.getSection, data.companySections);
    });
  }
  async navigateCustomerSection() {
    await helper.allureStep("Navigate to the Customer section", async () => {
      await this.customer.click();
    });
  }
  async identifyReview() {
    await helper.allureStep("Identify the displayed review", async () => {
      await this.review.scrollIntoView();
      await helper.checkReview(this.name, data.name);
      await helper.checkReview(this.title, data.title);
      await helper.checkReview(this.content, data.content);
    });
  }
  async navigateFooterSection() {
    await helper.allureStep("Navigate to the footer section", async () => {
      await this.footer.scrollIntoView();
    });
  }
  async verifyFooterComponents() {
    await helper.allureStep("Verify footer components visibility", async () => {
      await helper.checkComponent(this.link,"link");
      await helper.checkComponent(this.icon,"icons");
      await helper.checkComponent(this.footerText,"footer text");
    });
  }
}
module.exports = new Testim();
