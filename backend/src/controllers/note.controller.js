import notesModel from '../models/notes.model.js'

// Obtener todas las notas
export const getNotes = async (req, res) => {
  try {
    const notes = await notesModel.find({}).populate('categories', 'name color')
    // res.status(200).json(notes)
    res.send(notes)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Crear una nueva nota
export const createNote = async (req, res) => {
  const { title, content, categories } = req.body

  const newNote = new notesModel({
    title,
    content,
    categories,
  })

  try {
    const savedNote = await newNote.save()
    res.send(savedNote)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Obtener una nota por ID
export const getNoteById = async (req, res) => {
  try {
    const note = await notesModel.findById(req.params.id)
    if (!note) return res.status(404).json({ message: 'Nota no encontrada' })
    res.send(note)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Actualizar una nota por ID
export const updateNote = async (req, res) => {
  try {
    const updatedNote = await notesModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    )
    if (!updatedNote)
      return res.status(404).json({ message: 'Nota no encontrada' })
    res.send(updatedNote)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Eliminar una nota por ID
export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await notesModel.findByIdAndDelete(req.params.id)
    if (!deletedNote)
      return res.status(404).json({ message: 'Nota no encontrada' })
    res.send(deletedNote)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
