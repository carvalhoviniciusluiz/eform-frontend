import * as faker from 'faker'
import * as jwtDecode from 'jwt-decode'
import { UnexpectedError, UserModel } from '@/domain'
import { DecodeToken } from '@/infra/decode'

describe('DecodeToken', () => {
  test('should present UnexpectedError if invalid token', () => {
    const decodeToken = new DecodeToken()
    expect(() => decodeToken.decode(null)).toThrow(new UnexpectedError())
  })

  test('should present UnexpectedError if empty string', () => {
    const decodeToken = new DecodeToken()
    expect(() => decodeToken.decode('')).toThrow(new UnexpectedError())
  })

  test('should return UserModel decoded', async () => {
    const decodeToken = new DecodeToken()
    const modkedJwtDecodeResult: UserModel = {
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      avatar: faker.internet.avatar()
    }
    jest.spyOn(decodeToken, 'decode').mockReturnValue(modkedJwtDecodeResult)
    expect(decodeToken.decode(faker.datatype.uuid())).toEqual(
      modkedJwtDecodeResult
    )
  })

  test('should return UserModel decoded', async () => {
    const returnValue = {
      email: faker.internet.email(),
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      avatar: faker.internet.avatar()
    }
    jest.spyOn(jwtDecode, 'default').mockReturnValue(returnValue)

    const decodeToken = new DecodeToken()
    const token = faker.datatype.uuid()
    const result = decodeToken.decode(token)

    expect(jwtDecode.default).toBeCalledWith(token)
    expect(result).toEqual({
      email: returnValue.email,
      firstName: returnValue.firstname,
      lastName: returnValue.lastname,
      avatar: returnValue.avatar
    })
  })
})
