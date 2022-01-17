import jwtDecode from 'jwt-decode'
import { UnexpectedError, UserModel } from '@/domain'
import { DecodeToken } from '@/domain/usecases'

type TokenDecoded = {
  email: string
  firstname: string
  lastname: string
  avatar: string
}

export class DecodedToken implements DecodeToken {
  decode: (token: string) => UserModel

  private constructor() {}

  static decode(token: string): UserModel {
    if (!token) {
      throw new UnexpectedError()
    }
    const decoded = jwtDecode<TokenDecoded>(token)
    return {
      email: decoded.email,
      firstName: decoded.firstname,
      lastName: decoded.lastname,
      avatar: decoded.avatar
    }
  }
}
