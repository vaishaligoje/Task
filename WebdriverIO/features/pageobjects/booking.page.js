const { $, browser } = require("@wdio/globals");
require("dotenv").config();
const data = require("../data/bookingData.json");
const helper = require("../../utils/helper");
const { expect } = require("chai");
class Booking {
  get searchLocation() {
    return $("//input[@role='combobox']");
  }
  get locationOption() {
    return $("//ul[@role='group']");
  }
  get searchButton() {
    return $("//button[@type='submit']");
  }
  get popUp() {
    return $("//button[@aria-label='Dismiss sign-in info.']");
  }
  get checkResort() {
    return $("(//div[text()='Resorts'])[1]");
  }
  get checkHotel() {
    return $("(//div[text()='Royal Orchid Hotels'])[1]");
  }
  get facility() {
    return $("(//div[text()='Sea view'])[1]");
  }
  get filterResult() {
    return $(
      "//div[@data-testid='property-card-container']//div[contains(text(),'Resort')]"
    );
  }
  get filterdHotels() {
    return $$("//div[@aria-label='Property']");
  }
  get result() {
    return $("//h1[@aria-live='assertive']");
  }
  get selectAccommodation() {
    return $("(//div[@data-testid='title'])[1]");
  }
  get selectedAccommodation() {
    return $("//h2[contains(@class,'pp-header__title')]");
  }
  get footer() {
    return $("//div[@id='booking-footer']");
  }
  get checkIn() {
    return $("//button[contains(@data-testid,'field-start')]//span");
  }
  get checkOut() {
    return $("//button[contains(@data-testid,'field-end')]//span");
  }
  getCheckInDate(date) {
    return $(`//span[@aria-label='${date}']`);
  }
  getCheckOutDate(formattedDate) {
    return $(`//span[@aria-label='${formattedDate}']`);
  }
  async navigate() {
    await helper.allureStep("Navigate to the homepage", async () => {
      await browser.url(process.env.bookingBaseURL);
    });
  }
  async clearPopUp() {
    await helper.allureStep("Clear the pop-up if visible", async () => {
      if (this.popUp.isDisplayed) await this.popUp.click();
    });
  }
  async verifyTitle() {
    await helper.allureStep(
      "Verify the page title contains expected value",
      async () => {
        const title = await browser.getTitle();
        expect(title).to.include(data.title);
      }
    );
  }
  async verifyURL() {
    await helper.allureStep("Verify the current page URL", async () => {
      const URL = await browser.getUrl();
      expect(URL).to.equal(process.env.bookingBaseURL);
    });
  }
  async searchHotel() {
    await helper.allureStep("Search for a hotel", async () => {
      await this.searchLocation.click();
      await this.searchLocation.setValue(data.location);
      await this.checkIn.click();
      let formattedCurrentDate = helper.getCurrentDate();
      let formattedCheckOutDate = helper.getCheckoutDate(data.addDays);
      const currentDate = this.getCheckInDate(formattedCurrentDate);
      await currentDate.click();
      const checkOutDate = this.getCheckOutDate(formattedCheckOutDate);
      await checkOutDate.click();
      await this.searchButton.click();
      await browser.pause(process.env.smallTimeout);
    });
  }
  async applyFilters() {
    await helper.allureStep("Apply filters for hotel search", async () => {
      await this.facility.scrollIntoView();
      await this.facility.click();
      await this.facility.waitForExist();
      await browser.pause(process.env.smallTimeout);
    });
  }
  async countFilteredResults() {
    await helper.allureStep("Count filtered results and verify", async () => {
      await this.footer.scrollIntoView();
      const countResult = await this.filterdHotels.length;
      const resultText = await this.result.getText();
      expect(resultText).to.include(`${countResult}`);
    });
  }
  async verifyAccommodation() {
    await helper.allureStep("Verify the displayed hotel name", async () => {
      const displayedHotelName = await this.selectAccommodation.getText();
      expect(displayedHotelName).to.equal(data.hotelName);
    });
  }
}
module.exports = new Booking();
