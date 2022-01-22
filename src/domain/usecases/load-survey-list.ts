export interface LoadSurveyList {
  loadAll: () => Promise<LoadSurveyList.Model[]>
}

export namespace LoadSurveyList {
  export type Model = {
    id: string
    name: string
    children: Array<Omit<Model, 'children'>>
    updatedAt: Date
  }
}
