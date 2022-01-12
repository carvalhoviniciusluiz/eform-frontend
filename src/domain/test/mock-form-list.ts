import * as faker from 'faker'
import { FormModel, FormStatusEnum } from '@/domain'

export const mockFormItemModel = (
  status = FormStatusEnum.REVIEWED,
  consumers = {
    avatars: [
      faker.image.avatar(),
      faker.image.avatar(),
      faker.image.avatar(),
      faker.image.avatar(),
      {
        char: 'N',
        color: '#4fc9da',
        backgroundColor: '#ddf8fc'
      }
    ],
    total: 5
  }
): FormModel => ({
  id: faker.datatype.uuid(),
  name: faker.random.words(),
  status,
  consumers,
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent()
})

export const mockFormListModel = (count = 1): FormModel[] =>
  [...Array(count).keys()].map(() => mockFormItemModel())
