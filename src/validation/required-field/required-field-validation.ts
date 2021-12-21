import { RequiredFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

export class RequiredFieldValidation implements FieldValidation {
  fieldName: string
  constructor(private readonly field: string) {}

  validate(value: string): Error {
    return value ? null : new RequiredFieldError()
  }
}
