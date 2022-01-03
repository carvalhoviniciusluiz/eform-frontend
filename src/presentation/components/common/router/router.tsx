import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FormList } from '@/presentation/pages'

type Factory = {
  makeLogin: React.FC
  makeSignUp: React.FC
}

const Router = ({ makeLogin: Login, makeSignUp: SignUp }: Factory) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/' element={<FormList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
