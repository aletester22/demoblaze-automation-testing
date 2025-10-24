// Custom commands for Demoblaze testing

// Command to handle login
Cypress.Commands.add('login', (username, password) => {
  cy.get('#login2').click()
  cy.get('#loginusername').type(username)
  cy.get('#loginpassword').type(password)
  cy.get('button[onclick="logIn()"]').click()
})

// Command to handle logout
Cypress.Commands.add('logout', () => {
  cy.get('#logout2').click()
})

// Command to add product to cart
Cypress.Commands.add('addProductToCart', (productName) => {
  cy.contains(productName).click()
  cy.contains('Add to cart').click()
  cy.on('window:alert', (str) => {
    expect(str).to.equal('Product added.')
  })
})

// Command to go to cart
Cypress.Commands.add('goToCart', () => {
  cy.get('#cartur').click()
})

// Command to fill purchase form
Cypress.Commands.add('fillPurchaseForm', (customerData) => {
  cy.get('#name').type(customerData.name)
  cy.get('#country').type(customerData.country)
  cy.get('#city').type(customerData.city)
  cy.get('#card').type(customerData.card)
  cy.get('#month').type(customerData.month)
  cy.get('#year').type(customerData.year)
})

// Command to complete purchase
Cypress.Commands.add('completePurchase', () => {
  cy.get('button[onclick="purchaseOrder()"]').click()
})

// Command to navigate to category
Cypress.Commands.add('navigateToCategory', (categoryName) => {
  cy.contains(categoryName).click()
})