import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
  ValidationComposite
} from '@/validation/validators'
import { makeLoginValidation } from '@/main/factories/pages/login'

describe('LoginValidationFactory', () => {
  test('should make ValidationComposite with correct validation', () => {
    const composite = makeLoginValidation()
    expect(composite).toEqual(
      ValidationComposite.build([
        new RequiredFieldValidation('credential'),
        new EmailValidation('credential'),
        new RequiredFieldValidation('password'),
        new MinLengthValidation('password', 5)
      ])
    )
  })
})
