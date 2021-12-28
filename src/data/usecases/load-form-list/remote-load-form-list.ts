import { FormModel, LoadFormList, UnexpectedError } from '@/domain'
import { HttpGetClient, HttpStatusCode } from '@/data/protocols'

export class RemoteLoadFormList implements LoadFormList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<FormModel[]>
  ) {}

  async loadAll(): Promise<FormModel[]> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body?.data
      default:
        throw new UnexpectedError()
    }
  }
}
