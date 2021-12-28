import * as faker from 'faker'
import { FormModel, UnexpectedError } from '@/domain'
import { mockFormListModel } from '@/domain/test'
import { HttpStatusCode } from '@/data/protocols'
import { HttpGetClientSpy } from '@/data/test'
import { RemoteLoadFormList } from '@/data/usecases'

type SutTypes = {
  httpGetClientSpy: HttpGetClientSpy<FormModel[]>
  sut: RemoteLoadFormList
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<FormModel[]>()
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

  test('should throw UnexpectedError if HttpPostClient returns 403', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
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
    const httpResult = mockFormListModel()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: {
        data: httpResult
      }
    }
    const formList = await sut.loadAll()
    expect(formList).toEqual(httpResult)
  })

  test('should return an empty list of FormModels if HttpGetClient returns 204', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.noContent
    }
    const formList = await sut.loadAll()
    expect(formList).toEqual([])
  })
})
