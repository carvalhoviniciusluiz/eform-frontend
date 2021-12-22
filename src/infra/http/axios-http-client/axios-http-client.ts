import axios, { AxiosError } from 'axios'
import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse
} from '@/data/protocols/http'

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post(params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    try {
      const httpResponse = await axios.post(params.url, params.body)
      return {
        statusCode: httpResponse.status,
        body: httpResponse.data
      }
    } catch (error) {
      const { isAxiosError, response } = error as AxiosError
      if (isAxiosError) {
        return {
          statusCode: response.status
        }
      }
    }
  }
}
