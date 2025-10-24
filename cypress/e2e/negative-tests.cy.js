describe('Negative Test Cases', () => {
  beforeEach(() => {
    cy.visit('https://www.demoblaze.com')
  })

  it('should not allow checkout without products in cart', () => {
    // Go directly to cart without adding any products
    cy.get('#cartur').click()
    
    // Verify cart is empty - no table rows should exist
    cy.get('#tbodyid tr').should('not.exist')
  })

  it('should handle invalid login credentials gracefully', () => {
    // Click login button
    cy.get('#login2').click()
    
    // Fill with invalid credentials
    cy.get('#loginusername').type('nonexistentuser123')
    cy.get('#loginpassword').type('wrongpassword456')
    
    // Click login button
    cy.get('button[onclick="logIn()"]').click()
    
    // Handle alert
    cy.on('window:alert', (str) => {
      expect(str).to.equal('User does not exist.')
    })
    
    // Verify user is not logged in
    cy.get('#login2').should('be.visible')
  })

  it('should not allow purchase with empty form fields', () => {
    // Add a product to cart first
    cy.contains('a', 'Samsung galaxy s6').first().click()
    cy.url().should('include', 'prod.html')
    cy.contains('Add to cart').click()
    
    // Handle alert
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Product added.')
    })
    
    // Go to cart and try to place order
    cy.get('#cartur').click()
    cy.contains('Place Order').click()
    
    // Try to complete purchase without filling form
    cy.get('button[onclick="purchaseOrder()"]').click()
    
    // Verify that purchase doesn't complete
    // The form should still be visible
    cy.get('#name').should('be.visible')
    cy.get('#country').should('be.visible')
  })

  it('should handle special characters in form fields', () => {
    // Add product to cart
    cy.contains('a', 'Samsung galaxy s6').first().click()
    cy.url().should('include', 'prod.html')
    cy.contains('Add to cart').click()
    
    // Handle alert
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Product added.')
    })
    
    // Go to cart and place order
    cy.get('#cartur').click()
    cy.contains('Place Order').click()
    
    // Fill form with special characters
    cy.get('#name').type('José María')
    cy.get('#country').type('España')
    cy.get('#city').type('Madrid')
    cy.get('#card').type('1234567812345678')
    cy.get('#month').type('12')
    cy.get('#year').type('2025')
    
    // Try to complete purchase
    cy.get('button[onclick="purchaseOrder()"]').click()
    
    // Verify that purchase completes successfully
    // This tests the application's handling of special characters
    cy.contains('Thank you for your purchase!').should('be.visible')
  })
})