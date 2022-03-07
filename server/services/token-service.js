import jwt from 'jsonwebtoken'
import { TokenModel } from '../models'

class Token {
    generateAuthTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })
        return { accessToken, refreshToken }
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        } catch (err) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
        } catch (err) {
            return null
        }
    }

    async saveAuthToken(userId, refreshToken) {
        const authTokenData = await TokenModel.findOne({
            where: { user_id: userId }
        })
        if (authTokenData) {
            authTokenData.refresh_token = refreshToken
            return authTokenData.save()
        }
        TokenModel.create({
            refresh_token: refreshToken,
            user_id: userId
        })
    }

    async removeToken(refreshToken) {
        const tokenData = await TokenModel.findOne({
            where: { refresh_token: refreshToken }
        })
        tokenData.destroy()
        return tokenData
    }

    async findToken(refreshToken) {
        const tokenData = await TokenModel.findOne({
            where: { refresh_token: refreshToken }
        })
        return tokenData
    }
}

export const tokenService = new Token()