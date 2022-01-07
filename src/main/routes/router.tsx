import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { setCurrentAccountAdapter } from '@/main/adapters'
import { makeLogin as Login } from '@/main/factories/pages/login/login-factory'
import { makeSignUp as SignUp } from '@/main/factories/pages/signup/signup-factory'
import { ApiContext } from '@/presentation/contexts'
import { FormList } from '@/presentation/pages'

const Router = () => {
  return (
    <ApiContext.Provider
      value={{ setCurrentAccount: setCurrentAccountAdapter }}
    >
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/' element={<FormList />} />
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
