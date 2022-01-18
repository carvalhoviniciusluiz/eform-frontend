import * as faker from 'faker'
import * as Http from '../support/http-mocks'

export const mockEmailInUseError = (): void =>
  Http.mockForbiddenError('/auth', 'POST')

export const mockUnexpectedError = (): void =>
  Http.mockServerError('/auth', 'POST')

export const mockCreated = (): void =>
  Http.mockCreated('/auth', 'POST', {
    data: {
      accessToken: faker.datatype.uuid(),
      accessTokenExpiresIn: 19,
      refreshToken: faker.datatype.uuid(),
      refreshTokenExpiresIn: 84,
      tokenType: 'bearer'
    }
  })
