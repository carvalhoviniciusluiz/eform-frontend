import { GrantType } from '@/domain/enums'
import { AccountModel } from '@/domain/models'

export type AuthenticationParams = {
  grant_type: GrantType
  credential: string
  password: string
}

export interface Authentication {
  auth: (params: AuthenticationParams) => Promise<AccountModel>
}
