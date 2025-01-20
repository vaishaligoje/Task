require("dotenv").config();
const data = require("../data/testimData.json");
const { expect } = require("@playwright/test");
const helper = require("../utils/helper");
exports.Testim = class Testim {
  constructor(page) {
    this.page = page;
    this.headers = page.locator(".has-drop");
    this.headerComponent = (data) => page.locator(`//a[text()='${data}']`);
    this.company = page.locator("//a[text()='Company']");
    this.companyComponent = (data) => page.locator(`//span[text()='${data}']`);
    this.customer = page.locator("//span[text()='Customers']");
    this.review = page.locator("//h3[contains(text(),'saying')]");
    this.name = page.locator("(//div[@class='item-name'])[1]");
    this.title = page.locator("(//div[@class='item-position'])[1]");
    this.content = page.locator("(//div[@class='item-body'])[1]");
    this.footer = page.locator("#footer");
    this.link = page.locator(".col");
    this.icon = page.locator("//div[@class='f-icons']//div");
    this.footerText = page.locator("//div[@class='col-terms']//li");
  }
  async navigate() {
    await helper.allureStep("Navigate to Testim homepage", async () => {
      await this.page.goto(process.env.testimBaseURL);
    });
  }
  async checkHeaders() {
    await helper.allureStep(
      "Check visibility of header components",
      async () => {
        helper.componentVisible(data.headerComponents, this.headerComponent,"Header");
      }
    );
  }
  async navigateToCompany() {
    await helper.allureStep("Navigate to Company section", async () => {
      await this.company.click();
      await this.page.waitForTimeout(parseInt(process.env.smallTimeout));
    });
  }
  async checkCompanySection() {
    await helper.allureStep(
      "Check visibility of company section components",
      async () => {
        helper.componentVisible(data.companySections, this.companyComponent,"Company");
      }
    );
  }
  async navigateToCustomer() {
    await helper.allureStep("Navigate to Customers section", async () => {
      await this.customer.click();
    });
  }
  async navigateReview() {
    await helper.allureStep("Scroll to review section", async () => {
      await this.review.scrollIntoViewIfNeeded();
    });
  }
  async identifyReview() {
    await helper.allureStep("Identify the displayed review", async () => {
      await helper.checkReview(this.name, data.name);
      await helper.checkReview(this.title, data.title);
      await helper.checkReview(this.content, data.content);
    });
  }
  async validateFooter() {
    await helper.allureStep("Validate footer content visibility", async () => {
      await this.footer.scrollIntoViewIfNeeded();
      await helper.footer(this.link,"Link");
      await helper.footer(this.icon,"Icons");
      await helper.footer(this.footerText,"Footer Text");
    });
  }
};
