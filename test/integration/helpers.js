import chai from 'chai'
import supertest from 'supertest'
import setupApp from '../../src/app.js'

global.setupApp = setupApp
global.supertest = supertest
global.expect = chai.expect
