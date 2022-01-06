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
})
