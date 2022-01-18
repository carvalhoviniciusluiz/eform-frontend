import * as jwtDecode from 'jwt-decode'
import { Decode, UnexpectedError, UserModel } from '@/domain'

type TokenDecoded = {
  email: string
  firstname: string
  lastname: string
  avatar: string
}

export class DecodeToken implements Decode {
  decode(token: string): UserModel {
    if (!token) {
      throw new UnexpectedError()
    }
    const decoded = jwtDecode.default<TokenDecoded>(token)
    return {
      email: decoded.email,
      firstName: decoded.firstname,
      lastName: decoded.lastname,
      avatar: decoded.avatar
    }
  }
}
