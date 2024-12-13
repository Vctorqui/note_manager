import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Category } from '../types/types'
import {
  deleteApiCategory,
  getApiCategories,
} from '@/src/services/categoryService'

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
