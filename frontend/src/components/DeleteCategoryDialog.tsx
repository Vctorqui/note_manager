import { Box, Chip, Typography } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { useStore } from '../lib/store'
import { useEffect } from 'react'
import CustomDialog from './ui/CustomDialog'

interface CategoryDialogProps {
  open: boolean
  onClose: () => void
}

export const DeleteCategory = ({ open, onClose }: CategoryDialogProps) => {
  const { categories, fetchCategories, deleteCategory } = useStore()

  useEffect(() => {
    fetchCategories()
  }, [])

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
      <Box p={2}>
        <Typography variant='h4' textAlign={'center'}>
          Delete Category
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
          <Typography variant='body1' textAlign={'left'}>
            Categories Created:
          </Typography>
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
                  handleDeleteCategory(category?._id)
                }}
                sx={{ borderColor: category.color }}
                variant={'outlined'}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </CustomDialog>
  )
}
