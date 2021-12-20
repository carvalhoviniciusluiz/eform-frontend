import {
  render,
  RenderResult,
  screen,
  fireEvent,
  cleanup
} from '@testing-library/react'
import * as faker from 'faker'
import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import { Authentication, AuthenticationParams } from '@/domain/usecases'
import { Login } from '@/presentation/pages'
import { ValidationStub } from '@/presentation/test'

class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params: AuthenticationParams
  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    return await Promise.resolve(this.account)
  }
}

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

describe('Login component', () => {
  afterEach(cleanup)

  test('should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const submit = sut.getByTestId('submit') as HTMLButtonElement
    expect(submit.childElementCount).toBe(1)
    expect(submit.firstChild.textContent).toBe('Continue')
    expect(submit.disabled).toBe(true)
    const credentialInput = sut.getByTestId('credential')
    expect(credentialInput.className.includes('error')).toBeTruthy()
    const credentialStatus = sut.getByTestId('credential-status')
    expect(credentialStatus.textContent).toBe(validationError)
    const passwordInput = sut.getByTestId('password')
    expect(passwordInput.className.includes('error')).toBeTruthy()
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.textContent).toBe(validationError)
  })

  test('should show credential error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const credentialInput = sut.getByTestId('credential')
    fireEvent.input(credentialInput, {
      target: { value: faker.internet.email() }
    })
    const credentialStatus = sut.getByTestId('credential-status')
    expect(credentialStatus.textContent).toBe(validationError)
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

  test('should show valid credential state if Validation succeds', () => {
    const { sut } = makeSut()
    const credentialInput = sut.getByTestId('credential')
    fireEvent.input(credentialInput, {
      target: { value: faker.internet.email() }
    })
    expect(screen.queryByTestId('credential-status')).toBeNull()
    expect(credentialInput.className.includes('error')).toBeFalsy()
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
    const credentialInput = sut.getByTestId('credential')
    fireEvent.input(credentialInput, {
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
    const credentialInput = sut.getByTestId('credential')
    fireEvent.input(credentialInput, {
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

  test('should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut()
    const credentialInput = sut.getByTestId('credential')
    const credential = faker.internet.email()
    fireEvent.input(credentialInput, {
      target: { value: credential }
    })
    const passwordInput = sut.getByTestId('password')
    const password = faker.internet.password()
    fireEvent.input(passwordInput, {
      target: { value: password }
    })
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    fireEvent.click(submitButton)
    expect(authenticationSpy.params).toEqual({
      grantType: 'password_grant',
      credential,
      password
    })
  })
})
