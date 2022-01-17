import * as faker from 'faker'
import { AccountModel } from '@/domain'

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
  accessTokenExpiresIn: faker.datatype.number(),
  refreshToken: faker.datatype.uuid(),
  refreshTokenExpiresIn: faker.datatype.number(),
  currentUser: {
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    avatar: faker.internet.avatar()
  }
})
