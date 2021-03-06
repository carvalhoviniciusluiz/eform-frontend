import axios from 'axios'
import * as faker from 'faker'

export const mockHttpResponse = () => ({
  data: faker.random.objectElement(),
  status: faker.datatype.number()
})

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.post.mockClear().mockResolvedValue(mockHttpResponse)
  mockedAxios.get.mockClear().mockResolvedValue(mockHttpResponse)
  return mockedAxios
}
