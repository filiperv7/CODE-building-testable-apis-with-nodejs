import config from 'config'
import mongoose from 'mongoose'

const mongodbUrl = config.get('database.mongoUrl')

const connect = () =>
  mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

export default {
  connect,
  connection: mongoose.connection
}
