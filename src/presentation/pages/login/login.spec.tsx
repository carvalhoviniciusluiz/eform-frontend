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
import { AccountModel } from '@/domain'
import { InvalidCredentialsError } from '@/domain/errors'
import { ApiContext } from '@/presentation/contexts'
import { Login } from '@/presentation/pages'
import { AuthenticationSpy, ValidationStub, Helper } from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
  setCurrentAccountMock: (account: AccountModel) => void
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
  const setCurrentAccountMock = jest.fn()
  const sut = render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router navigator={history} location={history.location}>
        <Login validation={validationStub} authentication={authenticationSpy} />
      </Router>
    </ApiContext.Provider>
  )
  return {
    sut,
    authenticationSpy,
    setCurrentAccountMock
  }
}

const simulateValidSubmit = async (
  sut: RenderResult,
  credential = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  Helper.populateField(sut, 'credential', credential)
  Helper.populateField(sut, 'password', password)
  const form = sut.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('Login component', () => {
  afterEach(cleanup)

  test('should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.testButtonIsDisable(sut, 'submit', true)
    Helper.testChildCount(sut, 'submit', 1)
    Helper.testElementText(sut, 'label-continue', 'Continue')
    Helper.testStatusForField(sut, 'credential', 'error', true)
    Helper.testMessageTitle(sut, 'credential-status', validationError)
    Helper.testStatusForField(sut, 'password', 'error', true)
    Helper.testMessageTitle(sut, 'password-status', validationError)
  })

  test('should show credential error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'credential')
    Helper.testStatusForField(sut, 'credential', 'error', true)
    Helper.testMessageTitle(sut, 'credential-status', validationError)
  })

  test('should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password', 'error', true)
    Helper.testMessageTitle(sut, 'password-status', validationError)
  })

  test('should show valid credential state if Validation succeds', () => {
    const { sut } = makeSut()
    Helper.testStatusForField(sut, 'credential', 'check', true)
  })

  test('should show valid password state if Validation succeds', () => {
    const { sut } = makeSut()
    Helper.testStatusForField(sut, 'password', 'check', true)
  })

  test('should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'credential')
    Helper.populateField(sut, 'password')
    Helper.testButtonIsDisable(sut, 'submit', false)
    Helper.testElementText(sut, 'label-continue', 'Continue')
  })

  test('should show spinner on submit', async () => {
    const { sut } = makeSut()
    await simulateValidSubmit(sut)
    Helper.testElementExists(sut, 'spinner')
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
    const { sut, authenticationSpy, setCurrentAccountMock } = makeSut()
    await simulateValidSubmit(sut)
    expect(setCurrentAccountMock).toHaveBeenCalledWith(
      authenticationSpy.account
    )
    expect(history.location.pathname).toBe('/')
  })

  test('should go to signup page', async () => {
    const { sut } = makeSut()
    await simulateValidSubmit(sut)
    const link = sut.getByTestId('signup-link')
    fireEvent.click(link)
    expect(history.location.pathname).toBe('/signup')
  })
})
