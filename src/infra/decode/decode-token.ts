import { UnexpectedError, UserModel } from '@/domain'
import { DecodeToken } from '@/domain/usecases'

export class DecodedToken implements DecodeToken {
  decode: (token: string) => Promise<UserModel>

  private constructor() {}

  static async decode(token: string): Promise<UserModel> {
    if (!token) {
      throw new UnexpectedError()
    }

    return null
  }
}
