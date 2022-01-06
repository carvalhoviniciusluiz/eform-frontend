import {
  ValidationBuilder as Builder,
  ValidationComposite
} from '@/validation/validators'

export const makeSignUpValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...Builder.field('firstName').required().min(2).build(),
    ...Builder.field('lastName').required().min(2).build(),
    ...Builder.field('documentNumber').required().build(),
    ...Builder.field('email').required().email().build(),
    ...Builder.field('phone').required().build(),
    ...Builder.field('password').required().min(5).build(),
    ...Builder.field('passwordConfirmation')
      .required()
      .sameAs('password')
      .build()
  ])
}
