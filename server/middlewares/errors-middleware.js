import { AuthError } from '../exeptions'
import { red } from 'ansicolor'

export const errorMiddleware = (err, req, res, next) => {
    if (err instanceof AuthError) {
        console.log((err.message).red)
        return res.status(err.status).json({ message: err.message, errors: err.errors })
    }
    if (err instanceof Error) {
        const isValidationError = err.errors[0]
        if(isValidationError.type === 'Validation error') {
            console.log((isValidationError.message).red)
            return res.status(419).json({ message: isValidationError.message, errors: [] })
        }
    }
    return res.status(500).json({ message: 'Непредвиденная ошибка модуля аутентификации' })
}