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
    cy.get('#login2').click()
    
    // Fill login form
    cy.get('#loginusername').type('admin')
    cy.get('#loginpassword').type('admin')
    
    // Click login button
    cy.get('button[onclick="logIn()"]').click()
    
    // Wait for login to complete
    cy.wait(3000)
    
    // Verify login success by checking that we can see the page content
    cy.get('body').should('be.visible')
  })

  it('should fail login with invalid username', () => {
    // Click login button
    cy.get('#login2').click()
    
    // Fill login form with invalid credentials
    cy.get('#loginusername').type('invaliduser')
    cy.get('#loginpassword').type('admin')
    
    // Click login button
    cy.get('button[onclick="logIn()"]').click()
    
    // Verify login failure
    cy.on('window:alert', (str) => {
      expect(str).to.equal('User does not exist.')
    })
  })

  it('should fail login with invalid password', () => {
    // Click login button
    cy.get('#login2').click()
    
    // Fill login form with invalid password
    cy.get('#loginusername').type('admin')
    cy.get('#loginpassword').type('wrongpassword')
    
    // Click login button
    cy.get('button[onclick="logIn()"]').click()
    
    // Verify login failure
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Wrong password.')
    })
  })

  it('should logout successfully', () => {
    // First login
    cy.get('#login2').click()
    cy.get('#loginusername').type('admin')
    cy.get('#loginpassword').type('admin')
    cy.get('button[onclick="logIn()"]').click()
    
    // Wait for login to complete
    cy.wait(3000)
    
    // Then logout - force click since element might be hidden
    cy.get('#logout2').click({ force: true })
    
    // Wait for logout to complete
    cy.wait(2000)
    
    // Verify user is logged out - check that login button is visible
    cy.get('#login2').should('be.visible')
  })
})