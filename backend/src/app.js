import express from 'express'
import cors from 'cors'
import noteRouter from './routes/note.routes.js'
import categoryRouter from './routes/category.routes.js'
import config from './config.js'

const app = express()

// CORS configuration
app.use(
  cors({
    credentiales: true,
    origin: config.frontendurl,
  })
)

app.use(express.json())
app.use('/api', noteRouter)
app.use('/api', categoryRouter)

export default app
