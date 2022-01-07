import { LocalStorageAdapter } from '@/infra'

export const makeLocalStorageAdapter = (): LocalStorageAdapter => {
  return new LocalStorageAdapter()
}
