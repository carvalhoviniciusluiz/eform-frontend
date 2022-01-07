import { AccountModel, UnexpectedError } from '@/domain'
import { makeLocalStorageAdapter } from '../factories'

export const setCurrentAccountAdapter = (account: AccountModel): void => {
  if (!account?.accessToken) {
    throw new UnexpectedError()
  }
  makeLocalStorageAdapter().set('@eform:account', account)
}

export const getCurrentAccountAdapter = (): AccountModel => {
  return makeLocalStorageAdapter().get('@eform:account')
}
