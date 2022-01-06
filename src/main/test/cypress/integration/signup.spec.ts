import * as faker from 'faker'
import * as FormHelper from '../support/form-helper'

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
    FormHelper.testInputStatus('password', 'Required field', true)
    cy.getByTestId('passwordConfirmation').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('passwordConfirmation', 'Required field', true)
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
    FormHelper.testInputStatus('password', 'Invalid field', true)
    cy.getByTestId('passwordConfirmation')
      .focus()
      .type(faker.random.alphaNumeric(4))
    FormHelper.testInputStatus('passwordConfirmation', 'Invalid field', true)
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('main-error').should('not.exist')
  })
})
