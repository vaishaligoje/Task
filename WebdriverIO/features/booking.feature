Feature: Booking.com Website Test

  Scenario: Search and filter hotels on Booking.com
    Given I open the Booking.com website
    And I handle any pop-ups
    Then I should see the correct page title and URL
    When I search for hotels
    And I apply filters to the search results
    Then I should see the filtered results matching the criteria
