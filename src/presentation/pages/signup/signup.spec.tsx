import { cleanup, render, RenderResult } from '@testing-library/react'
import * as faker from 'faker'
import { Signup } from '@/presentation/pages'
import { Helper, ValidationStub } from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const sut = render(<Signup validation={validationStub} />)
  return {
    sut
  }
}

describe('Signup Component', () => {
  afterEach(cleanup)

  test('should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.testButtonIsDisable(sut, 'submit', true)
    Helper.testChildCount(sut, 'submit', 1)
    Helper.testElementText(sut, 'label-continue', 'Submit')
    Helper.testStatusForField(sut, 'firstName', validationError)
    Helper.testStatusForField(sut, 'lastName', validationError)
    Helper.testStatusForField(sut, 'documentNumber', validationError)
    Helper.testStatusForField(sut, 'phone', validationError)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
    Helper.testStatusForField(sut, 'passwordConfirmation', 'Required field')
  })

  test('should show firstName error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'firstName')
    Helper.testStatusForField(sut, 'firstName', validationError)
  })

  test('should show lastName error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'lastName')
    Helper.testStatusForField(sut, 'lastName', validationError)
  })

  test('should show documentNumber error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'documentNumber')
    Helper.testStatusForField(sut, 'documentNumber', validationError)
  })

  test('should show phone error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'phone')
    Helper.testStatusForField(sut, 'phone', validationError)
  })

  test('should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email', validationError)
  })

  test('should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password', validationError)
  })
})
