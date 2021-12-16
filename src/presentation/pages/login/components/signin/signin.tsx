import { Spinner } from '@/presentation/pages/components'
import './signin-styles.scss'

const Signin = () => {
  return (
    <>
      <div className='form-container sign-in-container'>
        <div className='error-wrap'>
          <div className='alert alert-warning'>erro</div>
        </div>

        <form action='#'>
          <h1>Sign in</h1>
          <span>use your account</span>
          <div className='input-wrap'>
            <input type='email' placeholder='Email' autoComplete='off' />
            <span className='status'>🔴</span>
          </div>
          <div className='input-wrap'>
            <input type='password' placeholder='Password' />
            <span className='status'>🔴</span>
          </div>
          <a href='#'>Forgot your password?</a>
          <button>Sign In</button>
        </form>

        <div className='spinner-wrap'>
          <Spinner />
        </div>
      </div>
    </>
  )
}

export default Signin
