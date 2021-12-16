import './create-account-styles.scss'

const CreateAccount = () => {
  return (
    <div className='form-container sign-up-container'>
      <form action='#' autoComplete='off'>
        <h1>Create Account</h1>
        <span>use your email for registration</span>
        <input type='text' placeholder='Name' />
        <input type='email' placeholder='Email' />
        <input type='password' placeholder='Password' />
        <button>Sign Up</button>
      </form>
    </div>
  )
}

export default CreateAccount
