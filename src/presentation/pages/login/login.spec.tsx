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
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const sut = render(<Login validation={validationStub} />)
  return {
    sut
  }
}

describe('Login component', () => {
  afterEach(cleanup)

  test('should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const submit = sut.getByTestId('submit') as HTMLButtonElement
    expect(submit.childElementCount).toBe(1)
    expect(submit.firstChild.textContent).toBe('Continue')
    expect(submit.disabled).toBe(true)
    const emailInput = sut.getByTestId('email')
    expect(emailInput.className.includes('error')).toBeTruthy()
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.textContent).toBe(validationError)
    const passwordInput = sut.getByTestId('password')
    expect(passwordInput.className.includes('error')).toBeTruthy()
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.textContent).toBe(validationError)
  })

  test('should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.textContent).toBe(validationError)
  })

  test('should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.textContent).toBe(validationError)
  })

  test('should show valid email state if Validation succeds', () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() }
    })
    expect(screen.queryByTestId('email-status')).toBeNull()
    expect(emailInput.className.includes('error')).toBeFalsy()
  })

  test('should show valid password state if Validation succeds', () => {
    const { sut } = makeSut()
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })
    expect(screen.queryByTestId('password-status')).toBeNull()
    expect(passwordInput.className.includes('error')).toBeFalsy()
  })

  test('should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() }
    })
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  test('should show spinner on submit', () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() }
    })
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    fireEvent.click(submitButton)
    expect(submitButton.disabled).toBe(false)
    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })
})
