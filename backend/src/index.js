import app from './app.js'
import config from './config.js'
import { connectionDb } from './db.js'

connectionDb()

app.listen(config.port, () => {
  console.log(`listenig on port ${config.port}`)
})
