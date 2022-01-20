export const testInputStatus = (field: string, error?: string): void => {
  const attr = `${error ? '' : 'not.'}have.attr`
  cy.getByTestId(`${field}-status`).should(
    'have.class',
    error ? 'error' : 'check'
  )
  cy.getByTestId(`${field}-status`).should(attr, 'title', error)
}

export const testInputStatusContent = (field: string, error?: string): void => {
  const attr = `${error ? '' : 'not.'}contain.text`
  cy.getByTestId(`${field}-status`).should(attr, error)
}

export const testMainError = (error: string): void => {
  cy.getByTestId('spinner').should('not.exist')
  cy.getByTestId('main-error').should('contain.text', error)
}
