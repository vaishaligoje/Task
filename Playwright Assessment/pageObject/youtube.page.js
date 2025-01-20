require("dotenv").config();
const data = require("../data/youtubeData.json");
const { expect } = require("@playwright/test");
const helper = require("../utils/helper");
exports.YouTube = class YouTube {
  constructor(page) {
    this.page = page;
    this.searchBar = page.locator("//input[@role='combobox']");
    this.searchButton = page.locator(".ytSearchboxComponentSearchButton");
    this.resultvideos = page.locator("//h3[@title]");
    this.firstVideo = page.locator(
      "(//div[@class='yt-thumbnail-view-model__image']//img[contains(@class,'yt-core-image')])[2]"
    );
    this.skipButton = page.locator(".ytp-skip-ad-button");
    this.playButton = page.locator(
      "//div[@class='ytp-left-controls']//button[@data-title-no-tooltip='Play']"
    );
    this.pauseButton = page.locator(
      "//div[@class='ytp-left-controls']//button[@data-title-no-tooltip='Pause']"
    );
    this.settingsButton = page.locator(
      "//button[@class='ytp-button ytp-settings-button']"
    );
    this.quality = page.locator("//div[text()='Quality']");
    this.video = page.locator("//video");
  }
  async launchURL() {
    await helper.allureStep("Launch YouTube URL", async () => {
      await this.page.goto(process.env.youtubeBaseURL);
    });
  }
  async verifyTitle() {
    await helper.allureStep(
      "Verify page title contains expected title",
      async () => {
        const title = await this.page.title();
        expect(title).toContain(data.title);
      }
    );
  }
  async verifyURL() {
    await helper.allureStep("Verify page URL is correct", async () => {
      const URL = await this.page.url();
      expect(URL).toBe(process.env.youtubeBaseURL);
    });
  }
  async clickSearchBar() {
    await helper.allureStep(
      "Click search bar and enter search content",
      async () => {
        await this.searchBar.click();
        await this.searchBar.fill(data.SearchContent);
        await this.searchButton.click();
      }
    );
  }
  async verifyResultedVideos() {
    await helper.allureStep(
      "Verify the number of resulted videos",
      async () => {
        await this.page.waitForTimeout(parseInt(process.env.largeTimeout));
        const countResultVideos = await this.resultvideos.count();
        helper.logToFile(`count of resulted videos :- ${countResultVideos}`);
        expect(countResultVideos).toBeGreaterThan(data.videosCount);
      }
    );
  }
  async clickFirstVideo() {
    await helper.allureStep(
      "Click on the first video in the search results",
      async () => {
        await this.firstVideo.click();
        await this.page.waitForTimeout(parseInt(process.env.largeTimeout));
      }
    );
  }
  async clickSkipButton() {
    await helper.allureStep("Skip ad if present", async () => {
      if (this.skipButton.isVisible()) {
        await this.page.waitForSelector(data.videoSelector, {
          timeout: parseInt(process.env.smallTimeout),
        });
        await this.skipButton.click();
      }
    });
  }
};
