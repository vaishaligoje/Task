const { test, expect } = require("@playwright/test");
const { Testim } = require("../pageObject/testim.page");
test.describe("Testim UI testcases", () => {
  let testimInstance;
  test.beforeEach("navigating to Testim page", async ({ page }) => {
    testimInstance = new Testim(page);
    await testimInstance.navigate();
  });
  test("Navigate to the Company Section", async ({ page }) => {
    await testimInstance.checkHeaders();
    await testimInstance.navigateToCompany();
    await testimInstance.checkCompanySection();
    await testimInstance.navigateToCustomer();
    await testimInstance.navigateReview();
    await testimInstance.identifyReview();
    await testimInstance.validateFooter();
  });
});
