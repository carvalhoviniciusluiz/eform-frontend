import { InvalidaFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

export class EmailValidation implements FieldValidation {
  fieldName: string
  constructor(private readonly field: string) {}

  validate(value: string): Error {
    return new InvalidaFieldError()
  }
}
