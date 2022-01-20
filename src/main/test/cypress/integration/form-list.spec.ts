import { UserModel } from '../../../../domain/models'
import { LOCAL_STORAGE_KEY } from '../../../config/constants'
import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const path = '/forms'
const mockUnexpectedError = (): void => Http.mockServerError(path, 'GET')
const mockAccessDiniedError = (): void => Http.mockForbiddenError(path, 'GET')
const mockSuccess = (): void => {
  cy.fixture('form-list').then((data) => {
    Http.mockOk(path, 'GET', {
      data
    })
  })
}

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

  it('should relod on button click', () => {
    mockUnexpectedError()
    cy.visit('')
    cy.getByTestId('error').should(
      'contain.text',
      'Something went wrong. Please try again soon'
    )
    mockSuccess()
    cy.getByTestId('reload').click()
    cy.get('tbody').children().should('have.length', 2)
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

  it('should present form items', () => {
    mockSuccess()
    cy.visit('')
    cy.get('tbody > tr > td > svg').should('have.attr', 'role', 'img')
    cy.get('tbody').children().should('have.length', 2)
    cy.get('tr:nth-child(1)').then((tr) => {
      assert.equal(
        tr.find('[data-testid="item-created-at"]').text(),
        '2021-12-11T17:44:15.212Z'
      )
      assert.equal(tr.find('[data-testid="item-name"]').text(), 'Form1')
      assert.equal(tr.find('[data-testid="item-status"]').text(), 'Reviewed')
      assert.equal(tr.find('[data-testid="image-group"]').children().length, 3)
      assert.equal(
        tr.find('[data-testid="item-updated-at"]').text(),
        '2022-01-15T14:08:25.600Z'
      )
    })
    cy.get('tr:nth-child(2)').then((tr) => {
      assert.equal(
        tr.find('[data-testid="item-created-at"]').text(),
        '2021-12-11T17:44:15.212Z'
      )
      assert.equal(tr.find('[data-testid="item-name"]').text(), 'Form2')
      assert.equal(tr.find('[data-testid="item-status"]').text(), 'Reviewed')
      assert.equal(tr.find('[data-testid="image-group"]').children().length, 4)
      assert.equal(
        tr.find('[data-testid="item-updated-at"]').text(),
        '2022-01-15T14:08:25.600Z'
      )
    })
  })
})
