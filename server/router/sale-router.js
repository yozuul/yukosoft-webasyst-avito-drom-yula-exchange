import { Router } from 'express'
import { SaleController } from '../controllers'

const saleRouter = new Router()

saleRouter.get('/all', SaleController.getPrices)

export { saleRouter }