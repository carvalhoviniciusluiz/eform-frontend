import * as faker from 'faker'
import { SetStorageSpy } from '@/data/test'
import { LocalSaveAccessToken } from '@/data/usecases'

describe('LocalSaveAccessToken', () => {
  test('should call SetStorage with correct value', async () => {
    const setStorageSpy = new SetStorageSpy()
    const sut = new LocalSaveAccessToken(setStorageSpy)
    const accessToken = faker.datatype.uuid()
    await sut.save(accessToken)
    expect(setStorageSpy.key).toBe('accessToken')
    expect(setStorageSpy.value).toBe(accessToken)
  })
})
