import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AddAccount, GrantType, SaveAccessToken } from '@/domain'
import { SubmitButton } from '@/presentation/components'
import { PasswordField, TextField } from '@/presentation/components/inputs'
import { Validation } from '@/presentation/protocols'
import './signup-styles.scss'

type StateProps = {
  isLoading: number
  isFormInvalid: boolean
  firstName: string
  lastName: string
  documentNumber: string
  phone: string
  email: string
  password: string
  passwordConfirmation: string
  firstNameError: string
  lastNameError: string
  documentNumberError: string
  phoneError: string
  emailError: string
  passwordError: string
  passwordConfirmationError: string
  mainError: string
}

type SignUpProps = {
  validation: Validation
  addAccount: AddAccount
  saveAccessToken: SaveAccessToken
}

const SignUp = ({ validation, addAccount, saveAccessToken }: SignUpProps) => {
  const navigate = useNavigate()
  const [state, setState] = useState<StateProps>({
    isLoading: 0,
    isFormInvalid: false,
    firstName: '',
    lastName: '',
    documentNumber: '',
    phone: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    firstNameError: '',
    lastNameError: '',
    documentNumberError: '',
    phoneError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: '',
    mainError: ''
  })

  useEffect(() => {
    const {
      firstName,
      lastName,
      documentNumber,
      phone,
      email,
      password,
      passwordConfirmation
    } = state
    const formData = {
      firstName,
      lastName,
      documentNumber,
      phone,
      email,
      password,
      passwordConfirmation
    }
    const firstNameError = validation.validate('firstName', formData)
    const lastNameError = validation.validate('lastName', formData)
    const documentNumberError = validation.validate('documentNumber', formData)
    const phoneError = validation.validate('phone', formData)
    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', formData)
    const passwordConfirmationError = validation.validate(
      'passwordConfirmation',
      formData
    )

    setState((prevState) => ({
      ...prevState,
      firstNameError,
      lastNameError,
      documentNumberError,
      phoneError,
      emailError,
      passwordError,
      passwordConfirmationError,
      isFormInvalid:
        !!firstNameError ||
        !!lastNameError ||
        !!documentNumberError ||
        !!phoneError ||
        !!emailError ||
        !!passwordError ||
        !!passwordConfirmationError
    }))
  }, [
    state.firstName,
    state.lastName,
    state.documentNumber,
    state.phone,
    state.email,
    state.password,
    state.passwordConfirmation
  ])

  const handleChange = (event: React.FocusEvent<HTMLInputElement>) =>
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) return
      setState((prevState) => ({ ...prevState, isLoading: 1 }))
      const account = await addAccount.add({
        grant_type: GrantType.CREATE_CREDENTIALS,
        firstname: state.firstName,
        lastname: state.lastName,
        document_number: state.documentNumber,
        phone: state.phone,
        email: state.email,
        password: state.password
      })
      await saveAccessToken.save(account.accessToken)
      navigate('/')
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        isLoading: 0,
        mainError: error.message
      }))
    }
  }

  return (
    <div className='signupContainer'>
      <div className='signupContainer__content'>
        <div className='signupContainer__panel signupContainer__banner banner-color'>
          <div className='signupContainer__panel__details'>
            <h1>Welcome to eForm</h1>

            <p>The best way to build dynamic web forms</p>
          </div>

          <div className='signupContainer__panel__image' />
        </div>

        <div className='signupContainer__form'>
          <div className='signupContainer__form__content'>
            <div className='signupContainer__form__content__wrapper'>
              <form onSubmit={handleSubmit} data-testid='form'>
                <div className='title'>
                  <h1>Create an Account</h1>
                  <div className='actions'>
                    Already have an account?
                    <Link to='/login' data-testid='login-link'>
                      Sign in here
                    </Link>
                  </div>
                </div>

                {state.mainError && (
                  <div className='alert alert__danger' data-testid='main-error'>
                    {state.mainError}
                  </div>
                )}

                <div className='inputGroup'>
                  <TextField
                    label={
                      <div className='form-label textField__credential'>
                        <label className='form-label textField__credential__label'>
                          First name
                        </label>
                      </div>
                    }
                    name='firstName'
                    onChange={handleChange}
                    errorMessage={state.firstNameError}
                  />
                  <TextField
                    label={
                      <div className='form-label textField__credential'>
                        <label className='form-label textField__credential__label'>
                          Last name
                        </label>
                      </div>
                    }
                    name='lastName'
                    onChange={handleChange}
                    errorMessage={state.lastNameError}
                  />
                </div>

                <div className='inputGroup'>
                  <TextField
                    label={
                      <div className='form-label textField__credential'>
                        <label className='form-label textField__credential__label'>
                          Document number
                        </label>
                      </div>
                    }
                    name='documentNumber'
                    onChange={handleChange}
                    errorMessage={state.documentNumberError}
                  />
                  <TextField
                    label={
                      <div className='form-label textField__credential'>
                        <label className='form-label textField__credential__label'>
                          Phone number
                        </label>
                      </div>
                    }
                    name='phone'
                    onChange={handleChange}
                    errorMessage={state.phoneError}
                  />
                </div>

                <TextField
                  type='email'
                  label={
                    <div className='form-label textField__credential'>
                      <label className='form-label textField__credential__label'>
                        Email
                      </label>
                    </div>
                  }
                  name='email'
                  onChange={handleChange}
                  errorMessage={state.emailError}
                />

                <div className='inputGroup'>
                  <PasswordField
                    label={
                      <div className='form-label textField__password'>
                        <label className='form-label textField__password__label'>
                          Password
                        </label>
                      </div>
                    }
                    name='password'
                    onChange={handleChange}
                    errorMessage={state.passwordError}
                  />

                  <PasswordField
                    label={
                      <div className='form-label textField__password'>
                        <label className='form-label textField__password__label'>
                          Password confirmation
                        </label>
                      </div>
                    }
                    name='passwordConfirmation'
                    onChange={handleChange}
                    errorMessage={state.passwordConfirmationError}
                  />
                </div>

                <div className='signupContainer__form__submit'>
                  <SubmitButton
                    loading={state.isLoading}
                    disabled={state.isFormInvalid}
                  >
                    Submit
                  </SubmitButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
