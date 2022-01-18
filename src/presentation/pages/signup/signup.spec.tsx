import { Router } from 'react-router-dom'
import { fireEvent, render, waitFor, screen } from '@testing-library/react'
import * as faker from 'faker'
import { createMemoryHistory } from 'history'
import { EmailInUseError } from '@/domain'
import { AddAccountSpy } from '@/domain/test'
import { SignUp } from '@/presentation/pages'
import { Helper, ValidationStub } from '@/presentation/test'

type SutTypes = {
  addAccountSpy: AddAccountSpy
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
  render(
    <Router navigator={history} location={history.location}>
      <SignUp validation={validationStub} addAccount={addAccountSpy} />
    </Router>
  )
  return {
    addAccountSpy
  }
}

const simulateValidSubmit = async (
  firstName = faker.name.firstName(),
  lastName = faker.name.lastName(),
  documentNumber = faker.random.alphaNumeric(11),
  phone = faker.phone.phoneNumber(),
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  Helper.populateField('firstName', firstName)
  Helper.populateField('lastName', lastName)
  Helper.populateField('documentNumber', documentNumber)
  Helper.populateField('phone', phone)
  Helper.populateField('email', email)
  Helper.populateField('password', password)
  Helper.populateField('passwordConfirmation', password)
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('SignUp Component', () => {
  test('should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    expect(screen.getByTestId('submit')).toBeDisabled()
    expect(screen.getByTestId('submit').children).toHaveLength(1)
    expect(screen.getByTestId('label-continue')).toHaveTextContent('Submit')
    Helper.testStatusForField('firstName-status', validationError)
    Helper.testStatusForField('lastName-status', validationError)
    Helper.testStatusForField('documentNumber-status', validationError)
    Helper.testStatusForField('phone-status', validationError)
    Helper.testStatusForField('email-status', validationError)

    expect(screen.getByTestId(`password-status`)).toHaveAttribute(
      'class',
      'textField__error'
    )
    expect(screen.getByTestId('password-status')).toHaveTextContent(
      validationError
    )

    expect(screen.getByTestId(`passwordConfirmation-status`)).toHaveAttribute(
      'class',
      'textField__error'
    )
    expect(screen.getByTestId('passwordConfirmation-status')).toHaveTextContent(
      validationError
    )
  })

  test('should show firstName error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('firstName')
    Helper.testStatusForField('firstName-status', validationError)
  })

  test('should show lastName error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('lastName')
    Helper.testStatusForField('lastName-status', validationError)
  })

  test('should show documentNumber error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('documentNumber')
    Helper.testStatusForField('documentNumber-status', validationError)
  })

  test('should show phone error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('phone')
    Helper.testStatusForField('phone-status', validationError)
  })

  test('should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('email')
    Helper.testStatusForField('email-status', validationError)
  })

  test('should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('password')
    expect(screen.getByTestId(`password-status`)).toHaveAttribute(
      'class',
      'textField__error'
    )
    expect(screen.getByTestId('password-status')).toHaveTextContent(
      validationError
    )
  })

  test('should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('passwordConfirmation')
    expect(screen.getByTestId(`passwordConfirmation-status`)).toHaveAttribute(
      'class',
      'textField__error'
    )
    expect(screen.getByTestId('passwordConfirmation-status')).toHaveTextContent(
      validationError
    )
  })

  test('should show valid firstName state if Validation succeds', () => {
    makeSut()
    expect(screen.getByTestId(`firstName-status`)).not.toHaveAttribute(
      'class',
      'error'
    )
  })

  test('should show valid lastName state if Validation succeds', () => {
    makeSut()
    expect(screen.getByTestId(`lastName-status`)).not.toHaveAttribute(
      'class',
      'error'
    )
  })

  test('should show valid documentNumber state if Validation succeds', () => {
    makeSut()
    expect(screen.getByTestId(`documentNumber-status`)).not.toHaveAttribute(
      'class',
      'error'
    )
  })

  test('should show valid phone state if Validation succeds', () => {
    makeSut()
    expect(screen.getByTestId(`phone-status`)).not.toHaveAttribute(
      'class',
      'error'
    )
  })

  test('should show valid email state if Validation succeds', () => {
    makeSut()
    expect(screen.getByTestId(`email-status`)).not.toHaveAttribute(
      'class',
      'error'
    )
  })

  test('should show valid password state if Validation succeds', () => {
    makeSut()
    expect(screen.getByTestId(`password-status`)).toHaveTextContent('')
  })

  test('should show valid passwordConfirmation state if Validation succeds', () => {
    makeSut()
    expect(screen.getByTestId('passwordConfirmation-status')).toHaveTextContent(
      ''
    )
  })

  test('should enable submit button if form is valid', () => {
    makeSut()
    Helper.populateField('firstName')
    Helper.populateField('lastName')
    Helper.populateField('documentNumber')
    Helper.populateField('phone')
    Helper.populateField('email')
    Helper.populateField('password')
    Helper.populateField('passwordConfirmation')
    expect(screen.getByTestId('submit')).toBeEnabled()
    expect(screen.getByTestId('label-continue')).toHaveTextContent('Submit')
  })

  test('should show spinner on submit', async () => {
    makeSut()
    await simulateValidSubmit()
    expect(screen.getByTestId('label-wait')).toHaveTextContent('Please wait...')
  })

  test('should call AddAccount with correct values', async () => {
    const { addAccountSpy } = makeSut()
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()
    const documentNumber = faker.random.alphaNumeric(11)
    const phone = faker.phone.phoneNumber()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(
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
    const { addAccountSpy } = makeSut()
    await simulateValidSubmit()
    await simulateValidSubmit()
    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('should not call AddAccount if form is invalid', async () => {
    const validationError = faker.random.words()
    const { addAccountSpy } = makeSut({ validationError })
    await simulateValidSubmit()
    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('should present error if AddAccount fails', async () => {
    const { addAccountSpy } = makeSut()
    const error = new EmailInUseError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)
    await simulateValidSubmit()
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
    expect(screen.getByTestId('submit')).toBeEnabled()
    expect(screen.getByTestId('label-continue')).toHaveTextContent('Submit')
  })

  test('should call SaveAccessToken on success', async () => {
    makeSut()
    await simulateValidSubmit()
    expect(history.location.pathname).toBe('/login')
  })

  test('should go to login page', async () => {
    makeSut()
    await simulateValidSubmit()
    const link = screen.getByTestId('login-link')
    fireEvent.click(link)
    expect(history.location.pathname).toBe('/login')
  })
})
