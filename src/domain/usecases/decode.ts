import { UserModel } from '@/domain/models'

export interface Decode {
  decode: (token: string) => UserModel
}

export namespace Decode {
  export type Model = UserModel
}
