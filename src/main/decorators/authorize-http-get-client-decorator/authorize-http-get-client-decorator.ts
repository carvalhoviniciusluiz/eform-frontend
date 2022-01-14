import {
  GetStorage,
  HttpGetClient,
  HttpGetParams,
  HttpResponse
} from '@/data/protocols'

export class AuthorizeHttpGetClientDecorator implements HttpGetClient {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpGetClient
  ) {}

  async get(params: HttpGetParams): Promise<HttpResponse> {
    const account = this.getStorage.get('account')
    if (account?.accessToken) {
      Object.assign(params, {
        headers: {
          Authorization: `Bearer ${account.accessToken as string}`
        }
      })
    }
    await this.httpGetClient.get(params)
    return null
  }
}
