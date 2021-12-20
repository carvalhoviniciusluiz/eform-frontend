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
}

type LoginProps = {
  validation: Validation
}

const Login = ({ validation }: LoginProps) => {
  const [state, setState] = useState<StateProps>({
    isLoading: 0,
    email: null,
    password: null,
    emailError: null
  })

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      emailError: validation.validate('email', state.email)
    }))
  }, [state.email])
  useEffect(() => {
    validation.validate('password', state.password)
  }, [state.password])

  const handleChange = (event: React.FocusEvent<HTMLInputElement>) =>
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))

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
              <form action='#'>
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
                  value={state.email}
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
                  value={state.password}
                  onChange={handleChange}
                />

                <div className='loginContainer__form__submit'>
                  <SubmitButton loading={state.isLoading} />
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
