import { SaveAccessToken } from '@/domain/usecases'
import { LocalSaveAccessToken } from '@/data/usecases'
import { makeLocalStorageAdapter } from '@/main/factories'

export const makeLocalSaveAccessToken = (): SaveAccessToken => {
  return new LocalSaveAccessToken(makeLocalStorageAdapter())
}
