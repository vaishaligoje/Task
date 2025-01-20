Feature: Search and view product on Target

  Scenario: Search for a product and view details
    Given I navigate to the Target website
    When I search for a product
    Then I should see the correct result page

  Scenario: Select a specific watch and view price and discount
    When I select a specific watch
    Then I should see the correct price and discount information for the watch
