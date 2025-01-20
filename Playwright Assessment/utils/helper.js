const { expect } = require("@playwright/test");
const { allure } = require("allure-playwright");
const fs = require("fs");
function getCurrentDate() {
  const now = new Date();
  const day = now.getUTCDate();
  const month = now.toLocaleString("en-US", { month: "long", timeZone: "UTC" });
  const year = now.getUTCFullYear();
  return `${day} ${month} ${year}`;
}
function getCheckoutDate() {
  const now = new Date();
  now.setUTCDate(now.getUTCDate() + 7);
  const day = now.getUTCDate();
  const month = now.toLocaleString("en-US", { month: "long", timeZone: "UTC" });
  const year = now.getUTCFullYear();
  return `${day} ${month} ${year}`;
}
function componentVisible(data, locator, text) {
  let count=0
  for (let node of data) {
    const section = locator(node);
    count++
    expect(section).toBeVisible();
  }
  logToFile(`count of ${text} components :- ${count}`)
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
async function checkReview(content, data) {
  const displayedContent = await content.innerText();
  expect(displayedContent).toBe(data);
}
async function footer(component,text) {
  const list = await component.elementHandles();
  let count = 0;
  for (let node of list) {
    if (node.isVisible()) count++;
  }
  logToFile(`count of ${text} components :- ${count}`)
}
function logToFile(message) {
  const logFilePath = 'outputLogs/testLogs.txt';
  fs.appendFileSync(logFilePath, message + '\n', 'utf8');
}
module.exports = {
  getCurrentDate,
  getCheckoutDate,
  componentVisible,
  allureStep,
  convertIntoPrice,
  convertIntoPercentage,
  calculatePercentage,
  checkReview,
  footer,
  logToFile
};
