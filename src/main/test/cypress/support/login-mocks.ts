import * as faker from 'faker'
import * as Http from '../support/http-mocks'

export const mockInvalidCredentialsError = (): void =>
  Http.mockUnauthorizedError('/auth')

export const mockUnexpectedError = (): void =>
  Http.mockServerError('/auth', 'POST')

export const mockCreated = (): void =>
  Http.mockCreated('/auth', 'POST', {
    data: {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhcnZhbGhvLnZpbmljaXVzbHVpekBnbWFpbC5jb20iLCJmaXJzdG5hbWUiOiJWaW5pY2l1cyIsImxhc3RuYW1lIjoiQ2FydmFsaG8iLCJhdmF0YXIiOiJodHRwczovL2F2YXRhcnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvMjIwMDU2ODQ_dj00Iiwic3ViIjoiMTIzNDU2Nzg5MCIsImlhdCI6MTUxNjIzOTAyMn0.wHv2fMsqPu3aGLN8FuQh3BRTsbc2zIqZMiiAIN5wbHE',
      accessTokenExpiresIn: 19,
      refreshToken: faker.datatype.uuid(),
      refreshTokenExpiresIn: 84,
      tokenType: 'bearer'
    }
  })
