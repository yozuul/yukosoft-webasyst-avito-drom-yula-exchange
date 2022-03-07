import { productService } from '../services'

export class ProductController {
    static async getAllProducts(req, res, next) {
        try {
            const refreshToken = req.cookies.refreshToken
            const products = await productService.getAllProducts(refreshToken)
            return res.json(products)
        } catch (err) {
            next(err)
        }
    }
    static async getProductDetail(req, res, next) {
        try {
            const productsID = parseInt(req.params.link)
            const userProfile = await productService.getProductDetail(productsID)
            return res.json(userProfile)
        } catch (err) {
            next(err)
        }
    }
    static async updateProduct(req, res, next) {
        try {
            const data = req.body
            const settings = await productService.updateProduct(data)
            return res.json(settings)
        } catch (err) {
            next(err)
        }
    }
}