export enum FormStatusEnum {
  PUBLISHED = 'published',
  REVIEWED = 'reviewed',
  REMOVED = 'removed'
}

export type FormAsset =
  | string
  | {
      char: string
      color: string
      backgroundColor: string
    }

export type FormModel = {
  id: string
  name: string
  status: FormStatusEnum
  consumers: {
    avatars: FormAsset[]
    total: number
  }
  createdAt: Date
  updatedAt: Date
}
