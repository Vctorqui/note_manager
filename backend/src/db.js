import mongoose from 'mongoose'
import config from './config.js'

export const connectionDb = async () => {
  try {
    await mongoose.connect(config.mongodbConnectionUrl)
    console.log('connected to db')
  } catch (error) {
    console.error(error)
  }
}
