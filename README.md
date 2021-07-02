# Epicodus | Independent Project 06 | Currency Exchanger

[![Coverage Status](https://coveralls.io/repos/github/AlyxMoon/epicodus-project06-currency-exchanger/badge.svg?branch=main)](https://coveralls.io/github/AlyxMoon/epicodus-project06-currency-exchanger?branch=main)

##### Table of Contents
1. [Description](#description)
2. [Setting Up The Project](#setting-up-the-project)
   - [Setting Up for Local Development](#setting-up-for-local-development)
   - [Get an ExchangeRate API Key](#get-an-exchangerate-api-key)
4. [Objectives](#objectives)
   - [Further Exploration Objectives](#further-exploration-objectives)

## Description

This is my sixth independent project for the Epicodus bootcamp program. The goal is create an application which allows a user to enter an amount in currency and convert that to the equivalent amount in a different currency. An external API will be used in order to determine the conversion rate.

- **Author**: Allister Moon Kays
- **Live Website Link**: [https://alyxmoon.github.io/epicodus-project06-currency-exchanger/](https://alyxmoon.github.io/epicodus-project06-currency-exchanger/)
- **Coverage Report**: [https://alyxmoon.github.io/epicodus-project06-currency-exchanger/lcov-report](https://alyxmoon.github.io/epicodus-project06-currency-exchanger/lcov-report)
- **Copyright**: MIT License

## Setting Up The Project

If you would only like to view the website in action, go to the link here:

[https://alyxmoon.github.io/epicodus-project06-currency-exchanger/](https://alyxmoon.github.io/epicodus-project06-currency-exchanger/)

#### Setting Up for Local Development
1. Download the files or clone the repository to your computer.
2. Open the project folder in your code editor of choice.
3. Install all required dependencies with `npm install`.
4. Follow [Get an ExchangeRate API Key](#get-an-exchangerate-api-key) to get an api key for your own use.
5. Run `npm run build` to generate files, and open the `dist/index.html` file to see the page.
6. Optionally, run `npm run serve` to start a dev server and see the files that way.

#### Get an ExchangeRate API Key 
1. Go to the [ExchangeRate Website](https://www.exchangerate-api.com/).
2. Follow their prompts to get a free API key.
3. Copy the `.env.example` file in the project and create a file called `.env`
4. Replace `your_api_key_here` with the API key provided by ExchangeRate.

## Objectives
- Does the application correctly make an API call?
- Does the application correctly parse data from the API response?
- Does the application handle errors when the API call doesn't return a 200 OK status as well as return a message if the API returns no results?
- Did you follow all setup instructions, including storing your API key and adding instructions for setup in your README?
- Does the app separate logic into different JavaScript files and use a static method?
- Does the application correctly use webpack?
- Code and Git documentation follow best practices (setup instructions in README, .gitignore file excluding unnecessary content from repo, detailed well-formatted commit messages, etc.)
- Does the project demonstrate concepts covered this week? If prompted, are you able to discuss the flow of your code and the concepts behind it with an instructor using correct terminology?
- Is the app in a presentable, portfolio-quality state?
- Is required functionality in place by the deadline?

### Further Exploration Objectives
- Allow users to convert currency between all available currency types.
- Allow users to convert currency both to and from U.S. dollars.
- Cache the API's results - so you only need to make the call once as long as a user is on the site. Try using session storage for this. If exchange rates are successfully being stored in session storage, an API call shouldn't be made. Instead, the rates can be grabbed directly from session storage.
- Use a dropdown menu for currencies.

##### game plan

- focus everything on USD, convert to/from that
- pull API once on page load for conversion rates, then don't use it.
- show time last updated / when will update next
- save api call in local storage for even less API usage
- check stored api call vs next update to see if update required