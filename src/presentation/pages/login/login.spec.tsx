import {
  render,
  RenderResult,
  screen,
  fireEvent,
  cleanup
} from '@testing-library/react'
import * as faker from 'faker'
import { Login } from '@/presentation/pages'
import { AuthenticationSpy, ValidationStub } from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Login validation={validationStub} authentication={authenticationSpy} />
  )
  return {
    sut,
    authenticationSpy
  }
}

const populateCredentialField = (
  sut: RenderResult,
  credential = faker.internet.email()
): HTMLElement => {
  const credentialInput = sut.getByTestId('credential')
  fireEvent.input(credentialInput, {
    target: { value: credential }
  })
  return credentialInput
}

const populatePasswordField = (
  sut: RenderResult,
  password = faker.internet.password()
): HTMLElement => {
  const passwordInput = sut.getByTestId('password')
  fireEvent.input(passwordInput, {
    target: { value: password }
  })
  return passwordInput
}

const simulateValidSubmit = (
  sut: RenderResult,
  credential = faker.internet.email(),
  password = faker.internet.password()
) => {
  populateCredentialField(sut, credential)
  populatePasswordField(sut, password)
  const submitButton = sut.getByTestId('submit') as HTMLButtonElement
  fireEvent.click(submitButton)
}

const simulateStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
) => {
  const credentialStatus = sut.getByTestId(`${fieldName}-status`)
  expect(credentialStatus.textContent).toBe(validationError)
  const credentialInput = sut.getByTestId(fieldName)
  expect(credentialInput.className.includes('error')).toBeTruthy()
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
    simulateStatusForField(sut, 'credential', validationError)
    simulateStatusForField(sut, 'password', validationError)
  })

  test('should show credential error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populateCredentialField(sut)
    simulateStatusForField(sut, 'credential', validationError)
  })

  test('should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populatePasswordField(sut)
    simulateStatusForField(sut, 'password', validationError)
  })

  test('should show valid credential state if Validation succeds', () => {
    const { sut } = makeSut()
    const credentialInput = populateCredentialField(sut)
    expect(screen.queryByTestId('credential-status')).toBeNull()
    expect(credentialInput.className.includes('error')).toBeFalsy()
  })

  test('should show valid password state if Validation succeds', () => {
    const { sut } = makeSut()
    const passwordInput = populatePasswordField(sut)
    expect(screen.queryByTestId('password-status')).toBeNull()
    expect(passwordInput.className.includes('error')).toBeFalsy()
  })

  test('should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    populateCredentialField(sut)
    populatePasswordField(sut)
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  test('should show spinner on submit', () => {
    const { sut } = makeSut()
    simulateValidSubmit(sut)
    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut()
    const credential = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(sut, credential, password)
    expect(authenticationSpy.params).toEqual({
      grantType: 'password_grant',
      credential,
      password
    })
  })
})
