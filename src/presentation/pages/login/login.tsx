import React from 'react'
import { CreateAccount, Signin } from './components'
import './login-styles.scss'

const Login = () => {
  const [rightPanel, setRightPanel] = React.useState(false)

  return (
    <>
      <div className={rightPanel ? 'right-panel-active' : ''}>
        <CreateAccount />
        <Signin />

        <div className='overlay-container'>
          <div className='overlay'>
            <div className='overlay-panel overlay-left'>
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className='ghost'
                onClick={() => setRightPanel(!rightPanel)}
              >
                Sign In
              </button>
            </div>
            <div className='overlay-panel overlay-right'>
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className='ghost'
                onClick={() => setRightPanel(!rightPanel)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <p>
          Copyright © 2021{' '}
          <a href='#' target='__blank'>
            Devnort.
          </a>{' '}
          All rights reserved.
        </p>
      </footer>
    </>
  )
}

export default Login
