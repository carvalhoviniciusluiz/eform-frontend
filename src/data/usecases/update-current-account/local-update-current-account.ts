import { AccountModel, UnexpectedError } from '@/domain'
import { UpdateCurrentAccount } from '@/domain/usecases'
import { SetStorage } from '@/data/protocols'

export class LocalUpdateCurrentAccount implements UpdateCurrentAccount {
  constructor(private readonly setStorage: SetStorage) {}

  async save(account: AccountModel): Promise<void> {
    if (!account?.accessToken) {
      throw new UnexpectedError()
    }
    this.setStorage.set('@eform:account', JSON.stringify(account))
  }
}
