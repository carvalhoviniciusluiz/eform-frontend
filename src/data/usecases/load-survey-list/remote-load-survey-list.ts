import { AccessDeniedError, LoadSurveyList, UnexpectedError } from '@/domain'
import { HttpGetClient, HttpStatusCode } from '@/data/protocols'

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadSurveyList.Model[]>
  ) {}

  async loadAll(): Promise<RemoteLoadSurveyList.Model[]> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body?.data
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError()
      case HttpStatusCode.unauthorized:
        throw new AccessDeniedError()
      case HttpStatusCode.noContent:
        return []
      default:
        throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadSurveyList {
  export type Model = LoadSurveyList.Model
}
