import { makeRemoteLoadFormList } from '@/main/factories'
import { FormList } from '@/presentation/pages'

export const makeFormList = () => {
  return <FormList loadFormList={makeRemoteLoadFormList()} />
}
