import { LoadFormList, UnexpectedError } from '@/domain'
import { HttpGetClient, HttpStatusCode } from '@/data/protocols'

export class RemoteLoadFormList implements LoadFormList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadFormList.Model[]>
  ) {}

  async loadAll(): Promise<RemoteLoadFormList.Model[]> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body?.data
      case HttpStatusCode.noContent:
        return []
      default:
        throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadFormList {
  export type Model = LoadFormList.Model
}
