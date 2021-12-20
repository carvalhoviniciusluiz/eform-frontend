import React, { useEffect, useState } from 'react'
import { SubmitButton } from '@/presentation/components'
import { TextField } from '@/presentation/components/inputs'
import { Validation } from '@/presentation/protocols'
import './login-styles.scss'

type StateProps = {
  isLoading: number
  email: string
  password: string
  emailError: string
  passwordError: string
}

type LoginProps = {
  validation: Validation
}

const Login = ({ validation }: LoginProps) => {
  const [state, setState] = useState<StateProps>({
    isLoading: 0,
    email: '',
    password: '',
    emailError: '',
    passwordError: ''
  })

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)
    }))
  }, [state.email, state.password])

  const handleChange = (event: React.FocusEvent<HTMLInputElement>) =>
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setState((prevState) => ({ ...prevState, isLoading: 1 }))
  }

  const isDisabled = !(!!state.email || !!state.password)

  return (
    <div className='loginContainer'>
      <div className='loginContainer__content'>
        <div className='loginContainer__panel loginContainer__banner banner-color'>
          <div className='loginContainer__panel__details'>
            <h1>Welcome to eForm</h1>

            <p>The best way to build dynamic web forms</p>
          </div>

          <div className='loginContainer__panel__image' />
        </div>

        <div className='loginContainer__form'>
          <div className='loginContainer__form__content'>
            <div className='loginContainer__form__content__wrapper'>
              <form onSubmit={handleSubmit}>
                <div className='title'>
                  <h1>Sign In to Good</h1>
                  <div className='actions'>
                    New Here?
                    <a href='#'>Create an Account</a>
                  </div>
                </div>

                <TextField
                  type='email'
                  label={
                    <div className='form-label textField__email'>
                      <label className='form-label textField__email__label'>
                        Email
                      </label>
                    </div>
                  }
                  name='email'
                  onChange={handleChange}
                  errorMessage={state.emailError}
                />

                <TextField
                  type='password'
                  label={
                    <div className='form-label textField__password'>
                      <label className='form-label textField__password__label'>
                        Password
                      </label>
                      <a href='#'>Forgot Password ?</a>
                    </div>
                  }
                  name='password'
                  onChange={handleChange}
                  errorMessage={state.passwordError}
                />

                <div className='loginContainer__form__submit'>
                  <SubmitButton
                    loading={state.isLoading}
                    disabled={isDisabled}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
