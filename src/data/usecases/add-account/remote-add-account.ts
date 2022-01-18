import { EmailInUseError, UnexpectedError } from '@/domain'
import { AddAccount } from '@/domain/usecases'
import { HttpPostClient, HttpStatusCode } from '@/data/protocols'

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      RemoteAddAccount.Params,
      RemoteAddAccount.Model
    >
  ) {}

  async add(params: RemoteAddAccount.Params): Promise<RemoteAddAccount.Model> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body?.data
      case HttpStatusCode.created:
        return httpResponse.body?.data
      case HttpStatusCode.forbidden:
        throw new EmailInUseError()
      default:
        throw new UnexpectedError()
    }
  }
}

export namespace RemoteAddAccount {
  export type Params = AddAccount.Params
  export type Model = AddAccount.Model
}
