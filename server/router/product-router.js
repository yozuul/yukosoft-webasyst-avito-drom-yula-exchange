import { Router } from 'express'
import { ProductController } from '../controllers'

const productRouter = new Router()

productRouter.get('/all', ProductController.getAllProducts)
productRouter.get('/products/:link', ProductController.getProductDetail)
productRouter.post('/update', ProductController.updateProduct)

export { productRouter }