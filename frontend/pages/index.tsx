import { useEffect, useState } from 'react'
import {
  Container,
  Typography,
  Button,
  Box,
  Tabs,
  Tab,
  Grid2,
  Chip,
} from '@mui/material'
import { Add, Delete, Label } from '@mui/icons-material'
import {
  deleteNote,
  getApiNotes,
  updateNote,
} from '@/src/services/notesService'
import { NoteCard } from '@/src/components/NoteCard'
import { NoteDialog } from '@/src/components/NoteDialog'
import { Note } from '@/src/types/types'
import { enqueueSnackbar } from 'notistack'
import { CategoryDialog } from '@/src/components/CategoryDialog'
import { useStore } from '@/src/lib/store'
import theme from '@/theme/theme'
import { DeleteCategory } from '@/src/components/DeleteCategoryDialog'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`notes-tabpanel-${index}`}
      aria-labelledby={`notes-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  )
}

export default function Home() {
  const [tabValue, setTabValue] = useState(0)
  const [createdNote, setCreatedNote] = useState<Note[]>([])
  const [openNoteDialog, setOpenNoteDialog] = useState(false)
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false)
  const [openDeleteCategory, setOpenDeleteCategory] = useState(false)
  const [editNote, setEditNote] = useState<Note | undefined>(undefined)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const { categories, fetchCategories } = useStore()

  useEffect(() => {
    fetchCategories()
  }, [])

  async function getNotes() {
    const notes = await getApiNotes()
    setCreatedNote(notes)
  }

  useEffect(() => {
    getNotes()
  }, [])

  const handleOnCreate = async (newNote: Note) => {
    setCreatedNote((prevNotes) => [...prevNotes, newNote])
  }

  const handleOnUpdate = async (updatedNote: Note) => {
    setCreatedNote((prevNotes) =>
      prevNotes.map((note) =>
        note._id === updatedNote._id ? updatedNote : note
      )
    )
  }

  const handleOnDelete = async (id: string) => {
    try {
      await deleteNote(id)
      setCreatedNote((prevNotes) => prevNotes.filter((note) => note._id !== id))
      enqueueSnackbar('Note Deleted Successfully', { variant: 'success' })
    } catch (error) {
      console.error(error)
    }
  }

  async function handleArchive(id: string, note: Note) {
    try {
      const updatedNote = { ...note, isArchived: !note.isArchived }
      await updateNote(id, updatedNote)
      setCreatedNote((prevNotes) =>
        prevNotes.map((n) => (n._id === note._id ? updatedNote : n))
      )
      enqueueSnackbar(
        `Note ${note.isArchived ? 'unarchived' : 'archived'} successfully`,
        { variant: 'success' }
      )
    } catch (error) {
      console.error('Error updating note:', error)
      enqueueSnackbar('Failed to update the note', { variant: 'error' })
    }
  }

  const activeNotes = createdNote.filter((note) => !note.isArchived)
  const archivedNotes = createdNote.filter((note) => note.isArchived)

  const filteredActiveNotes = selectedCategory
    ? activeNotes.filter((note) =>
        note.categories.some(
          (category) =>
            (typeof category === 'string' && category === selectedCategory) ||
            (typeof category !== 'string' && category._id === selectedCategory)
        )
      )
    : activeNotes

  const filteredArchivedNotes = selectedCategory
    ? archivedNotes.filter((note) =>
        note.categories.some(
          (category) =>
            (typeof category === 'string' && category === selectedCategory) ||
            (typeof category !== 'string' && category._id === selectedCategory)
        )
      )
    : archivedNotes

  const handleAddCategory = async () => {
    await fetchCategories()
  }

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Box
        sx={{
          mb: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            gap: '20px',
          },
        }}
      >
        <Typography variant='h4' component='h1'>
          Notes App
        </Typography>
        <Box
          display={'flex'}
          gap={1}
          sx={{
            [theme.breakpoints.down('sm')]: {
              flexDirection: 'column',
            },
          }}
        >
          <Button
            variant='outlined'
            startIcon={<Delete />}
            onClick={() => setOpenDeleteCategory(true)}
          >
            Delete Category
          </Button>
          <Button
            variant='outlined'
            startIcon={<Label />}
            onClick={() => setOpenCategoryDialog(true)}
          >
            Add Category
          </Button>
          <Button
            variant='contained'
            startIcon={<Add />}
            onClick={() => setOpenNoteDialog(true)}
          >
            New Note
          </Button>
        </Box>
      </Box>
      <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Chip
          label='All'
          onClick={() => setSelectedCategory(null)}
          color={selectedCategory === null ? 'primary' : 'default'}
          variant={selectedCategory === null ? 'filled' : 'outlined'}
        />
        {categories.map((category, index) => (
          <Chip
            key={category._id + index}
            label={category.name}
            onClick={() => setSelectedCategory(category._id)}
            color={selectedCategory === category._id ? 'primary' : 'default'}
            variant={selectedCategory === category._id ? 'filled' : 'outlined'}
            sx={{ borderColor: category.color }}
          />
        ))}
      </Box>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={(_, newValue) => setTabValue(newValue)}
          >
            <Tab label='Active Notes' />
            <Tab label='Archived Notes' />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
          <Grid2 container spacing={2}>
            {filteredActiveNotes.map((note, index) => (
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={note._id + index}>
                <NoteCard
                  note={note}
                  onEdit={() => {
                    setEditNote(note)
                    setOpenNoteDialog(true)
                  }}
                  onDelete={() => handleOnDelete(note._id)}
                  onArchive={() => handleArchive(note._id, note)}
                />
              </Grid2>
            ))}
          </Grid2>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Grid2 container spacing={2}>
            {filteredArchivedNotes.map((note, index) => (
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={note._id + index}>
                <NoteCard
                  note={note}
                  onEdit={() => {
                    setEditNote(note)
                    setOpenNoteDialog(true)
                  }}
                  onDelete={() => handleOnDelete(note._id)}
                  onArchive={() => handleArchive(note._id, note)}
                />
              </Grid2>
            ))}
          </Grid2>
        </TabPanel>
      </Box>
      <NoteDialog
        open={openNoteDialog}
        onClose={() => {
          setOpenNoteDialog(false)
          setEditNote(undefined)
        }}
        onCreate={handleOnCreate}
        onUpdate={handleOnUpdate}
        note={editNote}
      />

      <CategoryDialog
        open={openCategoryDialog}
        onClose={() => {
          setOpenCategoryDialog(false)
        }}
        onCreate={handleAddCategory}
      />

      <DeleteCategory
        open={openDeleteCategory}
        onClose={() => {
          setOpenDeleteCategory(false)
        }}
      />
    </Container>
  )
}
