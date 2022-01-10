import * as faker from 'faker'
import { FormModel } from '@/domain/models'

export const mockFormItemModel = (): FormModel => ({
  id: faker.datatype.uuid(),
  name: faker.random.words(),
  updatedAd: faker.date.recent()
})

export const mockFormListModel = (count = 1): FormModel[] =>
  [...Array(count).keys()].map(() => mockFormItemModel())
