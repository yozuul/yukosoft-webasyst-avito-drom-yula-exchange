import { UserModel, ProductModel, Items, SettingsModel } from '../models'
import { tokenService } from './token-service'
import { Op } from '../utils/database'
import { AuthError } from '../exeptions'
import { HashPassword } from '../utils/database'
import { products } from '../http'
import { v4 as uuidv4 } from 'uuid'

export class productService {
    static async getAllProducts(refreshToken) {
        const existProducts = await Items.findAll({
            where: {
                ItemArrivalID: { [Op.ne]: null },
                Discarded: false,
                ItemSaleID: null
            }
        })

        return existProducts
    }
    static async getProductDetail(id) {
        const product = await ProductModel.findOne({
            where: { id: id }
        })
        // console.log(product)
        return product
    }

    static async updateProduct(data) {

        const updatedText = data.productText
        const textReplace = updatedText.replace(/\n/g, '<br />')
        data.productText = textReplace ? `<p>${textReplace}</p>` : null

        const product = await ProductModel.findOne({
            where: { id: data.id }
        })
        if(!product) {
            ProductModel.create({
                id: parseInt(data.id),
                avito: data.avito,
                drom: data.drom,
                yula: data.yula,
                text: data.productText
            })
        }
        if(product) {
            product.text = data.productText
            product.avito = data.avito
            product.drom = data.drom
            product.yula = data.yula
            product.save()
        }

        const settings = await SettingsModel.findOne({
            where: { id: 1 }
        })
        settings.products_settings_changed += `${data.id}|`
        settings.save()
        return { message: 'Объявление обновлено' }
    }
}