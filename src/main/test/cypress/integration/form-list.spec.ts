import * as faker from 'faker'
import { UserModel } from '../../../../domain/models'
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

  it('should logout on AccessDiniedError', () => {
    Http.mockAccessDiniedError()
    cy.visit('')
    Helper.testUrl('/login')
  })

  it('should present correct username', () => {
    Http.mockUnexpectedError()
    cy.visit('')
    const { currentUser } = Helper.getLocalStorageItem(LOCAL_STORAGE_KEY) as {
      currentUser: UserModel
    }
    const username = `${currentUser.firstName} ${currentUser.lastName}`
    cy.getByTestId('username').should('contain.text', username)
  })

  it('should logout on logout link click', () => {
    Http.mockAccessDiniedError()
    cy.visit('')
    cy.getByTestId('logout').click()
    Helper.testUrl('/login')
  })
})
