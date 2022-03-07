export class AuthError extends Error {
    constructor(status, message, errors = []) {
        super(message)
        this.status = status
        this.errors = errors
    }
    static UnauthorizedUser() {
        return new AuthError(401, 'Пользователь не авторизован')
    }
    static BadRequest(message, errors = []) {
        return new AuthError(400, message, errors)
    }
}