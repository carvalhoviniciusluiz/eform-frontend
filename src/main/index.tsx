import React from 'react'
import ReactDOM from 'react-dom'
import { makeLogin } from '@/main/factories/pages/login/login-factory'
import { Router } from '@/presentation/components'

ReactDOM.render(
  <React.StrictMode>
    <Router makeLogin={makeLogin} />
  </React.StrictMode>,
  document.getElementById('root')
)
