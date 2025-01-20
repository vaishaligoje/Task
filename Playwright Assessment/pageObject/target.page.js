require("dotenv").config();
const data = require("../data/targetData.json");
const { expect } = require("@playwright/test");
const helper = require("../utils/helper");
exports.Target = class Target {
  constructor(page) {
    this.page = page;
    this.searchBar = page.locator("#search");
    this.searchButton = page.locator("//button[text()='search']");
    this.resultHeading = page.locator(
      "//span[contains(@class,'h-display-flex')]"
    );
    this.selectWatch = page.locator(
      "(//picture[@data-test='@web/ProductCard/ProductCardImage/primary']//img)[2]"
    );
    this.productPrice = page.locator(
      "(//div[@class='h-margin-a-module-gap']//span[@data-test='product-price'])"
    );
    this.productDiscount = page.locator(
      "//div[@class='h-margin-a-module-gap']//span[@data-test='product-savings-amount']"
    );
  }
  async navigate() {
    await helper.allureStep("Navigate to Target homepage", async () => {
      await this.page.goto(process.env.targetBaseURL);
    });
  }
  async searchProduct() {
    await helper.allureStep("Click on search bar and fill input", async () => {
      await this.searchBar.click();
      await this.searchBar.fill(data.input);
    });
    await helper.allureStep(
      "Click search button to search product",
      async () => {
        await this.searchButton.click();
        await this.page.waitForTimeout(parseInt(process.env.smallTimeout));
      }
    );
  }
  async verifyResult() {
    await helper.allureStep(
      "Verify the URL matches the search page URL",
      async () => {
        const URL = await this.page.url();
        expect(URL).toBe(data.searchPage);
      }
    );
    await helper.allureStep(
      "Verify the heading contains the search term",
      async () => {
        const headingText = await this.resultHeading.innerText();
        expect(headingText).toContain(data.input);
      }
    );
  }
  async clickSelectedWatch() {
    await helper.allureStep("Click on the selected watch", async () => {
      await this.selectWatch.click();
      await this.page.waitForTimeout(parseInt(process.env.smallTimeout));
    });
  }
  async verifySelectedWatch() {
    await helper.allureStep("Retrieve and print product price", async () => {
      const priceText = await this.productPrice.innerText();
      helper.logToFile(`Discount price on product :- ${priceText}`)
    });
    await helper.allureStep("Retrieve and print product discount", async () => {
      const discountText = await this.productDiscount.innerText();
      helper.logToFile(`discount on product :- ${discountText}`)
    });
    await helper.allureStep(
      "Extract and calculate discount details",
      async () => {
        const priceText = await this.productPrice.innerText();
        const discountText = await this.productDiscount.innerText();
        const discountPrice = helper.convertIntoPrice(priceText);
        const percentage = helper.convertIntoPercentage(discountText);
        const savedMoney = helper.convertIntoPrice(discountText);
        helper.logToFile(`offer price :- ${discountPrice}`)
        helper.logToFile(`Discount on product :- ${percentage}`)
        helper.logToFile('saved money on product :- ${savedMoney}')
        const expectedDiscountPercentage = helper.calculatePercentage(
          discountPrice,
          savedMoney
        );
        helper.logToFile(`Expected discount on product :- ${expectedDiscountPercentage}`)
        expect(parseInt(expectedDiscountPercentage)).toBe(parseInt(percentage));
      }
    );
  }
};
