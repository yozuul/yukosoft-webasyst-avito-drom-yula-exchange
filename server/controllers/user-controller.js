import { userService } from '../services'

export class UserController {
    static async getAllUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers()
            return res.json(users)
        } catch (err) {
            next(err)
        }
    }
    static async getPrices(req, res, next) {
        try {
            const products = await userService.getAllProducts(req.cookies.refreshToken)
            return res.json(products)
        } catch (err) {
            next(err)
        }
    }
    static async getUserProfile(req, res, next) {
        try {
            const userID = parseInt(req.params.link)
            const userProfile = await userService.getUserProfile(userID)
            return res.json(userProfile)
        } catch (err) {
            next(err)
        }
    }
    static async deleteUserProfile(req, res, next) {
        try {
            const userID = req.body.id
            const userProfile = await userService.deleteUserProfile(userID)
            return res.json(userProfile)
        } catch (err) {
            next(err)
        }
    }
    static async updateUserProfile(req, res, next) {
        try {
            const data = req.body
            const userProfile = await userService.updateUserProfile(data)
            return res.json(userProfile)
        } catch (err) {
            next(err)
        }
    }
    static async updateSettings(req, res, next) {
        try {
            const data = req.body
            const settings = await userService.updateSettings(data)
            return res.json(settings)
        } catch (err) {
            next(err)
        }
    }
}
