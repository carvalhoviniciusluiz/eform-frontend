import * as Helper from '../support/helpers'

describe('Private Routes', () => {
  it('should logout if form-list has no token', () => {
    cy.visit('')
    Helper.testUrl('/login')
  })
})
