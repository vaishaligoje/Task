require("dotenv").config();
const data = require("../data/bookingData.json");
const { expect } = require("@playwright/test");
const helper = require("../utils/helper");
const { allure } = require("allure-playwright");
exports.Booking = class Booking {
  constructor(page) {
    this.page = page;
    this.searchLocation = page.locator("//input[@role='combobox']");
    this.locationOption = page.locator("//ul[@role='group']");
    this.searchButton = page.locator("//button[@type='submit']");
    this.popUp = page.locator("//button[@aria-label='Dismiss sign-in info.']");
    this.checkResort = page.locator("(//div[text()='Resorts'])[1]");
    this.checkHotel = page.locator("(//div[text()='Royal Orchid Hotels'])[1]");
    this.checkVilla = page.locator("(//div[text()='Villas'])[1]");
    this.facility = page.locator("(//div[text()='Sea view'])[1]");
    this.filterResult = page.locator(
      "//div[@data-testid='property-card-container']//div[contains(text(),'Resort')]"
    );
    this.filterdHotels = page.locator("//div[@aria-label='Property']");
    this.result = page.locator("//h1[@aria-live='assertive']");
    this.selectedAccommodation = page.locator(
      "(//div[@data-testid='title'])[1]"
    );
    this.footer = page.locator("//div[@id='booking-footer']");
    this.checkIn = page.locator(
      "//button[contains(@data-testid,'field-start')]//span"
    );
    this.checkOut = page.locator(
      "//button[contains(@data-testid,'field-end')]//span"
    );
    this.getCheckInDate = (date) =>
      page.locator(`//span[@aria-label='${date}']`);
    this.getCheckOutDate = (formattedDate) =>
      page.locator(`//span[@aria-label='${formattedDate}']`);
  }
  async navigate() {
    await helper.allureStep("Navigate to the homepage", async () => {
      await this.page.goto(process.env.bookingBaseURL);
    });
  }
  async verifyTitle() {
    await helper.allureStep("Verify page title", async () => {
      const title = await this.page.title();
      expect(title).toContain(data.title);
    });
  }
  async verifyURL() {
    await helper.allureStep("Verify current URL", async () => {
      const URL = await this.page.url();
      expect(URL).toBe(process.env.bookingBaseURL);
    });
  }
  async searchHotel() {
    await helper.allureStep("Search hotel location", async () => {
      await this.searchLocation.click();
      await this.searchLocation.fill(data.location);
    });
    await helper.allureStep("Select check-in date", async () => {
      await this.checkIn.click();
      let formattedCurrentDate = helper.getCurrentDate();
      const currentDate = await this.getCheckInDate(formattedCurrentDate);
      await currentDate.click();
    });
    await helper.allureStep("Select check-out date", async () => {
      let formattedCheckOutDate = helper.getCheckoutDate();
      const checkOutDate = await this.getCheckOutDate(formattedCheckOutDate);
      await checkOutDate.click();
    });
    await helper.allureStep("Click search button", async () => {
      await this.searchButton.click();
      await this.page.waitForTimeout(parseInt(process.env.smallTimeout));
    });
  }
  async clearPopUp() {
    await helper.allureStep("Clear pop-up if visible", async () => {
      if (await this.popUp.isVisible()) {
        await this.popUp.click();
      }
    });
  }
  async applyFilters() {
    await helper.allureStep("Apply filters for hotel search", async () => {
      await this.facility.click();
      await this.page.waitForTimeout(parseInt(process.env.largeTimeout));
    });
  }
  async countFilteredResults() {
    await helper.allureStep("Count the filtered results", async () => {
      await this.footer.scrollIntoViewIfNeeded();
      const countResult = await this.filterdHotels.count();
      helper.logToFile(`count of resulted hotels :- ${countResult}`)
      const resultText = await this.result.innerText();
      helper.logToFile(`Resulted Text :- ${countResult}`)
      expect(resultText).toContain(`${countResult}`);
    });
  }
  async verifyAccommodation() {
    await helper.allureStep("Verify selected accommodation", async () => {
      const displayedHotelName = await this.selectedAccommodation.innerText();
      expect(displayedHotelName).toBe(data.hotelName);
    });
  }
};
