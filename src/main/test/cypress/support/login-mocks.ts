import { ACCESS_TOKEN } from '../../../config/constants'
import * as Http from '../support/http-mocks'

export const mockInvalidCredentialsError = (): void =>
  Http.mockUnauthorizedError('/auth')

export const mockUnexpectedError = (): void =>
  Http.mockServerError('/auth', 'POST')

export const mockCreated = (): void =>
  Http.mockCreated('/auth', 'POST', {
    data: {
      accessToken: ACCESS_TOKEN
    }
  })
