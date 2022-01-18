import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Authentication, Decode, GrantType } from '@/domain'
import { SubmitButton, TextField } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'
import { Validation } from '@/presentation/protocols'
import './login-styles.scss'

type StateProps = {
  isLoading: number
  isFormInvalid: boolean
  credential: string
  password: string
  credentialError: string
  passwordError: string
  mainError: string
}

type LoginProps = {
  validation: Validation
  authentication: Authentication
  decodedToken: Decode
}

const Login = ({ validation, authentication, decodedToken }: LoginProps) => {
  const { setCurrentAccount } = useContext(ApiContext)
  const navigate = useNavigate()
  const [state, setState] = useState<StateProps>({
    isLoading: 0,
    isFormInvalid: false,
    credential: '',
    password: '',
    credentialError: '',
    passwordError: '',
    mainError: ''
  })

  useEffect(() => {
    const { credential, password } = state
    const formData = { credential, password }
    const credentialError = validation.validate('credential', formData)
    const passwordError = validation.validate('password', formData)

    setState((prevState) => ({
      ...prevState,
      credentialError,
      passwordError,
      isFormInvalid: !!credentialError || !!passwordError
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
      if (state.isLoading || state.isFormInvalid) {
        return
      }
      setState((prevState) => ({ ...prevState, isLoading: 1 }))
      const account = await authentication.auth({
        grant_type: GrantType.PASSWORD_GRANT,
        credential: state.credential,
        password: state.password
      })
      const accessToken = account.accessToken
      const currentUser = decodedToken.decode(accessToken)
      setCurrentAccount({ ...account, currentUser })
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
    <div className='loginWrap'>
      <div className='loginWrap__content'>
        <div className='loginWrap__panel loginWrap__banner banner-color'>
          <div className='loginWrap__panel__details'>
            <h1>Welcome to eForm</h1>

            <p>The best way to build dynamic web forms</p>
          </div>

          <div className='loginWrap__panel__image' />
        </div>

        <div className='loginWrap__form'>
          <div className='loginWrap__form__content'>
            <div className='loginWrap__form__content__wrapper'>
              <form onSubmit={handleSubmit} data-testid='form'>
                <div className='title'>
                  <h1>Sign In to Good</h1>
                  <div className='actions'>
                    New Here?
                    <Link to='/signup' data-testid='signup-link'>
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

                <div className='loginWrap__form__submit'>
                  <SubmitButton
                    loading={state.isLoading}
                    disabled={state.isFormInvalid}
                  >
                    Continue
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

export default Login
