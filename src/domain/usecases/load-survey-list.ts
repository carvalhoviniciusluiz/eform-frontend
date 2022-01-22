export interface LoadSurveyList {
  loadAll: () => Promise<LoadSurveyList.Model[]>
}

export namespace LoadSurveyList {
  export type Model = {
    id: string
    name: string
    children: Omit<Model, 'children'>
    updatedAt: Date
  }
}
