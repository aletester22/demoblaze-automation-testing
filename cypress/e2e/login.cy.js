describe('Login Tests', () => {
  beforeEach(() => {
    cy.visit('https://www.demoblaze.com')
    // Clear any existing session
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.reload()
  })

  it('should login successfully with valid credentials', () => {
    // Click login button
    cy.get('#login2').should('be.visible').click()
    
    // Fill login form
    cy.get('#loginusername').should('be.visible').type('admin')
    cy.get('#loginpassword').should('be.visible').type('admin')
    
    // Click login button
    cy.get('button[onclick="logIn()"]').should('be.visible').click()
    
    // Verify login success - check that logout button exists
    cy.get('#logout2').should('exist')
  })

  it('should fail login with invalid username', () => {
    // Click login button
    cy.get('#login2').should('be.visible').click()
    
    // Fill login form with invalid credentials
    cy.get('#loginusername').should('be.visible').type('invaliduser')
    cy.get('#loginpassword').should('be.visible').type('admin')
    
    // Click login button
    cy.get('button[onclick="logIn()"]').should('be.visible').click()
    
    // Handle alert
    cy.on('window:alert', (str) => {
      expect(str).to.equal('User does not exist.')
    })
    
    // Verify login button is still visible
    cy.get('#login2').should('be.visible')
  })

  it('should fail login with invalid password', () => {
    // Click login button
    cy.get('#login2').should('be.visible').click()
    
    // Fill login form with invalid password
    cy.get('#loginusername').should('be.visible').type('admin')
    cy.get('#loginpassword').should('be.visible').type('wrongpassword')
    
    // Click login button
    cy.get('button[onclick="logIn()"]').should('be.visible').click()
    
    // Handle alert
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Wrong password.')
    })
    
    // Verify login failure - check that login button is still visible
    cy.get('#login2').should('be.visible')
    cy.get('#logout2').should('not.be.visible')
  })

  it('should logout successfully', () => {
    // First login
    cy.get('#login2').should('be.visible').click()
    cy.get('#loginusername').should('be.visible').type('admin')
    cy.get('#loginpassword').should('be.visible').type('admin')
    cy.get('button[onclick="logIn()"]').should('be.visible').click()
    
    // Verify login success
    cy.get('#logout2').should('exist')
    
    // Then logout
    cy.get('#logout2').click({ force: true })
    
    // Verify user is logged out - check that login button is visible
    cy.get('#login2').should('be.visible')
  })
})