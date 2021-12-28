import { FormModel } from '@/domain/models'

export interface LoadFormList {
  loadAll: () => Promise<FormModel[]>
}
