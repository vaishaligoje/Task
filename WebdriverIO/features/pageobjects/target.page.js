const { $, browser } = require("@wdio/globals");
require("dotenv").config();
const data = require("../data/targetData.json");
const helper = require("../../utils/helper");
const { expect } = require("chai");
class Target {
  get searchBar() {
    return $("#search");
  }
  get searchButton() {
    return $("//button[text()='search']");
  }
  get resultHeading() {
    return $("//span[contains(@class,'h-display-flex')]");
  }
  get selectWatch() {
    return $(
      "(//picture[@data-test='@web/ProductCard/ProductCardImage/primary']//img)[2]"
    );
  }
  get productPrice() {
    return $(
      "(//div[@class='h-margin-a-module-gap']//span[@data-test='product-price'])"
    );
  }
  get productDiscount() {
    return $(
      "//div[@class='h-margin-a-module-gap']//span[@data-test='product-savings-amount']"
    );
  }
  async navigate() {
    await helper.allureStep("Navigate to the Target homepage", async () => {
      await browser.url(process.env.targetBaseURL);
    });
  }
  async searchProduct() {
    await helper.allureStep(
      "Click on the search bar and fill input",
      async () => {
        await this.searchBar.click();
        await this.searchBar.setValue(data.input);
      }
    );
    await helper.allureStep(
      "Click on search button to search for a product",
      async () => {
        await this.searchButton.click();
        await browser.pause(process.env.smallTimeout);
      }
    );
  }
  async verifyResult() {
    await helper.allureStep(
      "Verify the URL matches the search page URL",
      async () => {
        const URL = await browser.getUrl();
        expect(URL).to.equal(data.searchPage);
      }
    );
    await helper.allureStep(
      "Verify the heading contains the search term",
      async () => {
        const headingText = await this.resultHeading.getText();
        expect(headingText).to.include(data.input);
      }
    );
  }
  async clickSelectedWatch() {
    await helper.allureStep("Click on the selected watch", async () => {
      await this.selectWatch.click();
      await browser.pause(process.env.smallTimeout);
    });
  }
  async verifySelectedWatch() {
    await helper.allureStep("Verify product price and discount", async () => {
      const priceText = await this.productPrice.getText();
      helper.logToFile(`Discount price text on product :- ${priceText}`)
      const discountText = await this.productDiscount.getText();
      helper.logToFile(`Discount text on Product :- ${discountText}`)
      const discountPrice = helper.convertIntoPrice(priceText);
      const percentage = helper.convertIntoPercentage(discountText);
      const savedMoney = helper.convertIntoPrice(discountText);
      helper.logToFile(`Discount price on product :- ${discountPrice}`)
      helper.logToFile(`Discount on Product :- ${ percentage}`)
      helper.logToFile(`Saved money on product :- ${savedMoney}`)
      const expectedDiscountPercentage = helper.calculatePercentage(
        discountPrice,
        savedMoney
      );
      helper.logToFile(`Expected discount on product :- ${expectedDiscountPercentage}`)
      expect(Math.round(expectedDiscountPercentage)).to.equal(
        parseInt(percentage)
      );
    });
  }
}
module.exports = new Target();
