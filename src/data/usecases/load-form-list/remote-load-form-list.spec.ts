import * as faker from 'faker'
import { HttpGetClientMock } from '@/data/test'
import { RemoteLoadFormList } from '@/data/usecases'

describe('RemoteLoadFormList', () => {
  test('should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()
    const httpGetClientMock = new HttpGetClientMock()
    const sut = new RemoteLoadFormList(url, httpGetClientMock)
    await sut.loadAll()
    expect(httpGetClientMock.url).toBe(url)
  })
})
