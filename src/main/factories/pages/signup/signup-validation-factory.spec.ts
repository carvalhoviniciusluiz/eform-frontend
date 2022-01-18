import {
  CompareFieldsValidation,
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
  ValidationComposite
} from '@/validation/validators'
import { makeSignUpValidation } from '@/main/factories/pages'

describe('SignUpValidationFactory', () => {
  test('should make ValidationComposite with correct validation', () => {
    const composite = makeSignUpValidation()
    expect(composite).toEqual(
      ValidationComposite.build([
        new RequiredFieldValidation('firstName'),
        new MinLengthValidation('firstName', 2),
        new RequiredFieldValidation('lastName'),
        new MinLengthValidation('lastName', 2),
        new RequiredFieldValidation('documentNumber'),
        new RequiredFieldValidation('email'),
        new EmailValidation('email'),
        new RequiredFieldValidation('phone'),
        new RequiredFieldValidation('password'),
        new MinLengthValidation('password', 5),
        new RequiredFieldValidation('passwordConfirmation'),
        new CompareFieldsValidation('passwordConfirmation', 'password')
      ])
    )
  })
})
