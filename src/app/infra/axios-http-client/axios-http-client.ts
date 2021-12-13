import { HttpRequest, HttpResponse } from 'app/application/protocols/http'
import type { HttpClient } from 'app/application/protocols/http'
import axios, { AxiosResponse, AxiosError } from 'axios'

export class AxiosHttpClient implements HttpClient {
  async request({
    method,
    url,
    body: data,
    headers
  }: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.request({
        url,
        data,
        headers,
        method
      })
    } catch (error) {
      axiosResponse = (error as AxiosError)?.response as AxiosResponse
    }
    return {
      statusCode: axiosResponse?.status,
      body: axiosResponse?.data
    }
  }
}
