import { UserModel } from '@/domain/models'

export interface DecodeToken {
  decode: (token: string) => DecodeToken.Model
}

export namespace DecodeToken {
  export type Model = UserModel
}
