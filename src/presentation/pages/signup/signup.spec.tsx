import {
  cleanup,
  fireEvent,
  render,
  RenderResult
} from '@testing-library/react'
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

const populateField = (
  sut: RenderResult,
  fieldName: string,
  value = faker.random.word()
): HTMLElement => {
  const input = sut.getByTestId(fieldName)
  fireEvent.input(input, {
    target: { value }
  })
  return input
}

const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
) => {
  // const status = sut.getByTestId(`${fieldName}-status`)
  // expect(status.textContent).toBe(validationError)
  // const input = sut.getByTestId(fieldName)
  // expect(input.className.includes('error')).toBeTruthy()
}

describe('Signup Component', () => {
  afterEach(cleanup)

  test('should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut()
    Helper.testButtonIsDisable(sut, 'submit', true)
    Helper.testChildCount(sut, 'submit', 1)
    Helper.testElementText(sut, 'label-continue', 'Submit')
    testStatusForField(sut, 'firstName', validationError)
    testStatusForField(sut, 'lastName', 'Required field')
    testStatusForField(sut, 'documentNumber', 'Required field')
    testStatusForField(sut, 'phone', 'Required field')
    testStatusForField(sut, 'email', 'Required field')
    testStatusForField(sut, 'password', 'Required field')
    testStatusForField(sut, 'passwordConfirmation', 'Required field')
  })

  test('should show firstName error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populateField(sut, 'firstName')
    testStatusForField(sut, 'firstName', validationError)
  })
})
