import { AccountModel } from '../models';

enum GrantType {
  PASSWORD_GRANT = 'password_grant',
  REFRESH_TOKEN = 'refresh_token',
  CREATE_CREDENTIALS = 'create_credentials'
}

type AuthenticationParams = {
  grantType: GrantType
  credential: string
  password: string
}

export interface Authentication {
  auth: (params: AuthenticationParams) => Promise<AccountModel>
}