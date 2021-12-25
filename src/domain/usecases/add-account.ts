import { GrantType } from '@/domain/enums'
import { AccountModel } from '@/domain/models'

export type AddAccountParams = {
  grant_type: GrantType
  firstname: string
  lastname: string
  documentNumber: string
  email: string
  phone: string
  password: string
  passwordConfirmation: string
}

export interface AddAccount {
  add: (params: AddAccountParams) => Promise<AccountModel>
}
