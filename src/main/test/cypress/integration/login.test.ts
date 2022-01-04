describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('should load with correct initial state', () => {
    cy.getByTestId('credential-status')
      .should('have.attr', 'title', 'Required field')
      .should('have.class', 'error')
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Required field')
      .should('have.class', 'error')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('main-error').should('not.exist')
  })
})
