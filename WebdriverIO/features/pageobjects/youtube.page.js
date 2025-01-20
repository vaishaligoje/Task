const { $, browser, expect } = require("@wdio/globals");
const helper = require("../../utils/helper");
const data = require("../data/youtubeData.json");
require("dotenv").config();
class YouTube {
  get searchBar() {
    return $("//input[@role='combobox']");
  }
  get seachButton() {
    return $(".ytSearchboxComponentSearchButton");
  }
  get resultvideos() {
    return $$("//h3[@title]");
  }
  get firstVideo() {
    return $("//img[contains(@class,'yt-core-image')][1]");
  }
  get skipButton() {
    return $(".ytp-skip-ad-button");
  }
  get playButton() {
    return $(
      "//div[@class='ytp-left-controls']//button[@data-title-no-tooltip='Play']"
    );
  }
  get RunningVideo() {
    return $("//video[@class='video-stream html5-main-video'][1]");
  }
  get settingsButton() {
    return $("//button[@class='ytp-button ytp-settings-button']");
  }
  async openYoutube() {
    await helper.allureStep("Open YouTube homepage", async () => {
      await browser.url(process.env.youtubeBaseURL);
    });
  }
  async checkTitle() {
    await helper.allureStep("Check YouTube page title", async () => {
      const title = await browser.getTitle();
      expect(title).toEqual(data.title);
    });
  }
  async checkURL() {
    await helper.allureStep("Check YouTube URL", async () => {
      const browserURL = await browser.getUrl();
      expect(browserURL).toEqual(process.env.youtubeBaseURL);
    });
  }
  async clickSearchBar() {
    await helper.allureStep("Click on the search bar", async () => {
      await this.searchBar.click();
    });
  }
  async searchvideo() {
    await helper.allureStep("Search for 'Selenium tutorial'", async () => {
      await this.searchBar.setValue(data.searchContent);
      await this.seachButton.click();
      await browser.pause(process.env.smallTimeout);
    });
  }
  async verifyVideos() {
    await helper.allureStep("Verify that videos are displayed", async () => {
      const countVideos = await this.resultvideos.length;
      expect(countVideos).toBeGreaterThan(data.videosCount);
    });
  }
  async clickFirstVideo() {
    await helper.allureStep(
      "Click on the first video in the search results",
      async () => {
        await this.firstVideo.scrollIntoView();
        await this.firstVideo.click();
        await browser.pause(process.env.smallTimeout);
      }
    );
  }
  async clickSkipButton() {
    await helper.allureStep(
      "Click the 'Skip' button if the ad appears",
      async () => {
        await this.skipButton.waitForDisplayed();
        await this.skipButton.click();
      }
    );
  }
  async checkVideoStatus() {
    await helper.allureStep("Check if the video is playing", async () => {
      await this.RunningVideo.click();
      await this.playButton.waitForExist();
      expect(await this.playButton.isDisplayed()).toBe(true);
    });
  }
  async clickSettingsButton() {
    await helper.allureStep(
      "Click the settings button in the video player",
      async () => {
        await this.settingsButton.click();
      }
    );
  }
}
module.exports = new YouTube();
