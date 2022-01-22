import * as faker from 'faker'
import { RemoteLoadFormList } from '@/data/usecases'

export const mockRemoteFormItemModel = (
  status = RemoteLoadFormList.Status.REVIEWED,
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
): RemoteLoadFormList.Model => ({
  id: faker.datatype.uuid(),
  name: faker.random.words(),
  status,
  consumers,
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent()
})

export const mockRemoteFormListModel = (
  count = 3
): RemoteLoadFormList.Model[] =>
  [...Array(count).keys()].map(() => mockRemoteFormItemModel())
