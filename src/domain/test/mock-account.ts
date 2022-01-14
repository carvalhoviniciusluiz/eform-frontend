import * as faker from 'faker'
import { AccountModel } from '@/domain'

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
  accessTokenExpiresIn: faker.datatype.number(),
  refreshToken: faker.datatype.uuid(),
  refreshTokenExpiresIn: faker.datatype.number()
})
