import { SearchIndex, SearchWord, Record } from '../models'

class AddSearch {

   async updateShop(data) {
      const nameArray = data.name.split(' ')

      const findedWord = await Record.find({
         table: SearchWord,
         where: { name: nameArray[0] },
         att: ['id']
      })

      if(findedWord) {
         new SearchIndex(findedWord.dataValues, data.productID)
      } else {
         this.addIndex(findedWord.dataValues)
      }
   }

   addIndex(productSearchWords, productID) {
      let weight = 10
      for (let wordID of productSearchWords) {
         Record.add({
            table: SearchIndex,
            fields: {
               word_id: wordID,
               product_id: productID,
               weight: weight
            }
         })
         weight+10
      }
   }
}

export { AddSearch }