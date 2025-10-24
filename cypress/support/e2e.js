// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Import Allure plugin
import '@shelex/cypress-allure-plugin'

// Global configuration
Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent Cypress from failing the test on uncaught exceptions
  return false
})
