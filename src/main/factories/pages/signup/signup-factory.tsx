import {
  makeRemoteAddAccount,
  makeSignUpValidation,
  makeLocalSaveAccessToken
} from '@/main/factories'
import { SignUp } from '@/presentation/pages'

export const makeSignUp = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  )
}
