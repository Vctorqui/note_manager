import { Router } from 'express'
import {
  getNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
} from '../controllers/note.controller.js'

const router = Router()

router.get('/notes', getNotes)
router.post('/notes', createNote)
router.get('/notes/:id', getNoteById)
router.put('/notes/:id', updateNote)
router.delete('/notes/:id', deleteNote)

export default router
