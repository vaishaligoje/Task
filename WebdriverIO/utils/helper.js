const allure = require("@wdio/allure-reporter");
const { expect } = require("chai");
const fs = require("fs");
function getCurrentDate() {
  const now = new Date();
  const day = now.getUTCDate();
  const month = now.toLocaleString("en-US", { month: "long", timeZone: "UTC" });
  const year = now.getUTCFullYear();
  return `${day} ${month} ${year}`;
}
function getCheckoutDate(data) {
  const now = new Date();
  now.setUTCDate(now.getUTCDate() + data);
  const day = now.getUTCDate();
  const month = now.toLocaleString("en-US", { month: "long", timeZone: "UTC" });
  const year = now.getUTCFullYear();
  return `${day} ${month} ${year}`;
}
async function allureStep(message, fn) {
  await allure.step(message, async () => {
    await fn();
  });
}
function convertIntoPrice(text) {
  const priceRegex = /\$(\d+\.\d{2})/;
  const priceMatch = text.match(priceRegex);
  const price = priceMatch ? priceMatch[1] : null;
  return price;
}
function convertIntoPercentage(text) {
  const percentageRegex = /(\d+)%/;
  const percentageMatch = text.match(percentageRegex);
  const percentage = percentageMatch ? percentageMatch[1] : null;
  return percentage;
}
function calculatePercentage(discountPrice, savedMoney) {
  const originalPrice = parseFloat(discountPrice) + parseFloat(savedMoney);
  const expectedDiscountPercentage = (savedMoney / originalPrice) * 100;
  return expectedDiscountPercentage;
}
async function checkComponent(component, text) {
  const components = await component;
  logToFile(`count of ${text} :- ${components.length}`);
  let count = 0;
  for (let index = 0; index < components.length; index++) {
    const isVisible = await components[index].isDisplayed();
    if (isVisible) count++;
  }
  logToFile(`Number of visible ${text} components :- ${count}`);
}
async function checkReview(content, data) {
  const displayedContent = await content.getText();
  expect(displayedContent).to.equal(data);
}
async function checkSection(locator, data) {
  for (const section of data) {
    const element = locator(section);
    const isVisible = await element.isDisplayed();
    if (isVisible) {
      logToFile(`${section} is visible`);
    } else {
      logToFile(`${section} is not visible`);
    }
  }
}
function logToFile(message) {
  const logFilePath = "outputLogs/testLogs.txt";
  fs.writeFileSync(logFilePath, message + "\n", "utf8");
}
module.exports = {
  getCurrentDate,
  getCheckoutDate,
  allureStep,
  convertIntoPrice,
  convertIntoPercentage,
  calculatePercentage,
  checkComponent,
  checkReview,
  checkSection,
  logToFile,
};
