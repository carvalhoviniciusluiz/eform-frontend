import * as faker from 'faker'
import { HttpGetClient, HttpGetParams } from '@/data/protocols'
import {
  HttpPostParams,
  HttpPostClient,
  HttpResponse,
  HttpStatusCode
} from '@/data/protocols/http'

export const mockPostRequest = (): HttpPostParams => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})

export const mockGetRequest = (): HttpGetParams => ({
  url: faker.internet.url(),
  headers: faker.random.objectElement()
})

export class HttpPostClientSpy<BodyType, ResponseType>
  implements HttpPostClient<BodyType, ResponseType>
{
  url?: string
  body?: BodyType
  response: HttpResponse<ResponseType> = {
    statusCode: HttpStatusCode.ok
  }

  async post(
    params: HttpPostParams<BodyType>
  ): Promise<HttpResponse<ResponseType>> {
    this.url = params.url
    this.body = params.body
    return await Promise.resolve(this.response)
  }
}

export class HttpGetClientSpy<ResponseType = any>
  implements HttpGetClient<ResponseType>
{
  url: string
  headers?: any
  response: HttpResponse<ResponseType> = {
    statusCode: HttpStatusCode.ok
  }

  async get(params: HttpGetParams): Promise<HttpResponse<ResponseType>> {
    this.url = params.url
    this.headers = params.headers
    return this.response
  }
}
