import { green, darkGray, red, yellow } from 'ansicolor'

import { Items, ShopProduct, Settings, ShopProductImages, DashboardProduct, Record } from '../models'
import { Markets } from './markets'
import { Op } from '../utils'
import { AddShopProduct } from '../controllers'
import { LoadExtras, DeleteProducts } from './index'
import { ImagePath } from '../utils'
import { UpdateExports } from './markets/update-exports'
import moment from 'moment'
moment.defineLocale('ru', {
   parentLocale: 'ru',
 });

class ProductUpater {
   constructor() {
      this.initMarketExport = false
      this.log = {}
   }

   async getExtraProductData(itemValues) {
      // Подгружаем доп. данные по ID итема в базе программы
      const extras = new LoadExtras(itemValues)
      // Изображения
      itemValues.images = await extras.findImages()
      // Марка авто донора
      itemValues.donor = await extras.findDonorCar()
      // Марка авто по справочнику
      itemValues.mark = await extras.findModelMark()
      // Категория
      // itemValues.categoryName = await extras.findCategoryName()
      // this.productUpdate.added.push(itemValues.ID)
      // itemValues.applicability = await extras.findApplicabilityModelsMark()
      return itemValues
   }
   saveStatus(text, status) {
      this.log.settings[status] = text
      this.log.settings.save()
   }
   get date() {
      return moment().format('MMMM Do YYYY, h:mm:ss a')
   }
   async checkNew() {
      this.log.beginCheck = new Date()
      // Проверяем необходимость обновления в админке
      const settings = await Settings.findOne({
         where: { id: 1 }
      })
      // console.log(settings)
      this.log.settings = settings
      this.saveStatus('Начало проверки обновлений', 'currentStatus')
      // console.log(settings.products_settings_changed)
      // console.log(settings)
      // this.saveStatus(this.date, 'latest_update_check_time')
      // console.log('settings.global_settings_changed', settings.global_settings_changed)
      // console.log('settings.products_settings_changed', settings.products_settings_changed)
      this.initMarketExport = settings.global_settings_changed || settings.products_settings_changed
      if(settings.global_settings_changed) {
         console.log('Глобальные настройки показов всех объявлений были изменены'.green)
      }
      if(settings.products_settings_changed) {
         console.log('Показы объявления или текста были изменены'.green)
      }
      console.log(('Проверяем новые товары...').green)
      // Получаем товары из магазина
      const existProducts = await Record.findAll({
         table: ShopProduct
      })
      // Получаем товары из базы
      const foundedItems = await Record.findAll({
         table: Items,
         where: {
            ItemArrivalID: { [Op.ne]: null },
            Discarded: false,
            ItemSaleID: null,
            // ApplicabilityMarkModelID: { [Op.ne]: null },
         },
         att: {
            exclude: [
               'NeedVerification', 'VerificationComment', 'CreateUser', 'CreateDate', 'DiscardReason'
            ]
         }
      })

      if(existProducts.length == 0) {
         console.log(('Новая база').red)
         this.prepareCleanDB(foundedItems)
      } else {
         console.log(('Активных товаров в магазине:').darkGray, existProducts.length)
         console.log(('Активных товаров в базе:').darkGray, foundedItems.length)
         this.log.existProducts = existProducts.length
         this.log.foundedItems = foundedItems.length
         this.foundedItems = foundedItems
         this.compareDB(existProducts, foundedItems)
      }
   }

   async panelSettingsUpdatePrepare() {
      const splitString = this.productChanged.panel.split('|')
      const filterData = splitString.filter(id => parseInt(id))
      const productsID = filterData.map(id => parseInt(id))

      return await DashboardProduct.findAll({
         where: { id: productsID }
      })
   }

   async forceMarketsExport(data) {
      this.log.exportStart = new Date()
      const initExport = new Markets(data.settings)
      const getResult = (updateData) => {
         if(updateData.market === 'avito') {
            this.log.exportedAvito = updateData.products
         }
         if(updateData.market === 'drom') {
            this.log.exportedDrom = updateData.products
         }
         if((this.log.exportedDrom) && (this.log.exportedAvito)) {
            this.updateDashboard()
         }
      }
      const initStreams = initExport.newStream(getResult)
      const shop = {
         uploadedProducts: await ShopProduct.findAll({
            attributes: ['id', 'url']
         }),
         uploadedImages: await ShopProductImages.findAll({
            attributes: ['id', 'product_id', 'ext']
         })
      }
      const getExtraData = async () => {
         for(const product of data.products) {
            const extraData = await this.getExtraProductData(product.dataValues)
            delete extraData.images
            extraData.imagesPath = (() => {
               const { id } = shop.uploadedProducts.find(item => product.ID === parseInt(item.dataValues.url))
               const founded = shop.uploadedImages.filter(image => image.dataValues.product_id === id)
               return founded.map((image) => {
                  const { commonNested } = new ImagePath().localRelative({
                     productID: id,
                     imageID: image.id
                  })
                  const rootPath = 'https://slavyanin23rus.ru/wa-data/public/shop/products'
                  const imagePath = `${rootPath}/${commonNested}/${image.id}/${image.id}.970.${image.ext}`
                  return imagePath
               })
            })()
            initStreams.update(extraData)
         }
         initStreams.close()
         this.log.exportStop = new Date()
      }
      initExport.getDromXmlRefs(getExtraData)
      initStreams.open()
   }

