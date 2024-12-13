import { format } from 'date-fns'
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  Chip,
} from '@mui/material'
import { Archive, Unarchive, Delete, Edit } from '@mui/icons-material'
import { Category, Note } from '../types/types'
import { useStore } from '../lib/store'

interface NoteCardProps {
  note: Note
  onEdit: () => void
  onDelete: () => void
  onArchive: () => void
}

export function NoteCard({ note, onDelete, onEdit, onArchive }: NoteCardProps) {
  const { categories } = useStore()
  return (
    <Card variant='outlined'>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          {note.title}
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
          {note.content}
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1 }}>
          {note.categories.map((category) => {
            const categoryObject =
              typeof category === 'string'
                ? categories.find((cat) => cat._id === category)
                : (category as Category)

            if (!categoryObject) {
              // Si no hay una categoría válida, no retorna nada (no muestra el Chip)
              return null
            }

            const label = categoryObject.name
            const color = categoryObject.color

            const key = `${categoryObject._id}-${note._id}`

            return (
              <Chip
                key={key}
                label={label}
                size='small'
                variant='outlined'
                sx={{ borderColor: color }}
              />
            )
          })}
        </Box>
        <Typography variant='caption' color='text.secondary'>
          Last updated: {format(new Date(note.updatedAt), 'PPp')}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={onArchive} size='small'>
          {note.isArchived ? <Unarchive /> : <Archive />}
        </IconButton>
        <IconButton onClick={onEdit} size='small'>
          <Edit />
        </IconButton>
        <IconButton onClick={onDelete} size='small'>
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  )
}

// const label =
//   typeof category === 'string'
//     ? category
//     : (category as Category).name // Verifica si es string o un objeto
// const color =
//   typeof category === 'string'
//     ? category
//     : (category as Category).color // Verifica si es string o un objeto

// key={typeof category === 'string' ? category : category.name}
