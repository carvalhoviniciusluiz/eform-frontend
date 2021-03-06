import * as faker from 'faker'
import { mockAccountModel } from '@/domain/test'
import { HttpGetParams } from '@/data/protocols'
import { GetStorageSpy, HttpGetClientSpy, mockGetRequest } from '@/data/test'
import { AuthorizeHttpGetClientDecorator } from '@/main/decorators'

type SutTypes = {
  sut: AuthorizeHttpGetClientDecorator
  getStorageSpy: GetStorageSpy
  httpGetClientSpy: HttpGetClientSpy
}

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy()
  const httpGetClientSpy = new HttpGetClientSpy()
  const sut = new AuthorizeHttpGetClientDecorator(
    getStorageSpy,
    httpGetClientSpy
  )
  return {
    sut,
    getStorageSpy,
    httpGetClientSpy
  }
}

describe('AuthorizeHttpGetClientDecorator', () => {
  test('should call GetStorage with correct value', () => {
    const { sut, getStorageSpy } = makeSut()
    sut.get(mockGetRequest())
    expect(getStorageSpy.key).toBe('@eform:account')
  })

  test('should not add headers if GetStorage is invalid', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
      headers: {
        field: faker.random.words()
      }
    }
    await sut.get(httpRequest)
    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.headers).toEqual(httpRequest.headers)
  })

  test('should add headers to HttpGetClient', async () => {
    const { sut, getStorageSpy, httpGetClientSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const httpRequest: HttpGetParams = {
      url: faker.internet.url()
    }
    await sut.get(httpRequest)
    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.headers).toEqual({
      Authorization: `Bearer ${getStorageSpy.value.accessToken as string}`
    })
  })

  test('should merge headers to HttpGetClient', async () => {
    const { sut, getStorageSpy, httpGetClientSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const field = faker.random.words()
    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
      headers: {
        field
      }
    }
    await sut.get(httpRequest)
    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.headers).toEqual({
      field,
      Authorization: `Bearer ${getStorageSpy.value.accessToken as string}`
    })
  })

  test('should return the same result as HttpGetClient', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const httpRespont = await sut.get(mockGetRequest())
    expect(httpRespont).toEqual(httpGetClientSpy.response)
  })
})
