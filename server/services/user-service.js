import { UserModel, SettingsModel } from '../models'
import { tokenService } from '.'
import { Op } from '../utils/database'
import { AuthError } from '../exeptions'
import { HashPassword } from '../utils/database'
import { products, api } from '../http'
import { v4 as uuidv4 } from 'uuid'

export class userService {
    static async getAllUsers() {
        const allUsers = await UserModel.findAll({
            raw : true
        })
        return allUsers
    }

    static async getUserProfile(id) {
        const user = await UserModel.findOne({
            where: { id: id }
        })
        return user
    }

    static async deleteUserProfile(id) {
        const user = await UserModel.findOne({
            where: { id: id }
        })
        user.destroy()
        return user
    }

    static async updateSettings(data) {
        const settings = await SettingsModel.findOne({
            where: { id: 1 }
        })

        const updatedText = data.defaultText
        const textReplace = updatedText.replace(/\n/g, '<br />')

        settings.avito_min_price = parseInt(data.avitoMinPrice)
        settings.default_text = `<p>${textReplace}</p>`
        settings.global_settings_changed = true
        settings.save()
        return { message: 'Настройки сохранены' }
    }

    static async updateUserProfile(userData) {
        let profileData = userData
        if(userData.userProfile) { profileData = userData.userProfile }
        const { id, name, login, email, password } = profileData

        const user = await UserModel.findOne({
            where: { id: id }
        })
        if(!userData.rootOwner) {
            const isPassEquals = HashPassword.compare(password, user.password);
            if (!isPassEquals) {
                throw AuthError.BadRequest('Неверный пароль');
            }
        }
        const isEmail = await UserModel.findOne({
            where: {
                email: email,
                id: { [Op.ne]: id }
            },
        })
        const isLogin = await UserModel.findOne({
            where: {
                login: login,
                id: { [Op.ne]: id }
            }
        })
        if((!isEmail) && (!isLogin)) {
            user.name = name
            user.login = login
            user.email = email
            user.save()
        } else {
            if(isEmail) throw AuthError.BadRequest('Пользователь с таким email уже зарегистрирован')
            if(isLogin) throw AuthError.BadRequest('Пользователь с таким логином уже зарегистрирован')
        }
        return { message: 'Профиль обновлён' }
    }
}