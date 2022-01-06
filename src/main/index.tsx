import React from 'react'
import ReactDOM from 'react-dom'
import Router from '@/main/routes/router'

import '@/presentation/assets/styles/index.scss'

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
)
