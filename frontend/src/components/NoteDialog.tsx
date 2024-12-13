import {
  Box,
  Button,
  Chip,
  DialogActions,
  TextField,
  Typography,
} from '@mui/material'
import CustomDialog from './ui/CustomDialog'
import { useEffect, useState } from 'react'
import { NoteInit } from '../lib/const'
import { createNote, updateNote } from '@/src/services/notesService'
import { Note } from '../types/types'
import { enqueueSnackbar } from 'notistack'
import { useStore } from '../lib/store'
import CustomInput from './ui/CustomInput'

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
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [validateInputs, setValidateInputs] = useState(false)
  const [fieldsWithError, setFieldsWithError] = useState(0)
  const [loadComponent, setLoadComponent] = useState(0)
  const [clickSubmit, setClickSubmit] = useState<number>(0)

  useEffect(() => {
    if (loadComponent > 0 && clickSubmit > 0) {
      const getAll = document.querySelectorAll('.textField-required.Mui-error')
      setFieldsWithError(getAll.length)
      if (getAll.length === 0) {
        handleAccept()
      }
    }
    setLoadComponent(loadComponent + 1)
    // eslint-disable-next-line
  }, [clickSubmit])

  const validateForm = () => {
    setValidateInputs(true)
    setClickSubmit(clickSubmit + 1)
  }

  useEffect(() => {
    if (open) {
      setForm(note || NoteInit)
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
        <Typography variant='h4' textAlign={'center'}>
          {note ? 'Edit Note' : 'Create Note'}
        </Typography>
        <CustomInput
          required
          validateSubmit={validateInputs}
          label='Title'
          name='title'
          fullWidth
          value={form.title}
          onChange={handleChange}
        />
        <CustomInput
          required
          validateSubmit={validateInputs}
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
        {fieldsWithError > 0 && loadComponent > 1 && (
          <Typography variant='body1' color='error' sx={{ margitop: 1 }}>
            Some fields are empty
          </Typography>
        )}
        <Button variant='contained' color='error' onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={validateForm} variant='contained' color='success'>
          Save
        </Button>
      </DialogActions>
    </CustomDialog>
  )
}
