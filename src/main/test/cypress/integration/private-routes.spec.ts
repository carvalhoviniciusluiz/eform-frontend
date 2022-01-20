import * as Helper from '../utils/helpers'

describe('Private Routes', () => {
  it('should logout if form-list has no token', () => {
    cy.visit('')
    Helper.testUrl('/login')
  })
})
