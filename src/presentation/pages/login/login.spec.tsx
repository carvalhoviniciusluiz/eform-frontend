import {
  render,
  RenderResult,
  screen,
  fireEvent,
  cleanup
} from '@testing-library/react'
import * as faker from 'faker'
import { Login } from '@/presentation/pages'
import { ValidationStub } from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = faker.random.words()
  const sut = render(<Login validation={validationStub} />)
  return {
    sut,
    validationStub
  }
}

describe('Login component', () => {
  afterEach(cleanup)

  test('should start with initial state', () => {
    const { sut, validationStub } = makeSut()
    expect(screen.queryByTestId('email-wrap')).toBeNull()
    expect(screen.queryByTestId('password-wrap')).toBeNull()
    const submit = sut.getByTestId('submit') as HTMLButtonElement
    expect(submit.childElementCount).toBe(1)
    expect(submit.disabled).toBe(true)
    const emailInput = sut.getByTestId('email')
    expect(emailInput.className.includes('error')).toBeTruthy()
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.textContent).toBe(validationStub.errorMessage)
    const passwordInput = sut.getByTestId('password')
    expect(passwordInput.className.includes('error')).toBeTruthy()
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.textContent).toBe(validationStub.errorMessage)
  })

  test('should show email error if Validation fails', () => {
    const { sut, validationStub } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.textContent).toBe(validationStub.errorMessage)
  })

  test('should show password error if Validation fails', () => {
    const { sut, validationStub } = makeSut()
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.textContent).toBe(validationStub.errorMessage)
  })
})
