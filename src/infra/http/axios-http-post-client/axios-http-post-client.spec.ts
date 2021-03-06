import axios from 'axios'
import * as faker from 'faker'
import { HttpPostParams } from '@/data/protocols/http'
import { AxiosHttpPostClient } from '@/infra/http/axios-http-post-client'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const modkedAxiosResult = {
  data: faker.random.objectElement(),
  status: faker.datatype.number()
}
mockedAxios.post.mockResolvedValue(modkedAxiosResult)

const makeSut = (): AxiosHttpPostClient => {
  return new AxiosHttpPostClient()
}

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})

describe('AxiosHttpPostClient', () => {
  test('should call axios with correct URL values', async () => {
    const request = mockPostRequest()
    const sut = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('should return the correct statusCode and body', async () => {
    const sut = makeSut()
    const httpResponse = await sut.post(mockPostRequest())
    expect(httpResponse).toEqual({
      statusCode: modkedAxiosResult.status,
      body: modkedAxiosResult.data
    })
  })
})
