import { UnexpectedError } from '@/domain'
import { DecodedToken } from '@/infra/decode'

describe('DecodeToken', () => {
  test('should present UnexpectedError if invalid token', async () => {
    const promise = DecodedToken.decode(undefined)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should present UnexpectedError if empty string', async () => {
    const promise = DecodedToken.decode('')
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
