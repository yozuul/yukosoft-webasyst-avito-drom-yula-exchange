import { v4 as uuidv4 } from 'uuid';

import { UserModel, SettingsModel } from '../models'
import { tokenService, mailService } from './index'
import { AuthError } from '../exeptions'
import { HashPassword } from '../utils/database'

class Auth {
    // РЕГСИТРАЦИЯ
    async register(name, login, email, password) {
        console.log(name)
        // Ищем указанные данные в БД:
        // Ищем по email
        const isEmailExist = await UserModel.findOne({
            where: { email: email }
        })
        // Если находим, бросаем ошибку
        if (isEmailExist) {
            throw AuthError.BadRequest(`Пользователь с таким email уже зарегистрирован`)
        }
        // Если указан логин:
        if(login) {
            // Ищем по логину
            const isLoginExist = await UserModel.findOne({
                where: { login: login }
            })
            // Если находим, бросаем ошибку
            if (isLoginExist) {
                throw AuthError.BadRequest(`Пользователь с таким логином уже зарегистрирован`)
            }
        }
        // Если ничего не нашли:
        // Создаём запись в БД
        const activationLink = uuidv4()
        const newUser = await UserModel.create({
            name: name || null,
            login: login || null,
            email,
            password: HashPassword.encrypt(password),
            role_id: 2,
            activation_link: activationLink,
            status: true
        })
        const userData = newUser.toJSON()
        // Генерируем токены
        const authTokens = tokenService.generateAuthTokens(userData)
        await tokenService.saveAuthToken(userData.id, authTokens.refreshToken)
        // Отправляем ссылку на активацию
        // mailService.sendActivationMail(
        //     email, `${process.env.CLIENT_URL}/user/activate/url:${activationLink}`
        // )
        return {...authTokens, user: userData }
    }
    // Повторная отправка
    async resendActivationLink(email) {
        // Ищем email:
        const isUserExist = await UserModel.findOne({
            where: { email: email },
            attributes: ['activation_link']
        })
        // Если не находим, бросаем ошибку
        if (!isUserExist) {
            throw AuthError.BadRequest(`Пользователь с таким email не зарегистрирован`)
        }
        // // Отправляем ссылку на активацию
        mailService.sendActivationMail(
            email, `${process.env.CLIENT_URL}/user/activate/url:${isUserExist.activation_link}`
        )
        return { message: 'Ссылка на активацию аккаунта отправлена. Проверьте почтовый ящик' }
    }
    // АКТИВАЦИЯ АККАУНТА
    async activate(activationLink) {
        const user = await UserModel.findOne({
            where: { activation_link: activationLink }
        })
        if (!user) {
            throw AuthError.BadRequest('Неккоректная ссылка активации')
        }
        user.email_activated = true
        user.save()
        return { message: 'Email активирован' }
    }

    // АВТОРИЗАЦИЯ
    async login(login, password, method) {
        // Ищем пользователя по методу логина (email / login)
        const user = await UserModel.findOne({
            where: { [method]: login }
        })
        if(!user) {
            // Если не находим - бросаем ошибку
            const errMsg = { email: 'email', login: 'логином' }
            throw AuthError.BadRequest(`Пользователь с таким ${errMsg[method]} не зарегистрирован`)
        }
        if(!user.status) {
            throw AuthError.BadRequest(`Аккаунт заблокирован`)
        }
        if(!user.email_activated) {
            throw AuthError.BadRequest(`Подтвердите свой email`)
        }
        const userData = user.toJSON()
        // Если находим:
        // Проверяем пароль
        const isPassEquals = HashPassword.compare(password, userData.password);
        if (!isPassEquals) {
            throw AuthError.BadRequest('Неверный пароль');
        }
        // Генерируем токены
        const authTokens = tokenService.generateAuthTokens(userData);
        await tokenService.saveAuthToken(userData.id, authTokens.refreshToken);
        const settings = await SettingsModel.findOne({
            where: { id: 1 }
        })

        return {...authTokens, user: userData, settings: settings.dataValues}
    }
    // ВЫХОД
    async logout(refreshToken) {
        if(refreshToken) {
            const token = await tokenService.removeToken(refreshToken)
            return token
        }
    }
    // ОБНОВЛЕНИЕ ТОКЕНА
    async refresh(refreshToken) {
        // console.log(refreshToken)
        if (!refreshToken || refreshToken === 'undefined') {
            throw AuthError.UnauthorizedUser()
        }
        const decryptUser = tokenService.validateRefreshToken(refreshToken)
        const isTokenLive = await tokenService.findToken(refreshToken)
        if ((!decryptUser) || (!isTokenLive)) {
            throw AuthError.UnauthorizedUser()
        }

        const user = await UserModel.findOne({
            where: { id: decryptUser.id }
        })
        if(!user) throw AuthError.UnauthorizedUser()

        const foundedUser = user.toJSON()
        const tokens = tokenService.generateAuthTokens(foundedUser)
        await tokenService.saveAuthToken(foundedUser.id, tokens.refreshToken)
        return {...tokens, user: foundedUser}
    }
}

export const authService = new Auth()