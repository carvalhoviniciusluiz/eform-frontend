import { ValidationBuilder as sut } from '@/validation/validators/builder'
import { RequiredFieldValidation } from '@/validation/validators/required-field'

describe('ValidationBuilder', () => {
  test('should return RequiredFieldValidation', () => {
    const validations = sut.field('any_field').required().build()
    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })
})
