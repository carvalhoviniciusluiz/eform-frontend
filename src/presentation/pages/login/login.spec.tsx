import { Router } from 'react-router-dom'
import {
  render,
  RenderResult,
  screen,
  fireEvent,
  cleanup,
  waitFor
} from '@testing-library/react'
import * as faker from 'faker'
import { createMemoryHistory } from 'history'
import 'jest-localstorage-mock'
import { InvalidCredentialsError } from '@/domain/errors'
import { Login } from '@/presentation/pages'
import { AuthenticationSpy, ValidationStub } from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory()
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Router navigator={history} location={history.location}>
      <Login validation={validationStub} authentication={authenticationSpy} />
    </Router>
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
): HTMLButtonElement => {
  populateCredentialField(sut, credential)
  populatePasswordField(sut, password)
  const submitButton = sut.getByTestId('submit') as HTMLButtonElement
  fireEvent.click(submitButton)
  return submitButton
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
  beforeEach(() => {
    localStorage.clear()
  })

  test('should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.childElementCount).toBe(1)
    expect(submitButton.firstChild.textContent).toBe('Continue')
    expect(submitButton.disabled).toBe(true)
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

  test('should call Authentication only once', () => {
    const { sut, authenticationSpy } = makeSut()
    simulateValidSubmit(sut)
    simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('should not call Authentication if form is invalid', () => {
    const validationError = faker.random.words()
    const { sut, authenticationSpy } = makeSut({ validationError })
    populateCredentialField(sut)
    fireEvent.submit(sut.getByTestId('form'))
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest
      .spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.reject(error))
    const submitButton = simulateValidSubmit(sut)
    await waitFor(() => submitButton)
    const mainError = sut.getByTestId('main-error')
    expect(mainError.textContent).toBe(error.message)
    expect(submitButton.childElementCount).toBe(1)
    expect(submitButton.firstChild.textContent).toBe('Continue')
  })

  test('should add accessToken to localstorage on success', async () => {
    const { sut, authenticationSpy } = makeSut()
    simulateValidSubmit(sut)
    await waitFor(() => sut.getByTestId('form'))
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'accessToken',
      authenticationSpy.account.accessToken
    )
  })

  test('should go to signup page', async () => {
    const { sut } = makeSut()
    simulateValidSubmit(sut)
    const signup = sut.getByTestId('signup')
    fireEvent.click(signup)
    expect(history.location.pathname).toBe('/signup')
  })
})
