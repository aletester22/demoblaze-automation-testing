describe('Dynamic Validation Tests', () => {
  beforeEach(() => {
    cy.visit('https://www.demoblaze.com')
    // Clear any existing session
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.reload()
  })

  it('should update cart when product is added', () => {
    // Click on Samsung galaxy s6
    cy.contains('a', 'Samsung galaxy s6').first().should('be.visible').click()
    
    // Wait for product page to load
    cy.url().should('include', 'prod.html')
    
    // Add product to cart
    cy.contains('Add to cart').should('be.visible').click()
    
    // Handle alert
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Product added.')
    })
    
    // Go to cart and verify product is there
    cy.get('#cartur').should('be.visible').click()
    cy.get('#tbodyid').should('contain', 'Samsung galaxy s6')
    
    // Verify cart is not empty
    cy.get('#tbodyid tr').should('have.length.greaterThan', 0)
  })

  it('should remove product from cart when delete is clicked', () => {
    // Add product to cart
    cy.contains('a', 'Samsung galaxy s6').first().should('be.visible').click()
    cy.url().should('include', 'prod.html')
    cy.contains('Add to cart').should('be.visible').click()
    
    // Handle alert
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Product added.')
    })
    
    // Go to cart
    cy.get('#cartur').should('be.visible').click()
    
    // Verify product is in cart
    cy.get('#tbodyid').should('contain', 'Samsung galaxy s6')
    
    // Delete the product
    cy.contains('Delete').first().should('be.visible').click()
    
    // Verify cart is empty - wait for deletion to complete
    cy.get('#tbodyid tr').should('not.exist')
  })

  it('should handle multiple product additions and removals', () => {
    // Add first product
    cy.contains('a', 'Samsung galaxy s6').first().should('be.visible').click()
    cy.url().should('include', 'prod.html')
    cy.contains('Add to cart').should('be.visible').click()
    
    // Handle alert
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Product added.')
    })
    
    // Go back to home
    cy.visit('https://www.demoblaze.com')
    
    // Add second product
    cy.contains('a', 'Nokia lumia 1520').first().should('be.visible').click()
    cy.url().should('include', 'prod.html')
    cy.contains('Add to cart').should('be.visible').click()
    
    // Handle alert
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Product added.')
    })
    
    // Go to cart
    cy.get('#cartur').should('be.visible').click()
    
    // Verify at least one product is in cart
    cy.get('#tbodyid').should('contain', 'Nokia lumia 1520')
    
    // Delete first product
    cy.get('#tbodyid tr').first().find('a').contains('Delete').should('be.visible').click()
    
    // Verify only one product remains - wait for deletion to complete
    cy.get('#tbodyid tr').should('have.length', 1)
  })

  it('should maintain cart state across page navigation', () => {
    // Add product to cart
    cy.contains('a', 'Samsung galaxy s6').first().should('be.visible').click()
    cy.url().should('include', 'prod.html')
    cy.contains('Add to cart').should('be.visible').click()
    
    // Handle alert
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Product added.')
    })
    
    // Navigate to home and then to different category
    cy.visit('https://www.demoblaze.com')
    cy.contains('Laptops').should('be.visible').click()
    
    // Go to cart
    cy.get('#cartur').should('be.visible').click()
    
    // Verify product is still in cart
    cy.get('#tbodyid').should('contain', 'Samsung galaxy s6')
  })

  it('should handle cart operations after login', () => {
    // Login first
    cy.get('#login2').should('be.visible').click()
    cy.get('#loginusername').should('be.visible').type('admin')
    cy.get('#loginpassword').should('be.visible').type('admin')
    cy.get('button[onclick="logIn()"]').should('be.visible').click()
    
    // Verify login success
    cy.get('#logout2').should('exist')
    
    // Close any open modal if present
    cy.get('body').then(($body) => {
      if ($body.find('#logInModal').is(':visible')) {
        cy.get('body').type('{esc}')
      }
    })
    
    // Add product to cart
    cy.contains('a', 'Samsung galaxy s6').first().should('be.visible').click()
    cy.url().should('include', 'prod.html')
    cy.contains('Add to cart').should('be.visible').click()
    
    // Handle alert
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Product added.')
    })
    
    // Go to cart
    cy.get('#cartur').should('be.visible').click()
    
    // Verify product is in cart
    cy.get('#tbodyid').should('contain', 'Samsung galaxy s6')
    
    // Complete purchase
    cy.contains('Place Order').should('be.visible').click()
    cy.get('#name').should('be.visible').type('Test User')
    cy.get('#country').should('be.visible').type('Test Country')
    cy.get('#city').should('be.visible').type('Test City')
    cy.get('#card').should('be.visible').type('1234567812345678')
    cy.get('#month').should('be.visible').type('12')
    cy.get('#year').should('be.visible').type('2025')
    cy.get('button[onclick="purchaseOrder()"]').should('be.visible').click()
    
    // Verify purchase success
    cy.contains('Thank you for your purchase!').should('be.visible')
  })
})