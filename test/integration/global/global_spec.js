import supertest from 'supertest'
import setupApp from '../../../src/app.js'

before(async () => {
  const app = await setupApp()
  global.app = app
  global.request = supertest(app)
})

after(async () => await app.database.connection.close())
