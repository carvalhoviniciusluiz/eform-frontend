import { GrantType } from '@/domain/enums'
import { AccountModel } from '@/domain/models'
export interface AddAccount {
  add: (params: AddAccount.Params) => Promise<AddAccount.Model>
}

export namespace AddAccount {
  export type Params = {
    grant_type: GrantType
    firstname: string
    lastname: string
    document_number: string
    email: string
    phone: string
    password: string
  }

  export type Model = AccountModel
}
