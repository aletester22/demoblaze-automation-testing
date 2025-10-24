describe('Complete Purchase Flow Tests', () => {
  beforeEach(() => {
    cy.visit('https://www.demoblaze.com')
  })

  it('should complete a full purchase successfully', () => {
    // Click on Samsung galaxy s6
    cy.contains('a', 'Samsung galaxy s6').first().click()
    cy.url().should('include', 'prod.html')
    
    // Add product to cart
    cy.contains('Add to cart').click()
    
    // Handle alert
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Product added.')
    })
    
    // Go to cart
    cy.get('#cartur').click()
    
    // Verify product is in cart
    cy.get('#tbodyid').should('contain', 'Samsung galaxy s6')
    
    // Click Place Order
    cy.contains('Place Order').click()
    
    // Fill purchase form
    cy.get('#name').type('John Doe')
    cy.get('#country').type('United States')
    cy.get('#city').type('New York')
    cy.get('#card').type('1234567812345678')
    cy.get('#month').type('12')
    cy.get('#year').type('2025')
    
    // Complete purchase
    cy.get('button[onclick="purchaseOrder()"]').click()
    
    // Verify purchase success
    cy.contains('Thank you for your purchase!').should('be.visible')
  })

  it('should add multiple products to cart and complete purchase', () => {
    // Add first product
    cy.contains('a', 'Samsung galaxy s6').first().click()
    cy.url().should('include', 'prod.html')
    cy.contains('Add to cart').click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Product added.')
    })
    
    // Go back and add second product
    cy.visit('https://www.demoblaze.com')
    cy.contains('a', 'Nokia lumia 1520').first().click()
    cy.url().should('include', 'prod.html')
    cy.contains('Add to cart').click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Product added.')
    })
    
    // Go to cart
    cy.get('#cartur').click()
    
    // Verify both products are in cart
    cy.get('#tbodyid').should('contain', 'Samsung galaxy s6')
    cy.get('#tbodyid').should('contain', 'Nokia lumia 1520')
    
    // Complete purchase
    cy.contains('Place Order').click()
    cy.get('#name').type('Jane Smith')
    cy.get('#country').type('Canada')
    cy.get('#city').type('Toronto')
    cy.get('#card').type('9876543210987654')
    cy.get('#month').type('06')
    cy.get('#year').type('2026')
    cy.get('button[onclick="purchaseOrder()"]').click()
    
    // Verify purchase success
    cy.contains('Thank you for your purchase!').should('be.visible')
  })

  it('should add product from different categories to cart', () => {
    // Add phone product
    cy.contains('a', 'Samsung galaxy s6').first().click()
    cy.url().should('include', 'prod.html')
    cy.contains('Add to cart').click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Product added.')
    })
    
    // Add laptop product
    cy.visit('https://www.demoblaze.com')
    cy.contains('Laptops').click()
    cy.contains('a', 'Sony vaio i5').first().click()
    cy.url().should('include', 'prod.html')
    cy.contains('Add to cart').click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Product added.')
    })
    
    // Go to cart and verify both products
    cy.get('#cartur').click()
    cy.get('#tbodyid').should('contain', 'Samsung galaxy s6')
    cy.get('#tbodyid').should('contain', 'Sony vaio i5')
    
    // Complete purchase
    cy.contains('Place Order').click()
    cy.get('#name').type('Mike Johnson')
    cy.get('#country').type('United Kingdom')
    cy.get('#city').type('London')
    cy.get('#card').type('1111222233334444')
    cy.get('#month').type('03')
    cy.get('#year').type('2027')
    cy.get('button[onclick="purchaseOrder()"]').click()
    
    // Verify purchase success
    cy.contains('Thank you for your purchase!').should('be.visible')
  })
})