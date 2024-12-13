import { configDotenv } from 'dotenv'

configDotenv()

export default {
  port: process.env.PORT || 3001,
  mongodbConnectionUrl: process.env.MONGODB_CONNECTION_URL || '',
  frontendurl: process.env.FRONTEND_URL || 'http://localhost:3000',
}
