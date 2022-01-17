import { UserModel } from '@/domain/models'

export interface DecodeToken {
  decode: (token: string) => Promise<DecodeToken.Model>
}

export namespace DecodeToken {
  export type Model = UserModel
}
