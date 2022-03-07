import { UserModel } from '../models'
import { tokenService } from '.'
import { Op } from '../utils/database'
import { AuthError } from '../exeptions'
import { HashPassword } from '../utils/database'
import { products } from '../http'
import { v4 as uuidv4 } from 'uuid'

export class supplyService {
    static async getAllSupplies(refreshToken) {
        console.log(refreshToken)
        const { user_id } = await tokenService.findToken(refreshToken)
        const user = await UserModel.findOne({
            where: { id: user_id }
        })
        const bodyReq = {
            id: uuidv4(),
            jsonrpc: "2.0",
            params: {
                filter: {
                    order: {
                        column: "createdAt",
                        order: "desc"
                    }
                },
                query: {
                    limit: 99999999,
                    offset: 0
                }
            }
        }

        const attachToken = await products(user.apiToken)
        const productList = await attachToken.$card.post('/list', bodyReq)
        return productList.data.result.cards
    }
}