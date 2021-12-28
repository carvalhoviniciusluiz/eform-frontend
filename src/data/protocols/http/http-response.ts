export enum HttpStatusCode {
  ok = 201,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500
}

export type HttpResponse<BodyType = any> = {
  statusCode: HttpStatusCode
  body?: {
    data: BodyType
  }
}
