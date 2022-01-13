import { LoadFormList } from '@/domain/usecases'
import { RemoteLoadFormList } from '@/data/usecases'
import { makeApiUrl, makeAxiosHttpCLient } from '@/main/factories/http'

export const makeRemoteLoadFormList = (): LoadFormList => {
  return new RemoteLoadFormList(makeApiUrl('/forms'), makeAxiosHttpCLient())
}
