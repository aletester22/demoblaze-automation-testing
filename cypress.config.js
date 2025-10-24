const { defineConfig } = require('cypress');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
    baseUrl: 'https://www.demoblaze.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    video: true,
    screenshotOnRunFailure: true,
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.js',
    fixturesFolder: 'cypress/fixtures',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    downloadsFolder: 'cypress/downloads'
  },
  env: {
    allure: true,
    allureReuseAfterSpec: true
  }
});
