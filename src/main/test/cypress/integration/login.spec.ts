import * as faker from 'faker'
import { LOCAL_STORAGE_KEY } from '../../../config/constants'
import * as FormHelper from '../support/form-helpers'
import * as Helper from '../support/helpers'
import * as Http from '../support/login-mocks'

const populateFields = (): void => {
  cy.getByTestId('credential').focus().type(faker.internet.email())
  cy.getByTestId('password').focus().type(faker.random.alphaNumeric(8))
}

const sumulateValidSubmit = (): void => {
  populateFields()
  cy.getByTestId('submit').click()
}

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('should load with correct initial state', () => {
    cy.getByTestId('credential').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('credential', 'Required field')
    cy.getByTestId('password').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('password', 'Required field')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('main-error').should('not.exist')
  })

  it('should present error state if form is invalid', () => {
    cy.getByTestId('credential').focus().type(faker.random.word())
    FormHelper.testInputStatus('credential', 'Invalid field')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    FormHelper.testInputStatus('password', 'Invalid field')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('main-error').should('not.exist')
  })

  it('should present valid state if form is valid', () => {
    cy.getByTestId('credential').focus().type(faker.internet.email())
    FormHelper.testInputStatus('credential')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    FormHelper.testInputStatus('password')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('main-error').should('not.exist')
  })

  it('should present UnexpectedError on default error cases', () => {
    Http.mockUnexpectedError()
    cy.getByTestId('credential').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').click()
    FormHelper.testMainError('Something went wrong. Please try again soon')
    Helper.testUrl('/login')
  })

  it('should present InvalidCredentialsError on 401', () => {
    Http.mockInvalidCredentialsError()
    sumulateValidSubmit()
    cy.getByTestId('main-error').should('exist')
    FormHelper.testMainError('Invalid credentials')
    Helper.testUrl('/login')
  })

  it('should present save accessToken if valid credentials are provided', () => {
    Http.mockCreated()
    sumulateValidSubmit()
    cy.getByTestId('main-error').should('not.exist')
    cy.getByTestId('spinner').should('not.exist')
    Helper.testUrl('/')
    Helper.testLocalStorageItem(LOCAL_STORAGE_KEY)
  })

  it('should prevent multilple submit', () => {
    Http.mockCreated()
    populateFields()
    cy.getByTestId('submit').dblclick()
    Helper.testHttpCallsCount(1)
  })

  it('should not call submit if form is invalid', () => {
    Http.mockCreated()
    cy.getByTestId('credential')
      .focus()
      .type(faker.internet.email())
      .type('{enter}')
    Helper.testHttpCallsCount(0)
  })
})
