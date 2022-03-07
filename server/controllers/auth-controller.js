import { authService } from '../services'

export class AuthController {
    static async register(req, res, next) {
        try {
            // Если всё ок, регаем и сохраняем рефреш токен в куки
            const { name, login, email, password } = req.body
            const userData = await authService.register(name, login, email, password)
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true
            })
            return res.json(userData)
        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        try {
            const { login, password, method } = req.body
            const userData = await authService.login(login, password, method)
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true
            })
            return res.json(userData)
        } catch (err) {
            next(err)
        }
    }

    static async activate(req, res, next) {
        try {
            const userData = await authService.activate(req.body.url)
            return res.json(userData)
        } catch (err) {
            next(err)
        }
    }

    static async resendActivationLink(req, res, next) {
        try {
            const userData = await authService.resendActivationLink(req.body.email)
            return res.json(userData)
        } catch (err) {
            next(err)
        }
    }

    static async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            // console.log(refreshToken)
            const token = await authService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (err) {
            next(err)
        }
    }

    static async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const userData = await authService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true
            })
            return res.json(userData)
        } catch (err) {
            next(err)
        }
    }
}