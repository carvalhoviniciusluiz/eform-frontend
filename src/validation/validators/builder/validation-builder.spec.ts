import { ValidationBuilder as sut } from '@/validation/validators/builder'
import { EmailValidation } from '@/validation/validators/email'
import { MinLengthValidation } from '@/validation/validators/min-length'
import { RequiredFieldValidation } from '@/validation/validators/required-field'

describe('ValidationBuilder', () => {
  test('should return RequiredFieldValidation', () => {
    const validations = sut.field('any_field').required().build()
    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })

  test('should return EmailValidation', () => {
    const validations = sut.field('any_field').email().build()
    expect(validations).toEqual([new EmailValidation('any_field')])
  })

  test('should return MinLengthValidation', () => {
    const validations = sut.field('any_field').min(5).build()
    expect(validations).toEqual([new MinLengthValidation('any_field', 5)])
  })
})
