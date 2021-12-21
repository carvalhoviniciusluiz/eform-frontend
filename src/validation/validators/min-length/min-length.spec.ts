import { InvalidaFieldError } from '@/validation/errors'
import { MinLengthValidation } from '@/validation/validators/min-length'
import * as faker from 'faker'

const makeSut = (): MinLengthValidation =>
  new MinLengthValidation(faker.database.column(), 5)

describe('MinLengthValidation', () => {
  test('should return error if valud is invalid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.alphaNumeric(3))
    expect(error).toEqual(new InvalidaFieldError())
  })

  test('should return error if valud is invalid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.alphaNumeric(5))
    expect(error).toBeFalsy()
  })
})
