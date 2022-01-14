export interface LoadFormList {
  loadAll: () => Promise<LoadFormList.Model[]>
}

export namespace LoadFormList {
  export enum Status {
    PUBLISHED = 'published',
    REVIEWED = 'reviewed',
    REMOVED = 'removed'
  }

  export type Avatar =
    | string
    | {
        char: string
        color: string
        backgroundColor: string
      }

  export type Model = {
    id: string
    name: string
    status: Status
    consumers: {
      avatars: Avatar[]
      total: number
    }
    createdAt: Date
    updatedAt: Date
  }
}
