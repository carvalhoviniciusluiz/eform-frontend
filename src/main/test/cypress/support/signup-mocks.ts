import * as Helper from '../support/http-mocks'

export const mockEmailInUseError = (): void =>
  Helper.mockEmailInUseError('/auth')

export const mockUnexpectedError = (): void =>
  Helper.mockUnexpectedError('/auth', 'POST')
