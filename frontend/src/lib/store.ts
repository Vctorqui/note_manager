import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Category } from '../types/types'
import { deleteApiCategory, getApiCategories } from '@/services/categoryService'

interface CategoryState {
  categories: Category[]
  fetchCategories: () => Promise<void>
  deleteCategory: (categoryId: string) => Promise<void>
}

export const useStore = create<CategoryState>()(
  persist(
    (set) => ({
      categories: [],
      fetchCategories: async () => {
        const categories = await getApiCategories()
        set({ categories })
      },
      deleteCategory: async (categoryId: string) => {
        await deleteApiCategory(categoryId)
        set((state) => ({
          categories: state.categories.filter(
            (category) => category._id !== categoryId
          ),
        }))
      },
    }),
    {
      name: 'category-storage',
    }
  )
)

// import { create } from 'zustand'
// import { persist } from 'zustand/middleware'
// import {
//   fetchNotes,
//   addNote,
//   updateNote,
//   deleteNote,
// } from '@/services/notesService'
// import {
//   fetchCategories,
//   addCategory,
//   deleteCategory,
// } from '@/services/categoryService'
// import { Category, Note } from './types'

// interface NotesState {
//   notes: Note[]
//   categories: Category[]
//   toggleArchive: (id: string) => void
//   fetchNotes: () => void
//   addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void
//   updateNote: (id: string, note: Partial<Note>) => void
//   deleteNote: (id: string) => void
//   fetchCategories: () => void
//   addCategory: (category: Omit<Category, 'id'>) => void
//   deleteCategory: (id: string) => void
// }

// export const useStore = create<NotesState>()(
//   persist(
//     (set) => ({
//       notes: [],
//       categories: [],
//       fetchNotes: async () => {
//         const notes = await fetchNotes()
//         set({ notes })
//       },
//       addNote: async (note) => {
//         const newNote = await addNote(note)
//         set((state) => ({
//           notes: [...state.notes, newNote],
//         }))
//       },
//       updateNote: async (id, updatedNote) => {
//         const updatedNoteFromAPI = await updateNote(id, updatedNote)
//         set((state) => ({
//           notes: state.notes.map((note) =>
//             note.id === id ? { ...note, ...updatedNoteFromAPI } : note
//           ),
//         }))
//       },
//       deleteNote: async (id) => {
//         await deleteNote(id)
//         set((state) => ({
//           notes: state.notes.filter((note) => note.id !== id),
//         }))
//       },
//       toggleArchive: (id) =>
//         set((state) => ({
//           notes: state.notes.map((note) =>
//             note.id === id
//               ? { ...note, isArchived: !note.isArchived, updatedAt: new Date() }
//               : note
//           ),
//         })),
//       fetchCategories: async () => {
//         const categories = await fetchCategories()
//         set({ categories })
//       },
//       addCategory: async (category) => {
//         const newCategory = await addCategory(category)
//         set((state) => ({
//           categories: [...state.categories, newCategory],
//         }))
//       },
//       deleteCategory: async (id) => {
//         await deleteCategory(id)
//         set((state) => ({
//           categories: state.categories.filter((category) => category.id !== id),
//         }))
//       },
//     }),
//     {
//       name: 'notes-storage',
//     }
//   )
// )
