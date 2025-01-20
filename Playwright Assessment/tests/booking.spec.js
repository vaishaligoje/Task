const { test, expect } = require("@playwright/test");
const { Booking } = require("../pageObject/booking.page");
test("booking test cases", async ({ page }) => {
  let bookingInstance = new Booking(page);
  await bookingInstance.navigate();
  await bookingInstance.clearPopUp();
  await bookingInstance.verifyTitle();
  await bookingInstance.verifyURL();
  await bookingInstance.searchHotel();
  await bookingInstance.applyFilters();
  await bookingInstance.countFilteredResults();
});