   async updateDashboard() {
      const settings = await Settings.findOne({
         where: { id: 1 }
      })
      settings.global_settings_changed = false
      settings.products_settings_changed = ''
      // settings.latest_full_export_update = new Date(),
      // console.log(this.log)
      // if(initUpdate.type === 'global') {
      //    settings.global_settings_changed = false
      //    settings.products_settings_changed = ''
      //    settings.latest_full_export_update = new Date(),
      //    settings.total_products_exported = this.globalExportUpdate.total
      //    settings.avito_products_exported = this.globalExportUpdate.avito
      //    settings.drom_products_exported = this.globalExportUpdate.drom
      // }
      settings.save()
   }


   compareDB(existProducts, foundedItems) {
      // Проверяем новые товары
      let newProducts = []
      for(let item of foundedItems) {
         let productsNotExist = {}
         const foundedVal = item.dataValues
         productsNotExist[foundedVal.ID] = foundedVal
         for(let product of existProducts) {
            if(parseInt(product.dataValues.url) == foundedVal.ID) {
               productsNotExist[foundedVal.ID] = false
               this.checkPrice(parseInt(product.dataValues.price), foundedVal.Price, foundedVal.ID)
            }
         }
         newProducts.push(productsNotExist)
      }

      // Если есть, добавляем
      this.addProduct(newProducts)

      // Проверяем проданные / списанные
      let removedProducts = []
      for(let product of existProducts) {
         let itemsNotExist = {}
         const existVal = product.dataValues
         itemsNotExist[existVal.url] = true
         for(let item of foundedItems) {
            if(item.dataValues.ID == parseInt(existVal.url)) {
               itemsNotExist[existVal.url] = false
            }
         }
         removedProducts.push(itemsNotExist)
      }
      // Если есть, удаляем
      this.deleteProduct(removedProducts)
   }

   checkPrice(shopPrice, foundedPrice, foundedID) {
      if(foundedPrice !== shopPrice) {
         Record.update({
            table: ShopProduct,
            fields: { price: foundedPrice },
            where: { url: foundedID }
         })
         this.initMarketExport = true
      }
   }

   addProduct(productsNotExist) {
      const productToAdd = []
      for(let product of productsNotExist) {
         const itemVal = Object.values(product)[0]
         if(itemVal) {
            productToAdd.push(Object.keys(product)[0])
         }
      }
      if(productToAdd.length > 0) {
         this.log.productToAdd = productToAdd.length
         console.log(('Найдено новых товаров:').darkGray, productToAdd.length, ('Добавляем в магазин...').darkGray)
         productsNotExist.map(async (product) => {
            const itemVal = Object.values(product)[0]
            if(itemVal) {
               let addItemData = await this.getExtraProductData(itemVal)
               addItemData.imagePath = new AddShopProduct(addItemData).updateData()
               return addItemData
            }
         })
         this.initMarketExport = true
      } else {
         console.log(('Новых товаров не найдено').yellow)
      }
      this.log.checkNewProductEnd = new Date
      this.log.foundedNewProduct = productToAdd.length
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
         console.log(('Найдено проданных или списанных товаров:').darkGray, productToDelete.length, ('Удаляем из магазина...').darkGray)
         new DeleteProducts().deleteByURL(productToDelete)
         this.initMarketExport = true
      } else {
         console.log(('Проданных или списанных товаров не найдено').yellow)
      }
      this.log.checkRemovedProductEnd = new Date
      this.log.foundedRemovedProduct = productToDelete.length

      if(this.initMarketExport) {
         this.forceMarketsExport({
            products: this.foundedItems,
            settings: this.log.settings
         })
      } else {
         this.updateDashboard()
      }
   }

   // Для чистой базы, санчала добавляем стартовые товары, чтобы было с чем сравнивать
   prepareCleanDB(foundedItems) {
      let index = 0
      for(let item of foundedItems) {
         if(index < 500) {
            this.addProductByOne(item.dataValues)
         }
         index++
      }
   }

   async addProductByOne(itemVal) {
      const addItemData = await this.getExtraProductData(itemVal)
      new AddShopProduct(addItemData).updateData()
   }
}

export { ProductUpater }