import { Note, Category } from '../types/types'

export const API_BASE_URL = 'http://localhost:3001/api'

export const API_ENDPOINTS = {
  NOTES: `${API_BASE_URL}/notes`,
  CATEGORIES: `${API_BASE_URL}/category`,
} as const

export const NoteInit: Note = {
  _id: '',
  title: '',
  content: '',
  isArchived: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  categories: [],
}

export const CategoryInit: Category = {
  _id: '',
  name: '',
  color: '',
}
