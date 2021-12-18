import { SubmitButton } from '@/presentation/components'
import { TextField } from '@/presentation/components/inputs'
import './login-styles.scss'

const Login = () => {
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
                  onChange={() => console.log('input email')}
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
                  onChange={() => console.log('input password')}
                />

                <div className='loginContainer__form__submit'>
                  <SubmitButton />
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
