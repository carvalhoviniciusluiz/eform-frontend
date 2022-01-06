const baseUrl: string = Cypress.config().baseUrl

export const testInputStatus = (
  field: string,
  error?: string,
  isContent = false
): void => {
  const attr = `${error ? '' : 'not.'}have.attr`

  cy.getByTestId(`${field}-status`).should(
    'have.class',
    error ? (isContent ? 'textField__error' : 'error') : 'check'
  )
  isContent
    ? cy.getByTestId(`${field}-status`).should('contain.text', error)
    : cy.getByTestId(`${field}-status`).should(attr, 'title', error)
}

export const testMainError = (error: string): void => {
  cy.getByTestId('spinner').should('not.exist')
  cy.getByTestId('main-error').should('contain.text', error)
}

export const testHttpCallsCount = (count: number): void => {
  cy.get('@request.all').should('have.length', count)
}

export const testUrl = (path: string) => {
  cy.url().should('eq', `${baseUrl}${path}`)
}

export const testLocalStorageItem = (key: string): void => {
  cy.window().then((window) => assert.isOk(window.localStorage.getItem(key)))
}
