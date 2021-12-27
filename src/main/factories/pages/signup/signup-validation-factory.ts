import {
  ValidationBuilder as Builder,
  ValidationComposite
} from '@/validation/validators'

export const makeSignUpValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...Builder.field('firstName').min(2).required().build(),
    ...Builder.field('lastName').min(2).required().build(),
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
