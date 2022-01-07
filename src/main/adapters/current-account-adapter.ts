import { AccountModel, UnexpectedError } from '@/domain'
import { makeLocalStorageAdapter } from '@/main/factories'

export const setCurrentAccountAdapter = (account: AccountModel): void => {
  if (!account?.accessToken) {
    throw new UnexpectedError()
  }
  makeLocalStorageAdapter().set('@eform:account', account)
}
