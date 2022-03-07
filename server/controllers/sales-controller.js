import { saleService } from '../services'

export class SaleController {
    static async getPrices(req, res, next) {
        try {
            const products = await saleService.getPrices(req.cookies.refreshToken)
            return res.json(products)
        } catch (err) {
            next(err)
        }
    }
}