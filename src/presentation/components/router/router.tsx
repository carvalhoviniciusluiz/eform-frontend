import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from '@/presentation/pages'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/login'
          element={<Login validation={{ validate: () => '' }} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
