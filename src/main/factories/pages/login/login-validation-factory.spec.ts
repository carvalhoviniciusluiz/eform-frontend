import { ValidationBuilder, ValidationComposite } from '@/validation/validators'
import { makeLoginValidation } from '@/main/factories/pages/login'

describe('LoginValidationFactory', () => {
  test('should make ValidationComposite with correct validation', () => {
    const composite = makeLoginValidation()
    expect(composite).toEqual(
      ValidationComposite.build([
        ...ValidationBuilder.field('credential').required().email().build(),
        ...ValidationBuilder.field('password').required().min(5).build()
      ])
    )
  })
})
