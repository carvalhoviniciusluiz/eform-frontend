import React from 'react'
import ReactDOM from 'react-dom'
import { makeLogin } from '@/main/factories/pages/login/login-factory'
import { makeSignUp } from '@/main/factories/pages/signup/signup-factory'
import { Router } from '@/presentation/components'

ReactDOM.render(
  <React.StrictMode>
    <Router makeLogin={makeLogin} makeSignUp={makeSignUp} />
  </React.StrictMode>,
  document.getElementById('root')
)
