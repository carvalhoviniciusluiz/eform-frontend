import * as faker from 'faker'
import { FormModel } from '@/domain/models'

export const mockFormListModel = (count = 1): FormModel[] =>
  [...Array(count).keys()].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.random.words(),
    updatedAd: faker.date.recent()
  }))
