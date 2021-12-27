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
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
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

  test('should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })

  test('should show valid firstName state if Validation succeds', () => {
    const { sut } = makeSut()
    Helper.testElementNotExists(sut, 'firstName-status')
    Helper.testCssElement(sut, 'firstName', 'error', false)
  })

  test('should show valid lastName state if Validation succeds', () => {
    const { sut } = makeSut()
    Helper.testElementNotExists(sut, 'lastName-status')
    Helper.testCssElement(sut, 'lastName', 'error', false)
  })

  test('should show valid documentNumber state if Validation succeds', () => {
    const { sut } = makeSut()
    Helper.testElementNotExists(sut, 'documentNumber-status')
    Helper.testCssElement(sut, 'documentNumber', 'error', false)
  })

  test('should show valid phone state if Validation succeds', () => {
    const { sut } = makeSut()
    Helper.testElementNotExists(sut, 'phone-status')
    Helper.testCssElement(sut, 'phone', 'error', false)
  })

  test('should show valid email state if Validation succeds', () => {
    const { sut } = makeSut()
    Helper.testElementNotExists(sut, 'email-status')
    Helper.testCssElement(sut, 'email', 'error', false)
  })

  test('should show valid password state if Validation succeds', () => {
    const { sut } = makeSut()
    Helper.testElementNotExists(sut, 'password-status')
    Helper.testCssElement(sut, 'password', 'error', false)
  })

  test('should show valid passwordConfirmation state if Validation succeds', () => {
    const { sut } = makeSut()
    Helper.testElementNotExists(sut, 'passwordConfirmation-status')
    Helper.testCssElement(sut, 'passwordConfirmation', 'error', false)
  })
})
