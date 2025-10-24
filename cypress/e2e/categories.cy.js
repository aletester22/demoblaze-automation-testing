describe('Category Validation Tests', () => {
  beforeEach(() => {
    cy.visit('https://www.demoblaze.com')
  })

  it('should display all required categories', () => {
    // Verify that all three categories exist
    cy.contains('Phones').should('be.visible')
    cy.contains('Laptops').should('be.visible')
    cy.contains('Monitors').should('be.visible')
  })

  it('should display products in Phones category', () => {
    // Click on Phones category
    cy.contains('Phones').click()
    
    // Verify products are displayed
    cy.get('.card').should('have.length.greaterThan', 0)
    
    // Verify specific products exist
    cy.contains('Samsung galaxy s6').should('be.visible')
    cy.contains('Nokia lumia 1520').should('be.visible')
    cy.contains('Nexus 6').should('be.visible')
  })

  it('should display products in Laptops category', () => {
    // Click on Laptops category
    cy.contains('Laptops').click()
    
    // Verify products are displayed
    cy.get('.card').should('have.length.greaterThan', 0)
    
    // Verify specific products exist
    cy.contains('Sony vaio i5').should('be.visible')
    cy.contains('Sony vaio i7').should('be.visible')
  })

  it('should display products in Monitors category', () => {
    // Click on Monitors category
    cy.contains('Monitors').click()
    
    // Verify products are displayed
    cy.get('.card').should('have.length.greaterThan', 0)
    
    // Verify specific products exist
    cy.contains('Apple monitor 24').should('be.visible')
    cy.contains('ASUS Full HD').should('be.visible')
  })

  it('should navigate between categories', () => {
    // Navigate to Phones
    cy.contains('Phones').click()
    cy.contains('Samsung galaxy s6').should('be.visible')
    
    // Navigate to Laptops
    cy.contains('Laptops').click()
    cy.contains('Sony vaio i5').should('be.visible')
    
    // Navigate to Monitors
    cy.contains('Monitors').click()
    cy.contains('Apple monitor 24').should('be.visible')
  })

  it('should display product details when clicking on a product', () => {
    // Click on Samsung galaxy s6
    cy.contains('a', 'Samsung galaxy s6').first().click()
    
    // Verify product details are displayed
    cy.url().should('include', 'prod.html')
    cy.contains('Samsung galaxy s6').should('be.visible')
    cy.contains('$360').should('be.visible')
    cy.contains('Add to cart').should('be.visible')
  })
})