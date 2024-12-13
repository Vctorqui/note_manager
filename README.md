# Note Manager

Note Manager is an application designed to efficiently manage notes and categories. It allows you to create, edit, and delete notes, filter them by categories, and easily manage categories.

## Technologies Used

### Frontend:

- **Next.js**
- **TypeScript**
- **Material UI**
- **Zustand**

### Backend:

- **Express.js**
- **Node.js**
- **MongoDB Atlas**
- **JavaScript**

## Main Features

- Create, edit, and delete notes.
- Filter notes by category.
- Create, add, and delete categories.
- Intuitive interface and responsive design.

## API Reference

### Notes

#### Get all notes

- **Method:** GET
- **Endpoint:** `/api/notes`
- **Description:** Returns a list of all notes.

#### Create a note

- **Method:** POST
- **Endpoint:** `/api/notes`
- **Description:** Creates a new note.
- **Required Body:**
  ```json
  {
    "title": "string",
    "content": "string",
    "categoryId": "string"
  }
  ```
  | Parameter    | Type     | Description                               |
  | :----------- | :------- | :---------------------------------------- |
  | `title`      | `string` | **Required**. Title of the note.          |
  | `content`    | `string` | **Required**. Content of the note.        |
  | `categoryId` | `string` | **Required**. ID of the related category. |

#### Update a note

- **Method:** PUT
- **Endpoint:** `/api/notes/:id`
- **Description:** Updates an existing note.
- **Requirements:**
  - **ID:** Required in the URL.
  - **Body:** Required.
  ```json
  {
    "title": "string",
    "content": "string",
    "categoryId": "string"
  }
  ```
  | Parameter    | Type     | Description                                |
  | :----------- | :------- | :----------------------------------------- |
  | `id`         | `string` | **Required**. ID of the note to update.    |
  | `title`      | `string` | **Optional**. Updated title of the note.   |
  | `content`    | `string` | **Optional**. Updated content of the note. |
  | `categoryId` | `string` | **Optional**. Updated category ID.         |

#### Delete a note

- **Method:** DELETE
- **Endpoint:** `/api/notes/:id`
- **Description:** Deletes a note.
- **Requirements:**
- **ID:** Required in the URL.

  | Parameter | Type     | Description                             |
  | :-------- | :------- | :-------------------------------------- |
  | `id`      | `string` | **Required**. ID of the note to delete. |

### Categories

#### Get all categories

- **Method:** GET
- **Endpoint:** `/api/categories`
- **Description:** Returns a list of all categories.

#### Create a category

- **Method:** POST
- **Endpoint:** `/api/categories`
- **Description:** Creates a new category.
- **Required Body:**
  ```json
  {
    "name": "string"
  }
  ```
  | Parameter | Type     | Description                         |
  | :-------- | :------- | :---------------------------------- |
  | `name`    | `string` | **Required**. Name of the category. |

#### Delete a category

- **Method:** DELETE
- **Endpoint:** `/api/categories/:id`
- **Description:** Deletes a category.
- **Requirements:**
- **ID:** Required in the URL.

  | Parameter | Type     | Description                                 |
  | :-------- | :------- | :------------------------------------------ |
  | `id`      | `string` | **Required**. ID of the category to delete. |

## Usage / Examples

### Zustand Example: Global State Management for Categories

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Category } from '../types/types'
import { deleteApiCategory, getApiCategories } from '@/services/categoryService'

interface CategoryState {
  categories: Category[]
  fetchCategories: () => Promise<void>
  deleteCategory: (categoryId: string) => Promise<void>
}

export const useStore = create<CategoryState>()(
  persist(
    (set) => ({
      categories: [],
      fetchCategories: async () => {
        const categories = await getApiCategories()
        set({ categories })
      },
      deleteCategory: async (categoryId: string) => {
        await deleteApiCategory(categoryId)
        set((state) => ({
          categories: state.categories.filter(
            (category) => category._id !== categoryId
          ),
        }))
      },
    }),
    {
      name: 'category-storage',
    }
  )
)
```

### Material UI Example: Stylized Input Component

```typescript
import { FormControl, TextField, styled } from '@mui/material'

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}))

export const StylizedInput = ({ label, value, onChange }) => (
  <StyledFormControl fullWidth>
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      variant='outlined'
    />
  </StyledFormControl>
)
```

### Next.js API Route Example

```typescript
// pages/api/categories.ts
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    // Fetch categories logic here
    res.status(200).json({ categories: [] })
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
```

### Example cURL Commands

#### Create a note

```bash
curl -X POST http://localhost:3000/api/notes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My first note",
    "content": "This is the content of my note",
    "categoryId": "64a3bc2ef"
  }'
```

#### Get all notes

```bash
curl -X GET http://localhost:3000/api/notes
```

#### Update a note

```bash
curl -X PUT http://localhost:3000/api/notes/64a3bc2ef \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated note",
    "content": "Updated content",
    "categoryId": "64a3bc2ef"
  }'
```

#### Delete a note

```bash
curl -X DELETE http://localhost:3000/api/notes/64a3bc2ef
```

## Features

- **Note Management:**
  - Create, edit, and delete notes.
  - Filter notes by category.
- **Category Management:**
  - Create new categories.
  - Delete categories.
  - Assign categories to notes.
- **User Interface:**
  - Responsive design for all screen sizes.
  - Intuitive and easy-to-use interface.

## Authors

- **Víctor Quiñones**

---

> Note: The installation section will be added later once the Bash installation command is defined.
