import {
  Box,
  Button,
  Checkbox,
  Chip,
  DialogActions,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material'
import CustomDialog from './ui/CustomDialog'
import { useEffect, useState } from 'react'
import { NoteInit } from '../lib/const'
import { createNote, updateNote } from '@/services/notesService'
import { Category, Note } from '../types/types'
import { enqueueSnackbar } from 'notistack'
import { getApiCategories } from '@/services/categoryService'
import { useStore } from '../lib/store'

interface NoteDialogProps {
  open: boolean
  onClose: () => void
  onCreate: (note: Note) => void
  onUpdate?: (note: Note) => void
  note?: Note
}

export const NoteDialog = ({
  open,
  onClose,
  onCreate,
  onUpdate,
  note,
}: NoteDialogProps) => {
  const [form, setForm] = useState(NoteInit)
  const { categories, fetchCategories } = useStore()
  // const [availableCategories, setAvailableCategories] = useState<Category[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  useEffect(() => {
    if (open) {
      setForm(note || NoteInit) // Actualiza el formulario con los datos de la nota si existe
      setSelectedCategories(
        note
          ? note.categories.map((cat) =>
              typeof cat === 'string' ? cat : cat._id
            )
          : []
      )
      fetchCategories()
    }
  }, [open, note, fetchCategories])

  // useEffect(() => {
  //  fetchCategories()
  // }, [fetchCategories])

  const handleChange = (event: any) => {
    let { name, value } = event.target
    setForm({
      ...form,
      [name]: value,
    })
  }

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((_id) => _id !== categoryId)
      } else if (prev.length < 1) {
        return [...prev, categoryId]
      } else {
        enqueueSnackbar('Max 1 category for note', { variant: 'warning' })
        return prev
      }
    })
  }

  const handleAccept = async () => {
    try {
      const noteData = {
        ...form,
        categories: selectedCategories,
      }
      if (note) {
        const id = form._id
        const editNote = await updateNote(id, noteData)
        onUpdate?.(editNote)
        enqueueSnackbar('Note Updated Successfully', {
          variant: 'success',
        })
      } else {
        const data = await createNote(noteData)
        onCreate(data)
        enqueueSnackbar('Note Created Successfully', {
          variant: 'success',
        })
      }
      onClose()
    } catch (error) {
      console.log(error)
      enqueueSnackbar('Failed to save the note', { variant: 'error' })
    }
  }

  return (
    <CustomDialog open={open} onClose={onClose}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
        <Typography>{note ? 'Edit Note' : 'Create Note'}</Typography>
        <TextField
          label='Title'
          name='title'
          fullWidth
          value={form.title}
          onChange={handleChange}
        />
        <TextField
          label='Content'
          name='content'
          fullWidth
          multiline
          rows={4}
          value={form.content}
          onChange={handleChange}
        />
        <Box>
          <Box sx={{ mb: 1 }}>Categories:</Box>
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
            {categories.map((category) => (
              <Chip
                key={category._id}
                label={category.name}
                onClick={() => toggleCategory(category._id)}
                color={
                  selectedCategories.includes(category._id)
                    ? 'primary'
                    : 'default'
                }
                variant={
                  selectedCategories.includes(category._id)
                    ? 'filled'
                    : 'outlined'
                }
              />
            ))}
          </Box>
        </Box>
      </Box>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAccept} variant='contained'>
          Save
        </Button>
      </DialogActions>
    </CustomDialog>
  )
}

// async function getCategories() {
//   try {
//     const categories = await getApiCategories() // Función para obtener categorías desde la API
//     setAvailableCategories(categories)
//   } catch (error) {
//     console.error('Error fetching categories:', error)
//   }
// }

{
  /* <Box>
          <Box sx={{ mb: 1 }}>Categories:</Box>
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
            {categories.map((category) => (
              <Chip
                key={category.id}
                label={category.name}
                onClick={() => toggleCategory(category.id)}
                color={selectedCategories.includes(category.id)
                  ? 'primary'
                  : 'default'}
                variant={selectedCategories.includes(category.id)
                  ? 'filled'
                  : 'outlined'} />
            ))}
          </Box>
        </Box> */
}

// import { useState, useEffect } from 'react'
// import { Note, Category } from '../lib/types'
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   Box,
//   Chip,
// } from '@mui/material'

// type CreateNoteData = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>
// type UpdateNoteData = Partial<Omit<Note, 'id' | 'createdAt' | 'updatedAt'>> & {
//   id: string
// }

// interface NoteDialogProps {
//   note?: Note
//   open: boolean
//   onClose: () => void
//   onSave: (noteData: CreateNoteData | UpdateNoteData) => void
//   categories: Category[]
// }

// export function NoteDialog({
//   note,
//   open,
//   onClose,
//   onSave,
//   categories,
// }: NoteDialogProps) {
//   const [title, setTitle] = useState('')
//   const [content, setContent] = useState('')
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([])

//   useEffect(() => {
//     if (note) {
//       setTitle(note.title)
//       setContent(note.content)
//       setSelectedCategories(note.categories)
//     } else {
//       setTitle('')
//       setContent('')
//       setSelectedCategories([])
//     }
//   }, [note])

//   const handleSubmit = () => {
//     if (!title.trim() || !content.trim()) return

//     const noteData = {
//       title,
//       content,
//       categories: selectedCategories,
//     }

//     if (note) {
//       // Para actualización
//       onSave({
//         id: note.id,
//         ...noteData,
//       })
//     } else {
//       // Para creación
//       onSave({
//         ...noteData,
//         isArchived: false,
//       })
//     }

//     onClose()
//   }

//   const toggleCategory = (categoryId: string) => {
//     setSelectedCategories((prev) =>
//       prev.includes(categoryId)
//         ? prev.filter((id) => id !== categoryId)
//         : [...prev, categoryId]
//     )
//   }

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
//       <DialogTitle>{note ? 'Edit Note' : 'Create Note'}</DialogTitle>
//       <DialogContent>
//         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
//           <TextField
//             label='Title'
//             fullWidth
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//           <TextField
//             label='Content'
//             fullWidth
//             multiline
//             rows={4}
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//           />
//           <Box>
//             <Box sx={{ mb: 1 }}>Categories:</Box>
//             <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
//               {categories.map((category) => (
//                 <Chip
//                   key={category.id}
//                   label={category.name}
//                   onClick={() => toggleCategory(category.id)}
//                   color={
//                     selectedCategories.includes(category.id)
//                       ? 'primary'
//                       : 'default'
//                   }
//                   variant={
//                     selectedCategories.includes(category.id)
//                       ? 'filled'
//                       : 'outlined'
//                   }
//                 />
//               ))}
//             </Box>
//           </Box>
//         </Box>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Cancel</Button>
//         <Button onClick={handleSubmit} variant='contained'>
//           Save
//         </Button>
//       </DialogActions>
//     </Dialog>
//   )
// }
