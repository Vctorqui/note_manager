import { useEffect, useState } from 'react'
import { DialogActions, Button, Box, Typography } from '@mui/material'
import CustomDialog from './ui/CustomDialog'
import { Category } from '../types/types'
import { CategoryInit } from '../lib/const'
import { createCategory } from '@/src/services/categoryService'
import { MuiColorInput } from 'mui-color-input'
import { enqueueSnackbar } from 'notistack'
import CustomInput from './ui/CustomInput'

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
  const [loadComponent, setLoadComponent] = useState(0)
  const [clickSubmit, setClickSubmit] = useState<number>(0)
  const [fieldsWithError, setFieldsWithError] = useState(0)
  const [validateInputs, setValidateInputs] = useState(false)

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
      color,
    })
  }

  const handleAccept = async () => {
    try {
      const data = await createCategory(form)
      onCreate(data)
      handleClose()
      enqueueSnackbar('Category Created Successfully', {
        variant: 'success',
      })
    } catch (error) {
      console.log(error)
      enqueueSnackbar('Failed to created the category', { variant: 'error' })
    }
  }

  const handleClose = () => {
    setForm(CategoryInit)
    onClose()
  }

  useEffect(() => {
    if (open) {
      setForm(CategoryInit)
    }
  }, [open])

  return (
    <CustomDialog open={open} onClose={onClose}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
        <Typography variant='h4' textAlign={'center'}>
          Create Category
        </Typography>
        <CustomInput
          required
          validateSubmit={validateInputs}
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
      </Box>
      <DialogActions>
        {fieldsWithError > 0 && loadComponent > 1 && (
          <Typography variant='body1' color='error' sx={{ margitop: 1 }}>
            Some fields are empty
          </Typography>
        )}
        <Button variant='contained' color='error' onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={validateForm} variant='contained' color='success'>
          Save
        </Button>
      </DialogActions>
    </CustomDialog>
  )
}
