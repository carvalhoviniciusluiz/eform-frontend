import * as faker from 'faker'

const baseUrl: string = Cypress.config().baseUrl

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

  it('should present valid state if form is valid', () => {
    cy.getByTestId('credential').focus().type(faker.internet.email())
    cy.getByTestId('credential-status').should('have.class', 'check')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('password-status').should('have.class', 'check')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('main-error').should('not.exist')
  })

  it('should present error if invalid credentials are provided', () => {
    cy.getByTestId('credential').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit')
      .click()
      .getByTestId('spinner')
      .should('exist')
      .getByTestId('main-error')
      .should('not.exist')
      .getByTestId('spinner')
      .should('not.exist')
      .getByTestId('main-error')
      .should('exist')
      .should('contain.text', 'Something went wrong. Please try again soon')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(8))
    cy.getByTestId('submit')
      .click()
      .getByTestId('spinner')
      .should('exist')
      .getByTestId('main-error')
      .should('exist')
      .getByTestId('spinner')
      .should('not.exist')
      .getByTestId('main-error')
      .should('contain.text', 'Invalid credentials')
    cy.url().should('eq', baseUrl + '/login')
  })

  it('should present save accessToken if valid credentials are provided', () => {
    cy.getByTestId('credential').focus().type('carvalho.viniciusluiz@gmail.com')
    cy.getByTestId('password').focus().type('123Change@')
    cy.getByTestId('submit')
      .click()
      .getByTestId('spinner')
      .should('exist')
      .getByTestId('main-error')
      .should('not.exist')
      .getByTestId('spinner')
      .should('not.exist')
    cy.url().should('eq', baseUrl + '/')
    cy.window().then((window) =>
      assert.isOk(window.localStorage.getItem('@eform:account'))
    )
  })
})
