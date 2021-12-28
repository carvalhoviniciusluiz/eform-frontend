import * as faker from 'faker'
import { HttpGetClientMock } from '@/data/test'
import { RemoteLoadFormList } from '@/data/usecases'

type SutTypes = {
  httpGetClientMock: HttpGetClientMock
  sut: RemoteLoadFormList
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientMock = new HttpGetClientMock()
  const sut = new RemoteLoadFormList(url, httpGetClientMock)
  return {
    sut,
    httpGetClientMock
  }
}

describe('RemoteLoadFormList', () => {
  test('should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpGetClientMock } = makeSut(url)
    await sut.loadAll()
    expect(httpGetClientMock.url).toBe(url)
  })
})
