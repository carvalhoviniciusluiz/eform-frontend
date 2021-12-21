import { InvalidaFieldError } from '@/validation/errors'
import { EmailValidation } from '@/validation/validators/email'
import * as faker from 'faker'

describe('EmailValidation', () => {
  test('should return error if email is invalid', () => {
    const sut = new EmailValidation(faker.random.word())
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidaFieldError())
  })

  test('should rturn falsy if email is valid', () => {
    const sut = new EmailValidation(faker.internet.email())
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })
})
