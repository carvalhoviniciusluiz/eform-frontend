import { UserModel } from '../../../../domain/models'
import { LOCAL_STORAGE_KEY } from '../../../config/constants'
import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const path = '/forms'
const mockUnexpectedError = (): void => Http.mockServerError(path, 'GET')
const mockAccessDiniedError = (): void => Http.mockForbiddenError(path, 'GET')

describe('FormList', () => {
  beforeEach(() => {
    cy.fixture('account').then((account) => {
      Helper.setLocalStorageItem(LOCAL_STORAGE_KEY, account)
    })
  })

  it('should present error on UnexpectedError', () => {
    mockUnexpectedError()
    cy.visit('')
    cy.getByTestId('error').should(
      'contain.text',
      'Something went wrong. Please try again soon'
    )
  })

  it('should logout on AccessDiniedError', () => {
    mockAccessDiniedError()
    cy.visit('')
    Helper.testUrl('/login')
  })

  it('should present correct username', () => {
    mockUnexpectedError()
    cy.visit('')
    const { currentUser } = Helper.getLocalStorageItem(LOCAL_STORAGE_KEY) as {
      currentUser: UserModel
    }
    const username = `${currentUser.firstName} ${currentUser.lastName}`
    cy.getByTestId('username').should('contain.text', username)
  })

  // it('should logout on logout link click', () => {
  //   mockAccessDiniedError()
  //   cy.visit('')
  //   cy.getByTestId('logout').click()
  //   Helper.testUrl('/login')
  // })
})
