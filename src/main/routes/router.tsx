import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { makeLogin as Login } from '@/main/factories/pages/login/login-factory'
import { makeSignUp as SignUp } from '@/main/factories/pages/signup/signup-factory'
import { FormList } from '@/presentation/pages'

const Router = () => {
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
