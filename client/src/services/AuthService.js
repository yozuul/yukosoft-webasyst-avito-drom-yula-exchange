import axios from 'axios'
import { $account, BASE_URL } from '../http'

export class AuthService {
    static async login(authData) {
        let method = 'login'
        const { login, password } = authData
        if(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(login)) {
            method = 'email'
        }
        return await $account.post('/login', {
            login, password, method
        })
    }
    static async register(regData) {
        return await $account.post('/register', regData)
    }
    static async resendActivationLink(userEmail) {
        return await $account.post('/resendActivationLink', userEmail)
    }
    static async activate(activationLink) {
        return await $account.post('/activate', activationLink)
    }
    static async logout() {
        return await $account.post('/logout')
    }
    static async checkAuth() {
        try {
            const response = await axios.get(`${BASE_URL}/account/refresh`, { withCredentials: true })
            return response
        } catch (e) {
            console.log(e.response?.data?.message)
            return e.response
        }
    }
}