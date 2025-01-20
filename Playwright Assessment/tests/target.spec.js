const { test } = require("@playwright/test");
const { Target } = require("../pageObject/target.page");
test("Target test cases", async ({ page }) => {
  let targetInstance = new Target(page);
  await targetInstance.navigate();
  await targetInstance.searchProduct();
  await targetInstance.verifyResult();
  await targetInstance.clickSelectedWatch();
  await targetInstance.verifySelectedWatch();
});
