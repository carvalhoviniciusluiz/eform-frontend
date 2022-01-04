import {
  makeRemoteAuthentication,
  makeLoginValidation,
  makeLocalUpdateCurrentAccount
} from '@/main/factories'
import { Login } from '@/presentation/pages'

export const makeLogin = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
      updateCurrentAccount={makeLocalUpdateCurrentAccount()}
    />
  )
}
