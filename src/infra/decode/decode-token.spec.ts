import { UnexpectedError, UserModel } from '@/domain'
import { DecodedToken } from '@/infra/decode'

type SutTypes = {
  sut: Promise<UserModel>
}

const makeSut = (token: string): SutTypes => {
  const sut = DecodedToken.decode(token)
  return {
    sut
  }
}

describe('DecodeToken', () => {
  test('should present UnexpectedError if invalid token', async () => {
    const { sut } = makeSut(undefined)
    await expect(sut).rejects.toThrow(new UnexpectedError())
  })

  test('should present UnexpectedError if empty string', async () => {
    const { sut } = makeSut('')
    await expect(sut).rejects.toThrow(new UnexpectedError())
  })
})
