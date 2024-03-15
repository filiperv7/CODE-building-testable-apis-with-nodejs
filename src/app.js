import bodyParser from 'body-parser'
import express from 'express'
import acl from 'express-acl'
import database from './database'
import authMidleware from './middlewares/auth'
import routes from './routes'

const app = express()

acl.config({
  baseUrl: '/',
  path: 'config'
})

const configureExpress = () => {
  app.use(bodyParser.json())
  app.use(authMidleware)
  app.use(acl.authorize.unless({ path: ['/users/authenticate'] }))

  app.use('/', routes)
  app.database = database

  return app
}

export default async () => {
  const app = configureExpress()
  await app.database.connect()

  return app
}
