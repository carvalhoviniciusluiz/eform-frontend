import { AccountModel } from '@/domain'
import { UpdateCurrentAccount } from '@/domain/usecases'

export class UpdateCurrentAccountMock implements UpdateCurrentAccount {
  account: AccountModel

  async save(account: AccountModel): Promise<void> {
    this.account = account
  }
}
