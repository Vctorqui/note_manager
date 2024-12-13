import { Router } from 'express'
import {
  createCategory,
  getCategories,
  getCategoryById,
  deleteCategory,
} from '../controllers/category.controller.js'

const router = Router()

router.post('/category', createCategory)
router.get('/category', getCategories)
router.get('/category/:id', getCategoryById)
router.delete('/category/:id', deleteCategory)

export default router
