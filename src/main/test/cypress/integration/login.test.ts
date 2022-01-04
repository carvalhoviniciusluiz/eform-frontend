import * as faker from 'faker'

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('should load with correct initial state', () => {
    cy.getByTestId('credential').should('have.attr', 'readOnly')
    cy.getByTestId('credential-status')
      .should('have.attr', 'title', 'Required field')
      .should('have.class', 'error')
    cy.getByTestId('password').should('have.attr', 'readOnly')
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Required field')
      .should('have.class', 'error')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('main-error').should('not.exist')
  })

  it('should present error state if form is invalid', () => {
    cy.getByTestId('credential').focus().type(faker.random.word())
    cy.getByTestId('credential-status')
      .should('have.attr', 'title', 'Invalid field')
      .should('have.class', 'error')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Invalid field')
      .should('have.class', 'error')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('main-error').should('not.exist')
  })
})
