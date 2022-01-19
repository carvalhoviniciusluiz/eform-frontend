import * as faker from 'faker'
import { LOCAL_STORAGE_KEY } from '../../../config/constants'
import * as Http from '../support/form-list-mocks'
import * as Helper from '../support/helpers'

describe('FormList', () => {
  beforeEach(() => {
    Helper.setLocalStorageItem(LOCAL_STORAGE_KEY, {
      accessToken: faker.datatype.uuid(),
      currentUser: {
        email: faker.internet.email(),
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        avatar: faker.internet.avatar()
      }
    })
  })

  it('should present error on UnexpectedError', () => {
    Http.mockUnexpectedError()
    cy.visit('')
    cy.getByTestId('error').should(
      'contain.text',
      'Something went wrong. Please try again soon'
    )
  })
})
