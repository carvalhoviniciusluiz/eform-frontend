export type HttpMethod = 'post' | 'get' | 'put' | 'delete' | 'patch'

export enum HttpStatusCode {
  ok = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  formError = 421,
  unprocessableEntity = 422,
  serverError = 500
}

export type HttpRequest<RequestBody = any, RequestHeaders = any> = {
  url: string
  method: HttpMethod
  body?: RequestBody
  headers?: RequestHeaders
}

export type HttpResponse<BodyData = any> = {
  statusCode: HttpStatusCode
  body?: BodyData
}

export interface HttpClient<ResponseData = any> {
  request: (data: HttpRequest) => Promise<HttpResponse<ResponseData>>
}
