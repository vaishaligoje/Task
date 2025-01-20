const { test, expect } = require("@playwright/test");
const { YouTube } = require("../pageObject/youtube.page");
test("youtube test cases", async ({ page }) => {
  let youTubeInstance = new YouTube(page);
  await youTubeInstance.launchURL();
  await youTubeInstance.verifyTitle();
  await youTubeInstance.verifyURL();
  await youTubeInstance.clickSearchBar();
  await youTubeInstance.verifyResultedVideos();
  await youTubeInstance.clickFirstVideo();
  await youTubeInstance.clickSkipButton();
});
