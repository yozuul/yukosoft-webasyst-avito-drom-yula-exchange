import { ShopProduct, ShopSKU, Record } from '../models'

class AddSKU {
   async updateShop(product) {
      const { price } = product

      const skuData = {
         product_id: product.id,
         sku: product.sku,
         sort: 1,
         image_id: null,
         price: price,
         primary_price: price,
         purchase_price: 0,
         compare_price: 0,
         available: 1,
         status: 1,
         dimension_id: null,
         file_size: 0,
         file_description: null,
         virtual: 0
      }

      const addedSKUs = await Record.add({
         table: ShopSKU,
         fields: skuData
      })

      Record.update({
         table: ShopProduct,
         fields: { sku_id: addedSKUs },
         where: { id: product.id }
      })

      // return addedSKUs
   }
}

export { AddSKU }