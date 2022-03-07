import { Router } from 'express'
import { AuthController } from '../controllers'

const authRouter = new Router()
authRouter.post('/register', AuthController.register)
authRouter.post('/login', AuthController.login)
authRouter.post('/activate', AuthController.activate)
authRouter.post('/resendActivationLink', AuthController.resendActivationLink)
authRouter.post('/logout', AuthController.logout)
authRouter.get('/refresh', AuthController.refresh)

export { authRouter }