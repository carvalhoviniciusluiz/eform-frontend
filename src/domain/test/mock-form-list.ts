import * as faker from 'faker'
import { LoadFormList } from '@/domain/usecases'

export const mockFormItemModel = (
  status = LoadFormList.Status.REVIEWED,
  consumers = {
    avatars: [
      faker.image.avatar(),
      faker.image.avatar(),
      faker.image.avatar(),
      faker.image.avatar(),
      {
        char: 'N',
        color: faker.internet.color(),
        backgroundColor: faker.internet.color()
      }
    ],
    total: 5
  }
): LoadFormList.Model => ({
  id: faker.datatype.uuid(),
  name: faker.random.words(),
  status,
  consumers,
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent()
})

export const mockFormListModel = (count = 1): LoadFormList.Model[] =>
  [...Array(count).keys()].map(() => mockFormItemModel())
