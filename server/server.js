import {} from 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { darkGray, red } from 'ansicolor'

import { authRouter, userRouter, productRouter, saleRouter, supplyRouter  } from './router'

import { errorMiddleware } from './middlewares'

const PORT = process.env.API_PORT
const app = express()

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(express.json())
app.use(cookieParser())
app.use('/account', authRouter)
app.use('/users', userRouter)
app.use('/products', productRouter)
app.use('/sales', saleRouter)
app.use('/supplies', supplyRouter)
app.use(errorMiddleware)

const startServer = async () => {
    try {
        app.listen(PORT, () => {
            console.log((`Сервер запущен на порту ${PORT}`).darkGray)
        })
    } catch (err) {
        console.log(err)
        console.log(('Ошибка запуска сервера').red);
    }
}

startServer()