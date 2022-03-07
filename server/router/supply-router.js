import { Router } from 'express'
import { SupplyController } from '../controllers'

const supplyRouter = new Router()

supplyRouter.get('/all', SupplyController.getAllSupplies)

export { supplyRouter }