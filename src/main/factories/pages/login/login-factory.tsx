import { DecodeToken } from '@/infra/decode'
import { makeRemoteAuthentication, makeLoginValidation } from '@/main/factories'
import { Login } from '@/presentation/pages'

const makeDecodeToken = () => {
  return new DecodeToken()
}

export const makeLogin = () => {
  return (
    <Login
      decodedToken={makeDecodeToken()}
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
    />
  )
}
