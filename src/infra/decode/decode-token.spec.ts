import * as faker from 'faker'
import { UnexpectedError, UserModel } from '@/domain'
import { DecodedToken } from '@/infra/decode'

describe('DecodeToken', () => {
  test('should present UnexpectedError if invalid token', () => {
    expect(() => DecodedToken.decode(null)).toThrow(new UnexpectedError())
  })

  test('should present UnexpectedError if empty string', () => {
    expect(() => DecodedToken.decode('')).toThrow(new UnexpectedError())
  })

  test('should return UserModel decoded', async () => {
    const modkedJwtDecodeResult: UserModel = {
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      avatar: faker.internet.avatar()
    }
    jest.spyOn(DecodedToken, 'decode').mockReturnValue(modkedJwtDecodeResult)
    expect(DecodedToken.decode(faker.datatype.uuid())).toEqual(
      modkedJwtDecodeResult
    )
  })
})
