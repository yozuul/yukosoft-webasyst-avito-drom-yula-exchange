import { AuthError } from '../exeptions'
import { tokenService } from '../services'

export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        // console.log(req.headers)
        if(!authHeader) {
            return next (AuthError.UnauthorizedUser())
        }
        const accessToken = authHeader.split(' ')[1]
        if(!accessToken) {
            return next (AuthError.UnauthorizedUser())
        }
        const userData = tokenService.validateAccessToken(accessToken)
        if(!userData) {
            return next (AuthError.UnauthorizedUser())
        }
        req.user = userData
        next()
    } catch (err) {
        return next (AuthError.UnauthorizedUser())
    }
}