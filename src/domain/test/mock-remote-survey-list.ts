import * as faker from 'faker'
import { RemoteLoadSurveyList } from '@/data/usecases'

export const mockRemoteSurveyItemModel = (): RemoteLoadSurveyList.Model => ({
  id: faker.datatype.uuid(),
  name: faker.random.words(),
  children: [
    {
      id: faker.datatype.uuid(),
      name: faker.random.words(),
      updatedAt: faker.date.recent()
    },
    {
      id: faker.datatype.uuid(),
      name: faker.random.words(),
      updatedAt: faker.date.recent()
    }
  ],
  updatedAt: faker.date.recent()
})

export const mockRemoteSurveyListModel = (
  count = 3
): RemoteLoadSurveyList.Model[] =>
  [...Array(count).keys()].map(() => mockRemoteSurveyItemModel())
