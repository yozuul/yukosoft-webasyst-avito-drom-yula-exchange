import { ShopProduct, ShopProductImages,  Record } from '../models'
import { ImageConverter } from '../utils'

class AddImages {

   async updateShop(data) {
      let mainImage = {}
      const imagePath = []
      if(data.images) {
         let sort = 0
         // Добавляем все фотки
         for(let image of data.images) {
            const addedImage = await Record.add({
               table: ShopProductImages,
               fields: {
                  product_id: data.productID,
                  sort: sort,
                  original_filename: image.FILE_NAME,
                  ext: image.ext
               }
            })
            if(sort == 0) {
               mainImage.id = addedImage
               mainImage.ext = image.ext
            }
            if(image.MAIN) {
               mainImage.id = addedImage
               mainImage.ext = image.ext
            }

            image.productID = data.productID
            image.imageID = addedImage

            const converted = await new ImageConverter().makePreview(image)
            imagePath.push(converted)
            sort++
         }

         if(mainImage.id) {
            await Record.update({
               table: ShopProduct,
               fields: { image_id: mainImage.id, ext: mainImage.ext },
               where:  { id: data.productID }
            })
         }
      }
      return imagePath
   }
}

export { AddImages }