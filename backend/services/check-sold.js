import { green, darkGray, red, yellow } from 'ansicolor'

import { Items, ShopProduct, Record } from '../models'
import { Op } from '../utils'
import { DeleteProducts } from './index'

class CheckSold {

   async getData() {
      console.log(('Проверяем новые товары...').green)
      // Получаем товары из магазина
      const existProducts = await Record.findAll({
         table: ShopProduct
      })
      // Получаем товары из базы
      const fondedItems = await Record.findAll({
         table: Items,
         where: {
            ItemArrivalID: { [Op.ne]: null },
            Discarded: false,
            ItemSaleID: null
         },
         att: {
            exclude: [
               'Manufacturer', 'Original', 'OEM', 'NeedVerification', 'VerificationComment', 'CreateUser', 'CreateDate', 'ApplicabilityMarkModelID', 'TypeID', 'DiscardReason'
            ]
         }
      })

      console.log(('Добавлено товаров в магазин:').darkGray, existProducts.length);
      console.log(('Найдено активных товаров в базе:').darkGray, fondedItems.length);
      this.compareDB(existProducts, fondedItems)

   }


   compareDB(existProducts, fondedItems) {
      // Проверяем проданные / списанные
      let removedProducts = []
      for(let product of existProducts) {
         let itemsNotExist = {}
         const existVal = product.dataValues
         itemsNotExist[existVal.url] = true
         for(let item of fondedItems) {
            if(item.dataValues.ID == parseInt(existVal.url)) {
               itemsNotExist[existVal.url] = false
            }
         }
         removedProducts.push(itemsNotExist)
      }
      // Если есть, удаляем
      this.deleteProduct(removedProducts)
   }

   deleteProduct(itemsNotExist) {
      const productToDelete = []
      for(let item of itemsNotExist) {
         const product = Object.values(item)[0]
         if(product) {
            productToDelete.push(Object.keys(item)[0])
         }
      }
      if(productToDelete.length > 0) {
         console.log(('Найдено проданных или списанных товаров:').darkGray, productToDelete.length, ('Удаляем из магазина...').darkGray);
         new DeleteProducts().deleteByURL(productToDelete)
      } else {
         console.log(('Прроданных или списанных товаров не найдено').yellow);
      }
   }
}

export { CheckSold }