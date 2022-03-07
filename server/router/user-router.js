import { Router } from 'express'
import { UserController } from '../controllers'

const userRouter = new Router()

userRouter.get('/all', UserController.getAllUsers)
userRouter.get('/profile/:link', UserController.getUserProfile)
userRouter.post('/updateProfile', UserController.updateUserProfile)
userRouter.post('/deleteProfile', UserController.deleteUserProfile)
userRouter.post('/updateSettings', UserController.updateSettings)

export { userRouter }