export {}

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId: (value: string) => Chainable<Element>
    }
  }
}
