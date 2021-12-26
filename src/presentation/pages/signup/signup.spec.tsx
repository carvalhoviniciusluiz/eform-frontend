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
    Helper.testStatusForField(sut, 'lastName', 'Required field')
    Helper.testStatusForField(sut, 'documentNumber', 'Required field')
    Helper.testStatusForField(sut, 'phone', 'Required field')
    Helper.testStatusForField(sut, 'email', 'Required field')
    Helper.testStatusForField(sut, 'password', 'Required field')
    Helper.testStatusForField(sut, 'passwordConfirmation', 'Required field')
  })

  test('should show firstName error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'firstName')
    Helper.testStatusForField(sut, 'firstName', validationError)
  })
})
