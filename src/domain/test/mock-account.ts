import * as faker from 'faker'
import { AuthenticationParams, GrantType, AccountModel } from '@/domain'

export const mockAuthentication = (): AuthenticationParams => ({
  grant_type: GrantType.PASSWORD_GRANT,
  credential: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
  accessTokenExpiresIn: faker.datatype.number(),
  refreshToken: faker.datatype.uuid(),
  refreshTokenExpiresIn: faker.datatype.number()
})
