import { ItemImages, ItemDonorCar, CarMarksModels, ItemCategory,Record } from '../models'

class LoadExtras {
   constructor(item) {
      this.item = item
   }

   async findDonorCar() {
      // Загружаем информацию о доноре
      return Record.find({
         table: ItemDonorCar,
         where: { ID: this.item.CarID },
         att: {
            exclude: ['ID', 'CarStatus', 'MarkModelID', 'Photo']
         }
      })
   }

   async findApplicabilityModelsMark() {
      // console.log(this.item.ApplicabilityMarkModelID)
      // if(this.item.ApplicabilityMarkModelID) {
      //    const modelsID = this.item.ApplicabilityMarkModelID.split(', ')
      //    // if(modelsID)
      // }
      // console.log(this.item)
      // Загружаем марку из справочника
      // return Record.find({
      //    table: CarMarksModels,
      //    where: { ID: this.item.MarkModelID }
      // })
   }

   async findCategoryName() {
      // try {
      //    const founded = await ItemCategory.findOne({
      //       where: { ID: this.item.CategoryID },
      //       attributes: ['CategoryName']
      //    })
      //    return founded.CategoryName
      // } catch(e) {
      //    console.log(e)
      // }
   }

   async findModelMark() {
      // Загружаем марку из справочника
      return Record.find({
         table: CarMarksModels,
         where: { ID: this.item.MarkModelID }
      })
   }

   async findImages() {
      // Загружаем фотки
      const collectImages = []
      const foundedImages = await Record.findAll({
         table: ItemImages,
         where: {
            ITEM_ID: this.item.ID,
            FORM_NAME: 'Items'
         },
         att: ['FILE_ID', 'ITEM_ID', 'FILE_NAME', 'MAIN', 'FILE_DATA']
      })
      if (foundedImages) {
         for (let image of foundedImages) {
            let imageValue = image.dataValues
            const ext = imageValue.FILE_NAME.split('.')[1]
            imageValue.ext = ext.toLowerCase()
            collectImages.push(imageValue)
         }

         return collectImages

      } else {
         return false
      }
   }
}

export { LoadExtras }