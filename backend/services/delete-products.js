import {
   ShopProduct,
   ShopSKU,
   ShopProductCategory,
   ShopProductFeautures,
   SearchIndex,
   ShopProductImages,
   Record
} from '../models'


import { ImagePath, ActionSSH } from '../utils'
import { imageFolders } from '../config/config.default'

class DeleteProducts {

   async deleteByURL(productsURL) {
      const productID = []
      for(let url of productsURL) {
         const urlNumber = parseInt(url)
         const findedProduct = await Record.find({
            table: ShopProduct,
            where: { url: urlNumber },
            att: ['id']
         })
         if(findedProduct) productID.push(findedProduct.id)
      }
      this.deleteByProductID(productID)
   }
   async deleteByProductID(productsID) {
      for(let id of productsID) {
         const fullCleanPath = this.preparePath(id)
         this.cleanTables(id)
         // fullCleanPath.map((folder) => {
         //    ActionSSH.clean.imagesLocalRemoved(folder)
         // })
         console.log(('Товар с ID').darkGray, (`${id}`).green, ('был удалён').darkGray)
      }
   }

   cleanTables(productID) {
      const tables = [
         ShopSKU, ShopProductCategory, ShopProductFeautures, SearchIndex, ShopProductImages
      ]
      tables.map((table) => {
         Record.delete({
            table: table,
            where: { product_id: productID }
         })
      })
      Record.delete({
         table: ShopProduct,
         where: { id: productID }
      })
   }

   preparePath(productID) {
      const folders = new ImagePath().localRelative({
         productID: productID
      })
      const commonCleanPath = folders.commonNested.split('/images')[0]

      const fullCleanPath = [
         `${imageFolders.local.basic.absolute}/protected/${commonCleanPath}`,
         `${imageFolders.local.basic.absolute}/public/${commonCleanPath}`,
      ]
      return fullCleanPath
   }

   cleanAll() {
      // this.cleanTables()
   }
}

export { DeleteProducts }