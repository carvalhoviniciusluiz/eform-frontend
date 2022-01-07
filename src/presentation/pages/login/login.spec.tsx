import { Router } from 'react-router-dom'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import * as faker from 'faker'
import { createMemoryHistory } from 'history'
import { AccountModel } from '@/domain'
import { InvalidCredentialsError } from '@/domain/errors'
import { ApiContext } from '@/presentation/contexts'
import { Login } from '@/presentation/pages'
import { AuthenticationSpy, ValidationStub, Helper } from '@/presentation/test'

type SutTypes = {
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
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router navigator={history} location={history.location}>
        <Login validation={validationStub} authentication={authenticationSpy} />
      </Router>
    </ApiContext.Provider>
  )
  return {
    authenticationSpy,
    setCurrentAccountMock
  }
}

const simulateValidSubmit = async (
  credential = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  Helper.populateField('credential', credential)
  Helper.populateField('password', password)
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('Login component', () => {
  test('should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.testButtonIsDisable('submit', true)
    Helper.testChildCount('submit', 1)
    Helper.testElementText('label-continue', 'Continue')
    Helper.testStatusForField('credential', 'error', true)
    Helper.testMessageTitle('credential-status', validationError)
    Helper.testStatusForField('password', 'error', true)
    Helper.testMessageTitle('password-status', validationError)
  })

  test('should show credential error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('credential')
    Helper.testStatusForField('credential', 'error', true)
    Helper.testMessageTitle('credential-status', validationError)
  })

  test('should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('password')
    Helper.testStatusForField('password', 'error', true)
    Helper.testMessageTitle('password-status', validationError)
  })

  test('should show valid credential state if Validation succeds', () => {
    makeSut()
    Helper.testStatusForField('credential', 'check', true)
  })

  test('should show valid password state if Validation succeds', () => {
    makeSut()
    Helper.testStatusForField('password', 'check', true)
  })

  test('should enable submit button if form is valid', () => {
    makeSut()
    Helper.populateField('credential')
    Helper.populateField('password')
    Helper.testButtonIsDisable('submit', false)
    Helper.testElementText('label-continue', 'Continue')
  })

  test('should show spinner on submit', async () => {
    makeSut()
    await simulateValidSubmit()
    Helper.testElementExists('spinner')
    Helper.testElementText('label-wait', 'Please wait...')
  })

  test('should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut()
    const credential = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(credential, password)
    expect(authenticationSpy.params).toEqual({
      grant_type: 'password_grant',
      credential,
      password
    })
  })

  test('should call Authentication only once', async () => {
    const { authenticationSpy } = makeSut()
    await simulateValidSubmit()
    await simulateValidSubmit()
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words()
    const { authenticationSpy } = makeSut({ validationError })
    await simulateValidSubmit()
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('should present error if Authentication fails', async () => {
    const { authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest
      .spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.reject(error))
    await simulateValidSubmit()
    Helper.testElementText('main-error', error.message)
    Helper.testChildCount('submit', 1)
    Helper.testButtonIsDisable('submit', false)
    Helper.testElementText('label-continue', 'Continue')
  })

  test('should call SaveAccessToken on success', async () => {
    const { authenticationSpy, setCurrentAccountMock } = makeSut()
    await simulateValidSubmit()
    expect(setCurrentAccountMock).toHaveBeenCalledWith(
      authenticationSpy.account
    )
    expect(history.location.pathname).toBe('/')
  })

  test('should go to signup page', async () => {
    makeSut()
    await simulateValidSubmit()
    const link = screen.getByTestId('signup-link')
    fireEvent.click(link)
    expect(history.location.pathname).toBe('/signup')
  })
})
