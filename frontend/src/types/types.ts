export interface Note {
  _id: string
  title: string
  content: string
  isArchived: boolean
  createdAt: Date
  updatedAt: Date
  categories: string[] | Category[]
}

export interface Category {
  _id: string
  name: string
  color: string
}
