import { AccountModel, UnexpectedError } from '@/domain'
import { LOCAL_STORAGE_KEY } from '@/main/config/constants'
import { makeLocalStorageAdapter } from '@/main/factories'

export const setCurrentAccountAdapter = (account: AccountModel): void => {
  if (!account?.accessToken) {
    throw new UnexpectedError()
  }
  makeLocalStorageAdapter().set(LOCAL_STORAGE_KEY, account)
}

export const getCurrentAccountAdapter = (): AccountModel => {
  return makeLocalStorageAdapter().get(LOCAL_STORAGE_KEY)
}
