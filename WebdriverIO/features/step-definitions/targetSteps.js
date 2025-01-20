const { Given, When, Then } = require("@wdio/cucumber-framework");
const targetInstance = require("../pageobjects/target.page");
Given(/^I navigate to the Target website$/, async () => {
  await targetInstance.navigate();
});
When(/^I search for a product$/, async () => {
  await targetInstance.searchProduct();
});
Then(/^I should see the correct result page$/, async () => {
  await targetInstance.verifyResult();
});
When(/^I select a specific watch$/, async () => {
  await targetInstance.clickSelectedWatch();
});
Then(
  /^I should see the correct price and discount information for the watch$/,
  async () => {
    await targetInstance.verifySelectedWatch();
  }
);
