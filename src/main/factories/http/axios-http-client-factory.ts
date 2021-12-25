import { AxiosHttpClient } from '@/infra/http'

export const makeAxiosHttpCLient = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}
