import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Authentication, GrantType, SaveAccessToken } from '@/domain'
import { SubmitButton } from '@/presentation/components'
import { TextField } from '@/presentation/components/inputs'
import { Validation } from '@/presentation/protocols'
import './login-styles.scss'

type StateProps = {
  isLoading: number
  credential: string
  password: string
  credentialError: string
  passwordError: string
  mainError: string
}

type LoginProps = {
  validation: Validation
  authentication: Authentication
  saveAccessToken: SaveAccessToken
}

const Login = ({ validation, authentication, saveAccessToken }: LoginProps) => {
  const navigate = useNavigate()
  const [state, setState] = useState<StateProps>({
    isLoading: 0,
    credential: '',
    password: '',
    credentialError: '',
    passwordError: '',
    mainError: ''
  })

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      credentialError: validation.validate('credential', state.credential),
      passwordError: validation.validate('password', state.password)
    }))
  }, [state.credential, state.password])

  const handleChange = (event: React.FocusEvent<HTMLInputElement>) =>
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (state.isLoading || state.credentialError || state.passwordError) {
        return
      }
      setState((prevState) => ({ ...prevState, isLoading: 1 }))
      const account = await authentication.auth({
        grant_type: GrantType.PASSWORD_GRANT,
        credential: state.credential,
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

  const isDisabled = !(!!state.credential || !!state.password)

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
              <form onSubmit={handleSubmit} data-testid='form'>
                <div className='title'>
                  <h1>Sign In to Good</h1>
                  <div className='actions'>
                    New Here?
                    <Link to='/signup' data-testid='signup'>
                      Create an Account
                    </Link>
                  </div>
                </div>

                {state.mainError && (
                  <div className='alert alert__danger' data-testid='main-error'>
                    {state.mainError}
                  </div>
                )}

                <TextField
                  type='email'
                  label={
                    <div className='form-label textField__credential'>
                      <label className='form-label textField__credential__label'>
                        Email
                      </label>
                    </div>
                  }
                  name='credential'
                  onChange={handleChange}
                  errorMessage={state.credentialError}
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
