import { Authentication } from '@/domain/usecases'
import { RemoteAuthentication } from '@/data/usecases/authentication'
import { makeApiUrl, makeAxiosHttpCLient } from '@/main/factories/http'

export const makeRemoteAuthentication = (): Authentication => {
  return new RemoteAuthentication(makeApiUrl('/auth'), makeAxiosHttpCLient())
}
