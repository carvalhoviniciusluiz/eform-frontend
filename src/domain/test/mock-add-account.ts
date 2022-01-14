import * as faker from 'faker'
import { GrantType } from '@/domain'
import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import { AddAccount } from '@/domain/usecases'

export const mockAddAccountParams = (): AddAccount.Params => {
  const password = faker.internet.password()
  return {
    grant_type: GrantType.CREATE_CREDENTIALS,
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    document_number: faker.random.alphaNumeric(11),
    phone: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    password
  }
}

export const mockAddAccountModel = (): AddAccount.Model => mockAccountModel()

export class AddAccountSpy implements AddAccount {
  account = mockAddAccountModel()
  params: AddAccount.Params
  callsCount = 0

  async add(params: AddAccount.Params): Promise<AccountModel> {
    this.params = params
    this.callsCount++
    return this.account
  }
}
