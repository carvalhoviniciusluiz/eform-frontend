import { ValidationBuilder, ValidationComposite } from '@/validation/validators'

export const makeLoginValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('credential').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build()
  ])
}
