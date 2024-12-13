import categoryModel from '../models/category.model.js'

// GET all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find({})
    res.send(categories)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET categories by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await categoryModel.findById(req.params.id)
    if (!category)
      return res.status(404).json({ message: 'Categoría no encontrada' })
    res.send(category)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// PUT create categories
export const createCategory = async (req, res) => {
  const { name, color } = req.body

  const newCategory = new categoryModel({
    name,
    color,
  })

  try {
    const savedCategory = await newCategory.save()
    res.send(savedCategory)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// DELETE categories by ID
export const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await categoryModel.findByIdAndDelete(req.params.id)
    if (!deletedCategory)
      return res.status(404).json({ message: 'Categoria no encontrada' })
    res.send(deletedCategory)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
