import * as faker from 'faker'
import * as Helper from '../support/http-mocks'

export const mockEmailInUseError = (): void =>
  Helper.mockEmailInUseError('/auth')

export const mockUnexpectedError = (): void =>
  Helper.mockUnexpectedError('/auth', 'POST')

export const mockInvalidData = (): void =>
  Helper.mockOK('/auth', 'POST', {
    data: {
      invalidProperty: faker.datatype.uuid()
    }
  })

export const mockOK = (): void =>
  Helper.mockOK('/auth', 'POST', {
    data: {
      accessToken: faker.datatype.uuid(),
      accessTokenExpiresIn: 19,
      refreshToken: faker.datatype.uuid(),
      refreshTokenExpiresIn: 84,
      tokenType: 'bearer'
    }
  })
