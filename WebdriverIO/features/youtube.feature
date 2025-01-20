Feature: The youtube Website

  Scenario: As a user, I am on YouTube Homepage
    Given I am on the youtubePage
    When Ensure the page title contains “YouTube.”
    And Verify the URL

  Scenario: Search for a Video
    Given I am on the search bar
    When Enter a query and submit the search.
    Then Verify that the search results are loaded and ensure that at least 10 video results are present

  Scenario: Click on a Video from Results
    When Click on the first video in the search results and ensure it starts loading
    Then Handle potential pre-video pop-ups

  Scenario: Verifing Video Playback and Quality Options
    Given Waiting for the video to load and verifing it is playing
    When Checking the video quality options
