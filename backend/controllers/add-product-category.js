import { green, darkGray, red, yellow } from 'ansicolor'

import { ItemCategory, ShopProduct, ShopCategory, ShopProductCategory, Record } from '../models'
import { ruTransaltor } from '../utils'

class AddCategory {
   constructor(leftKey, rightKey) {
      this.leftKey = leftKey
      this.rightKey = rightKey
   }

   async updateShop(data) {
      const { mark, productID } = data

      const repairURL = 'webasyst/shop/?module=repair&action=categories'

      if(mark) {
         const { Mark, Model, Generation } = mark

         this.leftKey = await this.categoryKey.left() + 1
         this.rightKey = await this.categoryKey.right() + 1

         const findedCategory = await Record.find({
            table: ItemCategory,
            where: { ID: data.categoryID }
         })

         const targetCatName = findedCategory.CategoryName
         const targetCatUrl = ruTransaltor(targetCatName)

         const parentMark = await this.getCategoryByParent(Mark, 0)
         const parentMarkData = await this.checkCatExist({
            isExist: parentMark,
            name: Mark,
            parentID: 0,
            depth: 0,
            fullURL: Mark,
            left_key: this.leftKey,
            right_key: this.rightKey
         })

         const subCatModel = await this.getCategoryByParent(Model, parentMarkData.id)
         const subCatModelData = await this.checkCatExist({
            isExist: subCatModel,
            name: Model,
            parentID: parentMarkData.id,
            depth: 1,
            fullURL: `${parentMarkData.url}/${Model}`,
            left_key: this.leftKey + 1,
            right_key: this.rightKey + 1
         })

         const subCatGen = await this.getCategoryByParent(Generation, subCatModelData.id)
         const subCatGenData = await this.checkCatExist({
            isExist: subCatGen,
            name: Generation,
            parentID: subCatModelData.id,
            depth: 2,
            fullURL: `${parentMarkData.url}/${subCatModelData.url}/${Generation}`,
            left_key: this.leftKey + 2,
            right_key: this.rightKey + 2
         })

         const subCatTarget = await this.getCategoryByParent(targetCatName, subCatGenData.id)
         const subCatTargetData = await this.checkCatExist({
            isExist: subCatTarget,
            name: targetCatName,
            parentID: subCatGenData.id,
            depth: 3,
            fullURL: `${parentMarkData.url}/${subCatModelData.url}/${subCatGenData.url}/${targetCatUrl}`,
            left_key: this.leftKey + 3,
            right_key: this.rightKey + 3
         })

         this.addProductCategory(productID, subCatTargetData.id)
         // this.repair(repairURL)
      }
   }

   async checkCatExist(data) {
      const { isExist, name, parentID, depth, fullURL, left_key, right_key } = data

      const nameDelSpaceAtEnd = name.replace(/\s+$/, '')
      const nameReplaceSpaceHyphen = nameDelSpaceAtEnd.replace(/\s/g, '-')

      const urlDelSpaceAtEnd = fullURL.replace(/\s+$/, '')
      const urlReplaceSpaceHyphen = urlDelSpaceAtEnd.replace(/\s/g, '-')

      if(isExist) {
         return {
            id: isExist.dataValues.id,
            url: urlReplaceSpaceHyphen
         }
      } else {
         try {
            const newCategory = await ShopCategory.create({
               depth: depth,
               parent_id: parentID,
               name: nameDelSpaceAtEnd,
               url: ruTransaltor(nameReplaceSpaceHyphen.toLowerCase()),
               full_url: urlReplaceSpaceHyphen.toLowerCase() || nameReplaceSpaceHyphen.toLowerCase(),
               left_key: left_key + 1,
               right_key: right_key + 1
            })

            console.log('Добавлена новая категория:', {id: newCategory.null, name: name})

            return {
               id: newCategory.null,
               url: urlReplaceSpaceHyphen
            }
         }
         catch (err) { console.log(err) }
      }
   }

   get categoryKey() {
      return {
         left: async () => {
            const key = await ShopCategory.findOne({
               order: [['left_key', 'DESC']],
            })
            return key.dataValues.left_key
         },
         right: async () => {
            const key = await ShopCategory.findOne({
               order: [['right_key', 'DESC']],
            })
            return key.dataValues.right_key
         }
      }
   }

   addProductCategory(productID, targetCatTypeID) {
      Record.add({
         table: ShopProductCategory,
         fields: {
            product_id: productID,
            category_id: targetCatTypeID,
            sort: 0
         }
      })
      Record.update({
         table: ShopProduct,
         fields: { category_id: targetCatTypeID },
         where: { id: productID }
      })
   }

   async getCategoryByParent(name, parentID) {
      try {
         return ShopCategory.findOne({
            attributes: ['id'],
            where: {
               name: name,
               parent_id: parentID
            }
         })
      } catch (err) {
         console.log(err);
      }
   }
}

export { AddCategory }