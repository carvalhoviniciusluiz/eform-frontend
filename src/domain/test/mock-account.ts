import * as faker from 'faker'
import { AuthenticationParams, GrantType } from '@/domain/usecases'
import { AccountModel } from '../models'

export const mockAuthentication = (): AuthenticationParams => ({
  grantType: GrantType.PASSWORD_GRANT,
  credential: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.random.uuid(),
  accessTokenExpiresIn: faker.random.number(),
  refreshToken: faker.random.uuid(),
  refreshTokenExpiresIn: faker.random.number()
})
