const { Given, When, Then } = require("@wdio/cucumber-framework");
const bookingInstance = require("../pageobjects/booking.page");
Given(/^I open the Booking.com website$/, async () => {
  await bookingInstance.navigate();
});
When(/^I handle any pop-ups$/, async () => {
  await bookingInstance.clearPopUp();
});
Then(/^I should see the correct page title and URL$/, async () => {
  await bookingInstance.verifyTitle();
  await bookingInstance.verifyURL();
});
When(/^I search for hotels$/, async () => {
  await bookingInstance.searchHotel();
});
When(/^I apply filters to the search results$/, async () => {
  await bookingInstance.applyFilters();
});
Then(/^I should see the filtered results matching the criteria$/, async () => {
  await bookingInstance.countFilteredResults();
});
// When(/^I select a hotel from the search results$/, async() => {
// 	await bookingInstance.clickSelectedAccommodation()
// });
// Then(/^I should see the selected hotel name$/, async() => {
// 	await bookingInstance.verifyAccommodation()
// });
