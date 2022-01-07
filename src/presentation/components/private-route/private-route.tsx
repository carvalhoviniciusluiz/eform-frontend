import { Navigate, RouteProps } from 'react-router-dom'

const PrivateRoute = (props: RouteProps) => {
  return <Navigate replace to='/login' />
}

export default PrivateRoute
