import * as faker from 'faker'
import { AuthenticationParams, GrantType } from '@/domain/usecases'

export const mockAuthentication = (): AuthenticationParams => ({
  grantType: GrantType.PASSWORD_GRANT,
  credential: faker.internet.email(),
  password: faker.internet.password()
})
