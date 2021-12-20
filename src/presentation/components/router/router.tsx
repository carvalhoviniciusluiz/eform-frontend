import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from '@/presentation/pages'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/login'
          element={
            <Login
              validation={{ validate: () => '' }}
              authentication={{
                auth: async () => {
                  return await Promise.resolve({
                    accessToken: '',
                    accessTokenExpiresIn: 0,
                    refreshToken: '',
                    refreshTokenExpiresIn: 0
                  })
                }
              }}
            />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
