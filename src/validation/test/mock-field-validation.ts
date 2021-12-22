import { FieldValidation } from '@/validation/protocols'

export class FieldValidationSpy implements FieldValidation {
  error: Error = null
  fieldName: string
  constructor(readonly field: string) {}

  validate(value: string): Error {
    return this.error
  }
}
