# Demoblaze Automation Testing Project

This project contains automated end-to-end tests for the Demoblaze e-commerce application using Cypress with JavaScript. The tests cover login functionality, category validation, complete purchase flows, and various negative test scenarios.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Test Cases](#test-cases)
- [Running Tests](#running-tests)
- [Reports](#reports)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)

### Installing Node.js

#### Option 1: Using Homebrew (macOS)
```bash
brew install node
```

#### Option 2: Download from Official Website
1. Visit [https://nodejs.org/](https://nodejs.org/)
2. Download the LTS (Long Term Support) version
3. Follow the installation instructions for your operating system

## Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd demoblaze-automation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Verify Cypress installation**
   ```bash
   npx cypress verify
   ```

## Project Structure

```
demoblaze-automation/
├── cypress/
│   ├── e2e/                    # Test files
│   │   ├── login.cy.js         # Login tests
│   │   ├── categories.cy.js   # Category validation tests
│   │   ├── purchase-flow.cy.js # Purchase flow tests
│   │   ├── negative-tests.cy.js # Negative test cases
│   │   └── dynamic-validation.cy.js # Dynamic validation tests
│   ├── support/               # Support files
│   │   ├── commands.js        # Custom commands
│   │   └── e2e.js            # Support configuration
│   ├── fixtures/             # Test data
│   ├── screenshots/          # Screenshots on failure
│   └── videos/               # Test execution videos
├── allure-results/           # Allure test results
├── allure-report/           # Generated Allure reports
├── cypress.config.js          # Cypress configuration
├── package.json             # Project dependencies
└── README.md               # This file
```

## Test Cases

### 1. Login Tests (`login.cy.js`)
- ✅ Valid login with correct credentials (admin/admin)
- ✅ Invalid login with wrong username
- ✅ Invalid login with wrong password
- ✅ Logout functionality

### 2. Category Validation Tests (`categories.cy.js`)
- ✅ Verify all categories exist (Phones, Laptops, Monitors)
- ✅ Validate products in Phones category
- ✅ Validate products in Laptops category
- ✅ Validate products in Monitors category
- ✅ Navigation between categories
- ✅ Product detail page functionality

### 3. Purchase Flow Tests (`purchase-flow.cy.js`)
- ✅ Complete purchase with single product
- ✅ Complete purchase with multiple products
- ✅ Purchase products from different categories

### 4. Negative Test Cases (`negative-tests.cy.js`)
- ✅ Attempt checkout with empty cart
- ✅ Invalid login credentials
- ✅ Empty purchase form fields
- ✅ Special characters in form fields

### 5. Dynamic Validation Tests (`dynamic-validation.cy.js`)
- ✅ Cart updates when products are added
- ✅ Product removal from cart
- ✅ Multiple product operations
- ✅ Cart state persistence across navigation
- ✅ Cart operations after login

## Running Tests

### Open Cypress Test Runner (Interactive Mode)
```bash
npm run cypress:open
```
This opens the Cypress Test Runner where you can:
- Select individual tests to run
- Watch tests execute in real-time
- Debug tests interactively

### Run All Tests (Headless Mode)
```bash
npm run cypress:run
```

### Run Tests with Browser Visible
```bash
npm run test:headed
```

### Run Specific Test Files
```bash
# Run only login tests
npx cypress run --spec "cypress/e2e/login.cy.js"

# Run only category tests
npx cypress run --spec "cypress/e2e/categories.cy.js"
```

## Reports

### Allure Reports

This project is configured to generate Allure reports for detailed test results.

#### Generate Allure Report
```bash
npm run allure:generate
```

#### Open Allure Report
```bash
npm run allure:open
```

#### Serve Allure Report (Alternative)
```bash
npm run allure:serve
```

### Cypress Reports

Cypress automatically generates:
- **Screenshots**: Saved in `cypress/screenshots/` when tests fail
- **Videos**: Saved in `cypress/videos/` for all test runs
- **Console Logs**: Available in the test runner and reports

## Configuration

### Cypress Configuration (`cypress.config.js`)

Key configuration options:
- **Base URL**: `https://www.demoblaze.com`
- **Viewport**: 1280x720
- **Timeouts**: 10s for commands, 30s for page load
- **Video Recording**: Enabled
- **Screenshots**: Enabled on failure
- **Allure Integration**: Configured

### Environment Variables

You can set environment variables in `cypress.config.js` or create a `.env` file:

```javascript
// Example environment variables
env: {
  allure: true,
  allureReuseAfterSpec: true,
  baseUrl: 'https://www.demoblaze.com'
}
```

## Troubleshooting

### Common Issues

#### 1. Node.js Not Found
```bash
# Error: command not found: npm
```
**Solution**: Install Node.js from [nodejs.org](https://nodejs.org/)

#### 2. Cypress Installation Issues
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### 3. Allure Report Not Generating
```bash
# Install Allure commandline tool
npm install -g allure-commandline

# Or use npx
npx allure-commandline generate allure-results --clean -o allure-report
```

#### 4. Tests Failing Due to Timeouts
- Increase timeout values in `cypress.config.js`
- Check network connectivity
- Verify the application is accessible

#### 5. Element Not Found Errors
- Verify selectors in test files
- Check if the application structure has changed
- Use Cypress Test Runner to debug element selection

### Debug Mode

Run tests in debug mode:
```bash
npx cypress run --headed --no-exit
```

### Browser Selection

Run tests in specific browsers:
```bash
# Chrome (default)
npx cypress run --browser chrome

# Firefox
npx cypress run --browser firefox

# Edge
npx cypress run --browser edge
```

## Best Practices

### 1. Simple and Clean Code
- Tests are organized in separate files by functionality
- Each test file focuses on a specific feature
- Clear and descriptive test names
- Minimal complexity for easy maintenance

### 2. Data Management
- Test data is defined within test files
- Sensitive data should use environment variables
- Reusable data can be moved to fixtures

### 3. Error Handling
- Tests handle alerts and popups gracefully
- Proper assertions for success and failure scenarios
- Screenshots and videos for debugging

## Contributing

1. Follow the existing code structure
2. Add new tests to appropriate files
3. Update this README when adding new features
4. Test your changes before submitting

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review Cypress documentation: [https://docs.cypress.io](https://docs.cypress.io)
3. Check Allure documentation: [https://docs.qameta.io/allure](https://docs.qameta.io/allure)

## License

This project is licensed under the MIT License.