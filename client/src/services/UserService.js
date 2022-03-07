import { $users } from '../http'

export class UserService {
    static async fetchUsers() {
        return $users.get('/all')
    }
    static getUserProfile(id) {
        return $users.get(`/profile/${id}`)
    }
    static updateUserProfile(userData) {
        return $users.post('/updateProfile', userData)
    }
    static updateSettings(settingsData) {
        return $users.post('/updateSettings', settingsData)
    }
    static deleteUserProfile(userData) {
        return $users.post('/deleteProfile', userData)
    }
}