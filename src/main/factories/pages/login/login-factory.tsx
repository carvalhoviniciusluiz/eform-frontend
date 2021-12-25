import {
  makeRemoteAuthentication,
  makeLoginValidation,
  makeLocalSaveAccessToken
} from '@/main/factories'
import { Login } from '@/presentation/pages'

export const makeLogin = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  )
}
