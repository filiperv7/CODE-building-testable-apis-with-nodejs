import bcrypt from 'bcrypt'
import config from 'config'
import jwt from 'jsonwebtoken'
import sinon from 'sinon'
import Util from 'util'
import AuthService from '../../../src/services/auth'

const hashAsync = Util.promisify(bcrypt.hash)

describe('Service: Auth', () => {
  context('authenticate', () => {
    it('should authenticate an user', async () => {
      const fakeUserModel = {
        findOne: sinon.stub()
      }
      const user = {
        name: 'Jhon Doe',
        email: 'jhondoe@mail.com',
        password: '12345',
        role: 'admin'
      }

      const authService = new AuthService(fakeUserModel)

      const hashedPassword = await hashAsync('12345', 10)
      const userFromDatabase = {
        ...user,
        password: hashedPassword
      }

      fakeUserModel.findOne
        .withArgs({ email: 'jhondoe@mail.com' })
        .resolves(userFromDatabase)

      const res = await authService.authenticate(user)

      expect(res).to.eql(userFromDatabase)
    })
  })

  context('generateToken', () => {
    it('should generate a JWT token a payload', () => {
      const payload = {
        name: 'John',
        email: 'jhondoe@mail.com',
        password: '12345'
      }

      const expectedToken = jwt.sign(payload, config.get('auth.key'), {
        expiresIn: config.get('auth.tokenExpiresIn')
      })

      const generatedToken = AuthService.generateToken(payload)
      expect(generatedToken).to.eql(expectedToken)
    })
  })

  it('should return false when the password does not match', async () => {
    const user = {
      email: 'jhondoe@mail.com',
      password: '12345'
    }

    const fakeUserModel = {
      findOne: sinon.stub()
    }

    fakeUserModel.findOne.resolves({
      email: user.email,
      password: 'aFakeHAsedPassword'
    })

    const authService = new AuthService(fakeUserModel)
    const response = await authService.authenticate(user)

    expect(response).to.be.false
  })
})
