import { ShopProductFeautures, ShopFeauturesValue, Record } from '../models'

class AddFeautures {

   async updateShop(data) {
      const feauturesData = this.prepareData(data)
      const feautures = this.checkExistFeautures(feauturesData, data.productID)
   }

   async checkExistFeautures(data, productID) {
      const feauturesDone = []
      for(let feauture in data) {
         const value = data[feauture]
         if(value) {
            const isExist = await Record.tryFind({
               table: ShopFeauturesValue,
               where: { value: value },
               value: value
            })

            const productFeautures = await this.collectFeautures(isExist, feauture)
            feauturesDone.push(productFeautures)
         }
      }

      if(feauturesDone.length > 0) {
         this.addProductFeautures(productID, feauturesDone)
      }
   }

   async addProductFeautures(productID, feauturesData) {
      for(let item of feauturesData) {
         const feautures = await Record.add({
            table: ShopProductFeautures,
            fields: {
               product_id: productID,
               feature_id: item.feature_id,
               feature_value_id: item.id
            }
         })
      }
   }

   async collectFeautures(isExist, feautureName) {

      let feauturesData = {}
      const typesID = {
         color: 3,
         pokolenie: 4,
         originalnyy_nomer: 5,
         model: 6,
         defekt: 7,
         manufacturer: 8,
         CarFullName: 11
      }

      const feautureID = typesID[feautureName]

      if(typeof isExist !== 'string') {
         feauturesData = {
            id: isExist.id,
            feature_id: isExist.feature_id
         }
      } else {
         feauturesData = {
            id: await this.addNewFeauture(isExist, feautureID),
            feature_id: feautureID
         }
      }

      return feauturesData
   }

   async addNewFeauture(value, id) {
      const newFeautures = await Record.add({
         table: ShopFeauturesValue,
         fields: {
            value: value,
            feature_id: id,
            sort: 999
         }
      })
      return newFeautures
   }

   prepareData(product) {
      const { mark, OriginalNo, Defect, donor } = product
      const feauturesData = {
         color: product.ItemColor,
         pokolenie: mark ? mark.Generation : null,
         originalnyy_nomer: OriginalNo ? OriginalNo : null,
         model: mark ? `${mark.Mark} ${mark.Model}` : null,
         defekt: Defect ? Defect : null,
         manufacturer: mark ? mark.Mark : null,
         CarFullName: donor ? donor.CarFullName || donor.CarMarkModel : null
      }
      return feauturesData
   }
}

export { AddFeautures }