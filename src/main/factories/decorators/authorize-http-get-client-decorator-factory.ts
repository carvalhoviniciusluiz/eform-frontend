import { HttpGetClient } from '@/data/protocols'
import { AuthorizeHttpGetClientDecorator } from '@/main/decorators'
import { makeAxiosHttpCLient, makeLocalStorageAdapter } from '@/main/factories'

export const makeAuthorizedHttpGetClientDecorator = (): HttpGetClient => {
  return new AuthorizeHttpGetClientDecorator(
    makeLocalStorageAdapter(),
    makeAxiosHttpCLient()
  )
}
