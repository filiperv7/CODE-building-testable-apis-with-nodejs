import bodyParser from 'body-parser'
import express from 'express'
import database from './database'
import routes from './routes'

const app = express()

const configureExpress = () => {
  app.use(bodyParser.json())
  app.use('/', routes)
  app.database = database

  return app
}

export default async () => {
  const app = configureExpress()
  await app.database.connect()

  return app
}
