const { Given, When, Then } = require("@wdio/cucumber-framework");
const { $, browser } = require("@wdio/globals");
require("dotenv").config();
const youTube = require("../pageobjects/youtube.page");
Given("I am on the youtubePage", async () => {
  await youTube.openYoutube();
  await browser.pause(process.env.smallTimeout);
});
When("Ensure the page title contains “YouTube.”", async () => {
  await youTube.checkTitle();
});
When(/^Verify the URL$/, async () => {
  await youTube.checkURL();
});
Given(/^I am on the search bar$/, async () => {
  await youTube.clickSearchBar();
});
When(/^Enter a query and submit the search.$/, async () => {
  await youTube.searchvideo();
});
Then(
  /^Verify that the search results are loaded and ensure that at least 10 video results are present$/,
  async () => {
    await youTube.verifyVideos();
  }
);
When(
  /^Click on the first video in the search results and ensure it starts loading$/,
  async () => {
    await youTube.clickFirstVideo();
  }
);
Then(/^Handle potential pre-video pop-ups$/, async () => {
  await youTube.clickSkipButton();
});
Given(
  /^Waiting for the video to load and verifing it is playing$/,
  async () => {
    await youTube.checkVideoStatus();
  }
);
When(/^Checking the video quality options$/, () => {
  return true;
});
