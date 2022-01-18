import { Router } from 'react-router-dom'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import * as faker from 'faker'
import { createMemoryHistory } from 'history'
import { Authentication, UserModel } from '@/domain'
import { InvalidCredentialsError } from '@/domain/errors'
import { AuthenticationSpy } from '@/domain/test'
import { DecodeToken } from '@/infra/decode'
import { ApiContext } from '@/presentation/contexts'
import { Login } from '@/presentation/pages'
import { ValidationStub, Helper } from '@/presentation/test'

type SutTypes = {
  authenticationSpy: AuthenticationSpy
  decodedTokenSpy: DecodedTokenSpy
  setCurrentAccountMock: (account: Authentication.Model) => void
}

type SutParams = {
  validationError: string
}

class DecodedTokenSpy implements DecodeToken {
  token: string
  callsCount = 0
  constructor(private readonly currentUser: UserModel) {}
  decode(token: string): UserModel {
    this.token = token
    this.callsCount++
    return this.currentUser
  }
}

const history = createMemoryHistory({
  initialEntries: ['/login']
})
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const authenticationSpy = new AuthenticationSpy()
  const decodedTokenSpy = new DecodedTokenSpy(
    authenticationSpy.account.currentUser
  )
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router navigator={history} location={history.location}>
        <Login
          validation={validationStub}
          authentication={authenticationSpy}
          decodedToken={decodedTokenSpy}
        />
      </Router>
    </ApiContext.Provider>
  )
  return {
    authenticationSpy,
    setCurrentAccountMock,
    decodedTokenSpy
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
    expect(screen.getByTestId('submit')).toBeDisabled()
    expect(screen.getByTestId('submit').children).toHaveLength(1)
    expect(screen.getByTestId('label-continue')).toHaveTextContent('Continue')
    Helper.testStatusForField('credential-status', validationError)
    Helper.testStatusForField('password-status', validationError)
  })

  test('should show credential error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('credential')
    Helper.testStatusForField('credential-status', validationError)
  })

  test('should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('password')
    Helper.testStatusForField('password-status', validationError)
  })

  test('should show valid credential state if Validation succeds', () => {
    makeSut()
    expect(screen.getByTestId(`credential-status`)).toHaveAttribute(
      'class',
      'check'
    )
  })

  test('should show valid password state if Validation succeds', () => {
    makeSut()
    expect(screen.getByTestId(`password-status`)).toHaveAttribute(
      'class',
      'check'
    )
  })

  test('should enable submit button if form is valid', () => {
    makeSut()
    Helper.populateField('credential')
    Helper.populateField('password')
    expect(screen.getByTestId('submit')).toBeEnabled()
    expect(screen.getByTestId('label-continue')).toHaveTextContent('Continue')
  })

  test('should show spinner on submit', async () => {
    makeSut()
    await simulateValidSubmit()
    expect(screen.queryByTestId('spinner')).toBeInTheDocument()
    expect(screen.getByTestId('label-wait')).toHaveTextContent('Please wait...')
  })

  test('should call DecodeToken with correct values', async () => {
    const { decodedTokenSpy, authenticationSpy } = makeSut()
    decodedTokenSpy.decode(authenticationSpy.account.accessToken)
    await simulateValidSubmit()
    expect(decodedTokenSpy.token).toEqual(authenticationSpy.account.accessToken)
  })

  test('should call DecodeToken only once', async () => {
    const { decodedTokenSpy } = makeSut()
    await simulateValidSubmit()
    await simulateValidSubmit()
    expect(decodedTokenSpy.callsCount).toBe(1)
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
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
    expect(screen.getByTestId('submit').children).toHaveLength(1)
    expect(screen.getByTestId('submit')).toBeEnabled()
    expect(screen.getByTestId('label-continue')).toHaveTextContent('Continue')
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
