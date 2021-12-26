import { Router } from 'react-router-dom'
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
  waitFor
} from '@testing-library/react'
import * as faker from 'faker'
import { createMemoryHistory } from 'history'
import { InvalidCredentialsError } from '@/domain/errors'
import { Login } from '@/presentation/pages'
import {
  AuthenticationSpy,
  SaveAccessTokenMock,
  ValidationStub,
  Helper
} from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({
  initialEntries: ['/login']
})
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const authenticationSpy = new AuthenticationSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()
  const sut = render(
    <Router navigator={history} location={history.location}>
      <Login
        validation={validationStub}
        authentication={authenticationSpy}
        saveAccessToken={saveAccessTokenMock}
      />
    </Router>
  )
  return {
    sut,
    authenticationSpy,
    saveAccessTokenMock
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

const simulateValidSubmit = async (
  sut: RenderResult,
  credential = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  populateCredentialField(sut, credential)
  populatePasswordField(sut, password)
  const form = sut.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
) => {
  const credentialStatus = sut.getByTestId(`${fieldName}-status`)
  expect(credentialStatus.textContent).toBe(validationError)
  const credentialInput = sut.getByTestId(fieldName)
  expect(credentialInput.className.includes('error')).toBeTruthy()
}

const testElementExists = (sut: RenderResult, fieldName: string) => {
  const el = sut.getByTestId(fieldName)
  expect(el).toBeTruthy()
}

describe('Login component', () => {
  afterEach(cleanup)

  test('should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.testButtonIsDisable(sut, 'submit', true)
    Helper.testChildCount(sut, 'submit', 1)
    Helper.testElementText(sut, 'label-continue', 'Continue')
    testStatusForField(sut, 'credential', validationError)
    testStatusForField(sut, 'password', validationError)
  })

  test('should show credential error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populateCredentialField(sut)
    testStatusForField(sut, 'credential', validationError)
  })

  test('should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populatePasswordField(sut)
    testStatusForField(sut, 'password', validationError)
  })

  test('should show valid credential state if Validation succeds', () => {
    const { sut } = makeSut()
    const credentialInput = populateCredentialField(sut)
    Helper.testElementNotExists(sut, 'credential-status')
    expect(credentialInput.className.includes('error')).toBeFalsy()
  })

  test('should show valid password state if Validation succeds', () => {
    const { sut } = makeSut()
    const passwordInput = populatePasswordField(sut)
    Helper.testElementNotExists(sut, 'password-status')
    expect(passwordInput.className.includes('error')).toBeFalsy()
  })

  test('should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    populateCredentialField(sut)
    populatePasswordField(sut)
    Helper.testButtonIsDisable(sut, 'submit', false)
    Helper.testElementText(sut, 'label-continue', 'Continue')
  })

  test('should show spinner on submit', async () => {
    const { sut } = makeSut()
    await simulateValidSubmit(sut)
    testElementExists(sut, 'spinner')
    Helper.testElementText(sut, 'label-wait', 'Please wait...')
  })

  test('should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const credential = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(sut, credential, password)
    expect(authenticationSpy.params).toEqual({
      grant_type: 'password_grant',
      credential,
      password
    })
  })

  test('should call Authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut()
    await simulateValidSubmit(sut)
    await simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words()
    const { sut, authenticationSpy } = makeSut({ validationError })
    await simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest
      .spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.reject(error))
    await simulateValidSubmit(sut)
    Helper.testElementText(sut, 'main-error', error.message)
    Helper.testChildCount(sut, 'submit', 1)
    Helper.testButtonIsDisable(sut, 'submit', false)
    Helper.testElementText(sut, 'label-continue', 'Continue')
  })

  test('should call SaveAccessToken on success', async () => {
    const { sut, authenticationSpy, saveAccessTokenMock } = makeSut()
    await simulateValidSubmit(sut)
    expect(saveAccessTokenMock.accessToken).toBe(
      authenticationSpy.account.accessToken
    )
    expect(history.location.pathname).toBe('/')
  })

  test('should present error if SaveAccessToken fails', async () => {
    const { sut, saveAccessTokenMock } = makeSut()
    const error = new InvalidCredentialsError()
    jest
      .spyOn(saveAccessTokenMock, 'save')
      .mockReturnValueOnce(Promise.reject(error))
    await simulateValidSubmit(sut)
    Helper.testElementText(sut, 'main-error', error.message)
    Helper.testChildCount(sut, 'submit', 1)
    Helper.testButtonIsDisable(sut, 'submit', false)
    Helper.testElementText(sut, 'label-continue', 'Continue')
  })

  test('should go to signup page', async () => {
    const { sut } = makeSut()
    await simulateValidSubmit(sut)
    const signup = sut.getByTestId('signup')
    fireEvent.click(signup)
    expect(history.location.pathname).toBe('/signup')
  })
})
