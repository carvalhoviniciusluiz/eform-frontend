import React, { useState } from 'react'
import { SubmitButton } from '@/presentation/components'
import { PasswordField, TextField } from '@/presentation/components/inputs'
import './signup-styles.scss'

type StateProps = {
  isLoading: number
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

const Signup = () => {
  const [state, setState] = useState<StateProps>({
    isLoading: 0,
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

  const handleChange = (event: React.FocusEvent<HTMLInputElement>) =>
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log('submit')
  }

  const isDisabled = true

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
                    <a href='/login' data-testid='login'>
                      Sign in here
                    </a>
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
                  <SubmitButton loading={state.isLoading} disabled={isDisabled}>
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

export default Signup
