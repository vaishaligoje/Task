Feature: Testim Application

  Scenario: Validate Header Components
    Given I open the Testim website
    Then all header elements should be present

  Scenario: Navigate to the Company Section
    When I click on the Company menu item
    Then I should see subsections like About Us, Careers, Customers, Testim Partners

  Scenario: Navigate to the Customers Section and Review
    When I navigate to the Customers section
    And I identify a specific review

  Scenario: Validate Footer Components
    When I scroll to the footer
    Then I should see footer components like social media links, newsletter subscription, copyright text, and privacy policy links
