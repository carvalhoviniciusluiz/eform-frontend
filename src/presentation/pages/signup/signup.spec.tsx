import { Router } from 'react-router-dom'
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor
} from '@testing-library/react'
import * as faker from 'faker'
import { createMemoryHistory } from 'history'
import { AccountModel, EmailInUseError } from '@/domain'
import { ApiContext } from '@/presentation/contexts'
import { SignUp } from '@/presentation/pages'
import { AddAccountSpy, Helper, ValidationStub } from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
  addAccountSpy: AddAccountSpy
  setCurrentAccountMock: (account: AccountModel) => void
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({
  initialEntries: ['/signup']
})
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const addAccountSpy = new AddAccountSpy()
  const setCurrentAccountMock = jest.fn()
  const sut = render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router navigator={history} location={history.location}>
        <SignUp validation={validationStub} addAccount={addAccountSpy} />
      </Router>
    </ApiContext.Provider>
  )
  return {
    sut,
    addAccountSpy,
    setCurrentAccountMock
  }
}

const simulateValidSubmit = async (
  sut: RenderResult,
  firstName = faker.name.firstName(),
  lastName = faker.name.lastName(),
  documentNumber = faker.random.alphaNumeric(11),
  phone = faker.phone.phoneNumber(),
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  Helper.populateField(sut, 'firstName', firstName)
  Helper.populateField(sut, 'lastName', lastName)
  Helper.populateField(sut, 'documentNumber', documentNumber)
  Helper.populateField(sut, 'phone', phone)
  Helper.populateField(sut, 'email', email)
  Helper.populateField(sut, 'password', password)
  Helper.populateField(sut, 'passwordConfirmation', password)
  const form = sut.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('SignUp Component', () => {
  afterEach(cleanup)

  test('should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.testButtonIsDisable(sut, 'submit', true)
    Helper.testChildCount(sut, 'submit', 1)
    Helper.testElementText(sut, 'label-continue', 'Submit')
    Helper.testStatusForField(sut, 'firstName', 'error', true)
    Helper.testMessageTitle(sut, 'firstName-status', validationError)

    Helper.testStatusForField(sut, 'lastName', 'error', true)
    Helper.testMessageTitle(sut, 'lastName-status', validationError)

    Helper.testStatusForField(sut, 'documentNumber', 'error', true)
    Helper.testMessageTitle(sut, 'documentNumber-status', validationError)

    Helper.testStatusForField(sut, 'phone', 'error', true)
    Helper.testMessageTitle(sut, 'phone-status', validationError)

    Helper.testStatusForField(sut, 'email', 'error', true)
    Helper.testMessageTitle(sut, 'email-status', validationError)

    Helper.testStatusForField(sut, 'password', 'error', true)
    Helper.testTextContent(sut, 'password-status', validationError)

    Helper.testStatusForField(sut, 'passwordConfirmation', 'error', true)
    Helper.testTextContent(sut, 'passwordConfirmation-status', validationError)
  })

  test('should show firstName error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'firstName')
    Helper.testStatusForField(sut, 'firstName', 'error', true)
    Helper.testMessageTitle(sut, 'firstName-status', validationError)
  })

  test('should show lastName error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'lastName')
    Helper.testStatusForField(sut, 'lastName', 'error', true)
    Helper.testMessageTitle(sut, 'lastName-status', validationError)
  })

  test('should show documentNumber error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'documentNumber')
    Helper.testStatusForField(sut, 'documentNumber', 'error', true)
    Helper.testMessageTitle(sut, 'documentNumber-status', validationError)
  })

  test('should show phone error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'phone')
    Helper.testStatusForField(sut, 'phone', 'error', true)
    Helper.testMessageTitle(sut, 'phone-status', validationError)
  })

  test('should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email', 'error', true)
    Helper.testMessageTitle(sut, 'email-status', validationError)
  })

  test('should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password', 'error', true)
    Helper.testTextContent(sut, 'password-status', validationError)
  })

  test('should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testStatusForField(sut, 'passwordConfirmation', 'error', true)
    Helper.testTextContent(sut, 'passwordConfirmation-status', validationError)
  })

  test('should show valid firstName state if Validation succeds', () => {
    const { sut } = makeSut()
    Helper.testStatusForField(sut, 'firstName', 'error', false)
  })

  test('should show valid lastName state if Validation succeds', () => {
    const { sut } = makeSut()
    Helper.testStatusForField(sut, 'lastName', 'error', false)
  })

  test('should show valid documentNumber state if Validation succeds', () => {
    const { sut } = makeSut()
    Helper.testStatusForField(sut, 'documentNumber', 'error', false)
  })

  test('should show valid phone state if Validation succeds', () => {
    const { sut } = makeSut()
    Helper.testStatusForField(sut, 'phone', 'error', false)
  })

  test('should show valid email state if Validation succeds', () => {
    const { sut } = makeSut()
    Helper.testStatusForField(sut, 'email', 'error', false)
  })

  test('should show valid password state if Validation succeds', () => {
    const { sut } = makeSut()
    Helper.testTextContent(sut, `password-status`, '')
  })

  test('should show valid passwordConfirmation state if Validation succeds', () => {
    const { sut } = makeSut()
    Helper.testTextContent(sut, `passwordConfirmation-status`, '')
  })

  test('should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'firstName')
    Helper.populateField(sut, 'lastName')
    Helper.populateField(sut, 'documentNumber')
    Helper.populateField(sut, 'phone')
    Helper.populateField(sut, 'email')
    Helper.populateField(sut, 'password')
    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testButtonIsDisable(sut, 'submit', false)
    Helper.testElementText(sut, 'label-continue', 'Submit')
  })

  test('should show spinner on submit', async () => {
    const { sut } = makeSut()
    await simulateValidSubmit(sut)
    Helper.testElementText(sut, 'label-wait', 'Please wait...')
  })

  test('should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()
    const documentNumber = faker.random.alphaNumeric(11)
    const phone = faker.phone.phoneNumber()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(
      sut,
      firstName,
      lastName,
      documentNumber,
      phone,
      email,
      password
    )
    expect(addAccountSpy.params).toEqual({
      grant_type: 'create_credentials',
      firstname: firstName,
      lastname: lastName,
      document_number: documentNumber,
      phone,
      email,
      password
    })
  })

  test('should call AddAccount only once', async () => {
    const { sut, addAccountSpy } = makeSut()
    await simulateValidSubmit(sut)
    await simulateValidSubmit(sut)
    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('should not call AddAccount if form is invalid', async () => {
    const validationError = faker.random.words()
    const { sut, addAccountSpy } = makeSut({ validationError })
    await simulateValidSubmit(sut)
    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('should present error if AddAccount fails', async () => {
    const { sut, addAccountSpy } = makeSut()
    const error = new EmailInUseError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)
    await simulateValidSubmit(sut)
    Helper.testElementText(sut, 'main-error', error.message)
    Helper.testChildCount(sut, 'submit', 1)
    Helper.testButtonIsDisable(sut, 'submit', false)
    Helper.testElementText(sut, 'label-continue', 'Submit')
  })

  test('should call SaveAccessToken on success', async () => {
    const { sut, addAccountSpy, setCurrentAccountMock } = makeSut()
    await simulateValidSubmit(sut)
    expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account)
    expect(history.location.pathname).toBe('/')
  })

  test('should go to login page', async () => {
    const { sut } = makeSut()
    await simulateValidSubmit(sut)
    const link = sut.getByTestId('login-link')
    fireEvent.click(link)
    expect(history.location.pathname).toBe('/login')
  })
})
