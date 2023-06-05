Feature: User login and interaction

Scenario: User 1 logs in to the Web Application and interacts with User 2
  Given User 1 is on the Web Application login page
  When User 1 logs in with credentials
  And User 1 requests a QR code to log in to the mobile app
  And User 1 installs and launches the mobile app, logs in to the mobile app using QR code, 
  username, and password, goes to the Contact tab and searches for User 2, sends message and reply to User 2
  And User 2 logs in to the Web Application
  Then User 2 should see the received message
