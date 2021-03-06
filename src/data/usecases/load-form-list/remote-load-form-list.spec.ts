import * as faker from 'faker'
import { AccessDeniedError, UnexpectedError } from '@/domain'
import { mockRemoteFormListModel } from '@/domain/test'
import { HttpStatusCode } from '@/data/protocols'
import { HttpGetClientSpy } from '@/data/test'
import { RemoteLoadFormList } from '@/data/usecases'

type SutTypes = {
  httpGetClientSpy: HttpGetClientSpy<RemoteLoadFormList.Model[]>
  sut: RemoteLoadFormList
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<RemoteLoadFormList.Model[]>()
  const sut = new RemoteLoadFormList(url, httpGetClientSpy)
  return {
    sut,
    httpGetClientSpy
  }
}

describe('RemoteLoadFormList', () => {
  test('should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpGetClientSpy } = makeSut(url)
    await sut.loadAll()
    expect(httpGetClientSpy.url).toBe(url)
  })

  test('should throw AccessDeniedError if HttpPostClient returns 401', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  test('should throw AccessDeniedError if HttpPostClient returns 403', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  test('should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should return a list of FormModels if HttpGetClient returns 201', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const httpResult = mockRemoteFormListModel()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: {
        data: httpResult
      }
    }
    const httpResponse = await sut.loadAll()
    expect(httpResponse).toEqual(httpResult)
  })

  test('should return an empty list of FormModels if HttpGetClient returns 204', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.noContent
    }
    const httpResponse = await sut.loadAll()
    expect(httpResponse).toEqual([])
  })
})
