const { Given, When, Then } = require("@wdio/cucumber-framework");
const testimInstance = require("../pageobjects/testim.page");
Given("I open the Testim website", async () => {
  await testimInstance.navigate();
});
Then("all header elements should be present", async () => {
  await testimInstance.validateHeader();
});
When("I click on the Company menu item", async () => {
  await testimInstance.navigateComanySection();
});
Then(
  "I should see subsections like About Us, Careers, Customers, Testim Partners",
  async () => {
    await testimInstance.checkCompanySection();
  }
);
When("I navigate to the Customers section", async () => {
  await testimInstance.navigateCustomerSection();
});
When("I identify a specific review", async () => {
  await testimInstance.identifyReview();
});
When("I scroll to the footer", async () => {
  await testimInstance.navigateFooterSection();
});
Then(
  "I should see footer components like social media links, newsletter subscription, copyright text, and privacy policy links",
  async () => {
    await testimInstance.verifyFooterComponents();
  }
);
