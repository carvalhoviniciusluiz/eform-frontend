import {
  ValidationBuilder as Builder,
  ValidationComposite
} from '@/validation/validators'
import { makeSignUpValidation } from '@/main/factories/pages'

describe('SignupValidationFactory', () => {
  test('should make ValidationComposite with correct validation', () => {
    const composite = makeSignUpValidation()
    expect(composite).toEqual(
      ValidationComposite.build([
        ...Builder.field('firstName').min(2).required().build(),
        ...Builder.field('lastName').min(2).required().build(),
        ...Builder.field('documentNumber').required().build(),
        ...Builder.field('email').required().email().build(),
        ...Builder.field('phone').required().build(),
        ...Builder.field('password').required().min(5).build()
      ])
    )
  })
})
