import { supplyService } from '../services'

export class SupplyController {
    static async getAllSupplies(req, res, next) {
        try {
            console.log(req.cookies.refreshToken)
            const supplies = await supplyService.getAllSupplies(req.cookies.refreshToken)
            return res.json(supplies)
        } catch (err) {
            next(err)
        }
    }
}