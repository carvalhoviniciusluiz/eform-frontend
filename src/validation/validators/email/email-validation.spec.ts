import { InvalidaFieldError } from '@/validation/errors'
import { EmailValidation } from '@/validation/validators/email'

describe('EmailValidation', () => {
  test('should return error if email is invalid', () => {
    const sut = new EmailValidation('email')
    const error = sut.validate('')
    expect(error).toEqual(new InvalidaFieldError())
  })
})