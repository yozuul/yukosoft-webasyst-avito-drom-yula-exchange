import { AddSKU, AddCategory, AddFeautures, AddSearch, AddImages } from './index'
import { Record } from '../models'
import { ShopProduct } from '../models/mysql'
import { getMskTime } from '../utils'


class AddShopProduct {
   constructor(item) {
      this.item = item
   }
   async updateData() {
      // Добавляем товар
      this.item.productID = await Record.add({
         table: ShopProduct,
         fields: await this.prepareData(this.item)
      })
      // Добавляем SKU / обновляем его у товара
      new AddSKU().updateShop({
         id: this.item.productID,
         sku: this.item.ID,
         price: this.item.Price
      })
      // Добавляем категории
      new AddCategory().updateShop({
         productID: this.item.productID,
         categoryID: this.item.CategoryID,
         mark: this.item.mark
      })
      // Добавляем характеристики
      new AddFeautures().updateShop(this.item)
      // Добавляем поиск
      new AddSearch().updateShop({
         name: this.item.ItemName,
         productID: this.item.productID
      })
      // Добавляем фотки
      const imagePath = await new AddImages().updateShop(this.item)

      console.log(('Добавлен новый товар 📝').darkGray, (`${this.item.productID}`).green, ('Артикул:').darkGray, (`${this.item.ID}`).green)
      return imagePath
   }

   async prepareData(item) {
      const { Price, Quantity } = item
      const productData = {
         name: item.ItemName,
         meta_title: null,
         meta_description: null,
         meta_keywords: null,
         description: item.Descr,
         type_id: 1,
         image_id: null,
         sku_id: null,
         ext: null,
         url: item.ID,
         price: Price,
         min_price: Price,
         max_price: Price,
         count: Quantity ? Quantity : 1,
         category_id: item.CategoryID,
         create_datetime: getMskTime(),
         edit_datetime: getMskTime()
      }

      return productData
   }
}

export { AddShopProduct }