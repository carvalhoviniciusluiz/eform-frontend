import { UserModel } from '@/domain/models'

export type AccountModel = {
  accessToken: string
  accessTokenExpiresIn: number
  refreshToken: string
  refreshTokenExpiresIn: number
  currentUser: UserModel
}
