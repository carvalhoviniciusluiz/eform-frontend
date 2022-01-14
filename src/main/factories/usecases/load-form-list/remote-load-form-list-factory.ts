import { LoadFormList } from '@/domain/usecases'
import { RemoteLoadFormList } from '@/data/usecases'
import {
  makeApiUrl,
  makeAuthorizedHttpGetClientDecorator
} from '@/main/factories'

export const makeRemoteLoadFormList = (): LoadFormList => {
  return new RemoteLoadFormList(
    makeApiUrl('/forms'),
    makeAuthorizedHttpGetClientDecorator()
  )
}
