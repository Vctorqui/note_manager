import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Chip,
} from '@mui/material'
import CustomDialog from './ui/CustomDialog'
import { Category } from '../types/types'
import { CategoryInit } from '../lib/const'
import { createCategory } from '@/services/categoryService'
import { MuiColorInput } from 'mui-color-input'
import { useStore } from '../lib/store'
import { enqueueSnackbar } from 'notistack'

interface CategoryDialogProps {
  open: boolean
  onClose: () => void
  onCreate: (category: Category) => void
}

export function CategoryDialog({
  open,
  onClose,
  onCreate,
}: CategoryDialogProps) {
  const [form, setForm] = useState(CategoryInit)
  const { categories, fetchCategories, deleteCategory } = useStore()

  const handleChange = (event: any) => {
    let { name, value } = event.target
    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleColorChange = (color: string) => {
    setForm({
      ...form,
      color, // Actualiza solo el campo `color` del formulario
    })
  }

  const handleAccept = async () => {
    try {
      const data = await createCategory(form)
      onCreate(data)
      handleClose() // Cierra y limpia
    } catch (error) {
      console.log(error)
    }
  }

  const handleClose = () => {
    setForm(CategoryInit) // Reinicia el formulario
    onClose() // Cierra y limpia
  }

  useEffect(() => {
    if (open) {
      setForm(CategoryInit) // Limpia el formulario al abrir el diálogo
    }
    fetchCategories()
  }, [open])

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      await deleteCategory(categoryId)
      enqueueSnackbar('Category deleted successfully', { variant: 'success' })
    } catch (error) {
      console.error('Error deleting category:', error)
      enqueueSnackbar('Failed to delete category', { variant: 'error' })
    }
  }

  return (
    <CustomDialog open={open} onClose={onClose}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
        <Typography>Create Category</Typography>
        <TextField
          label='Category Name'
          name='name'
          fullWidth
          value={form.name}
          onChange={handleChange}
        />
        <MuiColorInput
          fullWidth
          name='color'
          label='Category Color'
          value={form.color}
          onChange={handleColorChange}
        />

        <Typography>Delete Category</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          {categories.map((category, index) => (
            <Chip
              key={category._id + index}
              label={category.name}
              onDelete={() => {
                handleDeleteCategory(category?._id), handleClose()
              }}
              sx={{ borderColor: category.color }}
              variant={'outlined'}
            />
          ))}
        </Box>
      </Box>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAccept} variant='contained'>
          Save
        </Button>
      </DialogActions>
    </CustomDialog>
  )
}

{
  /* <TextField
          label='Category Color'
          name='color'
          type='color'
          fullWidth
          multiline
          value={form.color}
          onChange={handleChange}
          sx={{ '& input': { height: 50 } }}
        /> */
}
