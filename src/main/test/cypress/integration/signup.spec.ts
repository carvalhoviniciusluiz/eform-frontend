import * as faker from 'faker'
import * as FormHelper from '../utils/form-helpers'
import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const path = '/auth'
const mockEmailInUseError = (): void => Http.mockForbiddenError(path, 'POST')
const mockUnexpectedError = (): void => Http.mockServerError(path, 'POST')
const mockSuccess = (): void =>
  Http.mockCreated(path, 'POST', {
    data: {
      accessToken: faker.datatype.uuid()
    }
  })

const populateFields = (): void => {
  const password = faker.random.alphaNumeric(8)
  cy.getByTestId('firstName').focus().type(faker.name.firstName())
  cy.getByTestId('lastName').focus().type(faker.name.lastName())
  cy.getByTestId('documentNumber').focus().type(faker.random.alphaNumeric(11))
  cy.getByTestId('phone').focus().type(faker.random.alphaNumeric(10))
  cy.getByTestId('email').focus().type(faker.internet.email())
  cy.getByTestId('password').focus().type(password)
  cy.getByTestId('passwordConfirmation').focus().type(password)
}

const sumulateValidSubmit = (): void => {
  populateFields()
  cy.getByTestId('submit').click()
}

describe('Signup', () => {
  beforeEach(() => {
    cy.visit('signup')
  })

  it('should load with correct initial state', () => {
    cy.getByTestId('firstName').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('firstName', 'Required field')
    cy.getByTestId('lastName').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('lastName', 'Required field')
    cy.getByTestId('documentNumber').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('documentNumber', 'Required field')
    cy.getByTestId('phone').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('phone', 'Required field')
    cy.getByTestId('email').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('email', 'Required field')
    cy.getByTestId('password').should('have.attr', 'readOnly')
    FormHelper.testInputStatusContent('password', 'Required field')
    cy.getByTestId('passwordConfirmation').should('have.attr', 'readOnly')
    FormHelper.testInputStatusContent('passwordConfirmation', 'Required field')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('main-error').should('not.exist')
  })

  it('should present error state if form is invalid', () => {
    cy.getByTestId('firstName').focus().type(faker.random.alphaNumeric(1))
    FormHelper.testInputStatus('firstName', 'Invalid field')
    cy.getByTestId('lastName').focus().type(faker.random.alphaNumeric(1))
    FormHelper.testInputStatus('lastName', 'Invalid field')
    // cy.getByTestId('documentNumber').focus().type(faker.random.word())
    // FormHelper.testInputStatus('documentNumber', 'Invalid field')
    // cy.getByTestId('phone').focus().type(faker.random.word())
    // FormHelper.testInputStatus('phone', 'Invalid field')
    cy.getByTestId('email').focus().type(faker.random.word())
    FormHelper.testInputStatus('email', 'Invalid field')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    FormHelper.testInputStatusContent('password', 'Invalid field')
    cy.getByTestId('passwordConfirmation')
      .focus()
      .type(faker.random.alphaNumeric(4))
    FormHelper.testInputStatusContent('passwordConfirmation', 'Invalid field')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('main-error').should('not.exist')
  })

  it('should present valid state if form is valid', () => {
    const password = faker.random.alphaNumeric(8)

    cy.getByTestId('firstName').focus().type(faker.name.firstName())
    FormHelper.testInputStatus('firstName')
    cy.getByTestId('lastName').focus().type(faker.name.lastName())
    FormHelper.testInputStatus('lastName')
    cy.getByTestId('documentNumber').focus().type(faker.random.word())
    FormHelper.testInputStatus('documentNumber')
    cy.getByTestId('phone').focus().type(faker.random.word())
    FormHelper.testInputStatus('phone')
    cy.getByTestId('email').focus().type(faker.internet.email())
    FormHelper.testInputStatus('email')
    cy.getByTestId('password').focus().type(password)
    FormHelper.testInputStatusContent('password')
    cy.getByTestId('passwordConfirmation').focus().type(password)
    FormHelper.testInputStatusContent('passwordConfirmation')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('main-error').should('not.exist')
  })

  it('should present InvalidCredentialsError on 403', () => {
    mockEmailInUseError()
    sumulateValidSubmit()
    cy.getByTestId('main-error').should('exist')
    FormHelper.testMainError('this is the email already in use')
    Helper.testUrl('/signup')
  })

  it('should present UnexpectedError if invalid data is returned', () => {
    mockUnexpectedError()
    sumulateValidSubmit()
    FormHelper.testMainError('Something went wrong. Please try again soon')
    Helper.testUrl('/signup')
  })

  it('should present credentials is valid', () => {
    mockSuccess()
    sumulateValidSubmit()
    cy.getByTestId('main-error').should('not.exist')
    cy.getByTestId('spinner').should('not.exist')
    Helper.testUrl('/login')
  })

  it('should prevent multilple submit', () => {
    mockSuccess()
    populateFields()
    cy.getByTestId('submit').dblclick()
    Helper.testHttpCallsCount(1)
  })

  it('should not call submit if form is invalid', () => {
    mockSuccess()
    cy.getByTestId('firstName')
      .focus()
      .type(faker.name.firstName())
      .type('{enter}')
    Helper.testHttpCallsCount(0)
  })
})
