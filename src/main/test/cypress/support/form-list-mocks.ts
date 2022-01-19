import * as Http from '../support/http-mocks'

export const mockUnexpectedError = (): void =>
  Http.mockServerError('/forms', 'GET')

export const mockAccessDiniedError = (): void =>
  Http.mockForbiddenError('/forms', 'GET')
