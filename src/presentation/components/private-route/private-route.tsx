import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { ApiContext } from '@/presentation/contexts'

function PrivateRoute({ children }) {
  const { getCurrentAccount } = useContext(ApiContext)
  return getCurrentAccount()?.accessToken ? children : <Navigate to='/login' />
}

export default PrivateRoute
