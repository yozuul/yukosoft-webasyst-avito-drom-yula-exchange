import https from 'https'
import parser from 'fast-xml-parser'
import he from 'he'
import { ItemCategoryTypeLink, DashboardProduct } from '../../models'
import { ExportAvito } from './avito-export'
import { ExportDrom } from './drom-export'

class Markets {
   constructor(settings) {
      this.settings = settings
      this.avitoStream = new ExportAvito(settings)
      this.dromStream = new ExportDrom(settings)
      this.dromRefs = {}
      this.totalAdded = []
   }

   newStream(getResult) {
      const avito = this.avitoStream.initStream(getResult)
      const drom = this.dromStream.initStream(getResult)
      return {
         open: () => {
            avito.start()
            drom.start()
         },
         update: async (product) => {
            const avitoXML = await this.prepareAvito(product)
            const dromXML = await this.prepareDrom(product)
            if(avitoXML) avito.write(avitoXML)
            if(dromXML) drom.write(dromXML)
         },
         close: () => {
            avito.stop()
            drom.stop()
         }
      }
   }

   async prepareDrom(product) {
      const isVisiblity = await this.checkCustomText(product.ID, 'drom')
      if(isVisiblity.public) {
         product.customText = isVisiblity.text
         product.dromRefs = this.parseDromRefs(product)
         return product
      }
   }

   async getDromXmlRefs(getProductData) {
      const xmlPath = 'https://www.drom.ru/cached_files/autoload/files/ref.xml'
      const parserOptions = {
         attrValueProcessor: (val, attrName) => he.decode(val, {isAttributeValue: true}),
         tagValueProcessor : (val, tagName) => he.decode(val),
      }
      https.get(xmlPath, (resp) => {
         let xmlData = ''
         resp.on('data', (chunk) => {
            xmlData += chunk;
         })
         resp.on('end', () => {
            if(parser.validate(xmlData) === true) {
               const refs = parser.parse(xmlData, parserOptions).References
               this.dromRefs = {
                  marks: refs.Marks.Mark,
                  models: refs.Models.Model,
                  frameType: refs.FrameTypes.FrameType,
                  color: refs.Colors.Color,
                  transmission: refs.Transmissions.Transmission,
                  // engineType: refs.EngineTypes.EngineType,
                  driveType: refs.DriveTypes.DriveType
               }
               getProductData()
            }
         })
      }).on('error', (err) => {
         console.log('Error: ' + err.message);
      })
   }

   parseDromRefs(product, refs = {}) {
      const searchRule = (where, what) => this.dromRefs[where].find(element => what(element))

      refs.mark = searchRule('marks', (el) => (el.sMark === product.mark.Mark))
      refs.model = searchRule('models', (el) => ((el.sModel === product.mark.Model) && (el.idMark === refs.mark?.idMark)))
      refs.frameType = searchRule('frameType', (el) => (el.sFrameType === product.donor.BodyType))
      refs.color = searchRule('color', (el) => (el.sColor === product.donor?.CarColor))
      refs.transmission = searchRule('transmission', (el) => (el.sTransmission === product.donor?.Transmission))
      refs.driveType = searchRule('driveType', (el) => (el.sDriveType === (product.donor.CarDrive ? product.donor.CarDrive.toLowerCase() : null)))
      refs.wheelType = product.donor?.RightWheel ? 1 : 2
      // refs.engineType = searchRule('engineType', (el) => (el.sEngineType === product.donor?.Transmission))

      return refs
   }

   async prepareAvito(product) {
      if(product.Price >= this.settings.avito_min_price) {
         const isVisiblity = await this.checkCustomText(product.ID, 'avito')
         if(isVisiblity.public) {
            const category = await ItemCategoryTypeLink.findOne({
               where: { ItemTypeID: product.TypeID  },
               attributes: ['AvitoCategory']
            })
            if(category) {
               product.avitoCategory = this.getAvitoCategory(category.dataValues.AvitoCategory)
               product.customText = isVisiblity.text
               product.company_phone = this.settings.company_phone
               product.company_adress = this.settings.company_adress
               return product
            }
         }
      }
   }

   async checkCustomText(productID, marketName) {
      const dashboardProductSettings = await DashboardProduct.findOne({
         where: { id: productID }
      })
      if(!dashboardProductSettings) {
         return { public: true, text: null }
      } else {
         return { public: dashboardProductSettings[marketName], text: dashboardProductSettings.text }
      }
   }

   getAvitoCategory(catName) {
      const categories = {
         'Запчасти / Для автомобилей / Автосвет': '11-618',
         'Запчасти / Для автомобилей / Автомобиль на запчасти': '19-2855',
         'Запчасти / Для автомобилей / Аккумуляторы': '11-619',
         'Запчасти / Для автомобилей / Двигатель / Блок цилиндров, головка, картер': '16-827',
         'Запчасти / Для автомобилей / Двигатель / Вакуумная система': '16-828',
         'Запчасти / Для автомобилей / Двигатель / Генераторы, стартеры': '16-829',
         'Запчасти / Для автомобилей / Двигатель / Двигатель в сборе': '16-830',
         'Запчасти / Для автомобилей / Двигатель / Катушка зажигания, свечи, электрика': '16-831',
         'Запчасти / Для автомобилей / Двигатель / Катушки зажигания, свечи, электрика': '16-831',
         'Запчасти / Для автомобилей / Двигатель / Клапанная крышка': '16-832',
         'Запчасти / Для автомобилей / Двигатель / Коленвал, маховик': '16-833',
         'Запчасти / Для автомобилей / Двигатель / Коллекторы': '16-833',
         'Запчасти / Для автомобилей / Двигатель / Крепление двигателя': '16-835',
         'Запчасти / Для автомобилей / Двигатель / Масляный насос, система смазки': '16-836',
         'Запчасти / Для автомобилей / Двигатель / Патрубки вентиляции': '16-837',
         'Запчасти / Для автомобилей / Двигатель / Поршни, шатуны, кольца': '16-838',
         'Запчасти / Для автомобилей / Двигатель / Приводные ремни, натяжители': '16-839',
         'Запчасти / Для автомобилей / Двигатель / Прокладки и ремкомплекты': '16-840',
         'Запчасти / Для автомобилей / Двигатель / Ремни, цепи, элементы ГРМ': '16-841',
         'Запчасти / Для автомобилей / Двигатель / Турбины, компрессоры': '16-842',
         'Запчасти / Для автомобилей / Двигатель / Электродвигатели и компоненты': '16-843',
         'Запчасти / Для автомобилей / Запчасти для ТО': '11-621',
         'Запчасти / Для автомобилей / Кузов / Балки, лонжероны': '16-805',
         'Запчасти / Для автомобилей / Кузов / Бамперы': '16-806',
         'Запчасти / Для автомобилей / Кузов / Брызговики': '16-807',
         'Запчасти / Для автомобилей / Кузов / Двери': '16-808',
         'Запчасти / Для автомобилей / Кузов / Заглушки': '16-809',
         'Запчасти / Для автомобилей / Кузов / Замки': '16-810',
         'Запчасти / Для автомобилей / Кузов / Защита': '16-811',
         'Запчасти / Для автомобилей / Кузов / Зеркала': '16-812',
         'Запчасти / Для автомобилей / Кузов / Кабина': '16-813',
         'Запчасти / Для автомобилей / Кузов / Капот': '16-814',
         'Запчасти / Для автомобилей / Кузов / Крепления': '16-815',
         'Запчасти / Для автомобилей / Кузов / Крылья': '16-816',
         'Запчасти / Для автомобилей / Кузов / Крыша': '16-817',
         'Запчасти / Для автомобилей / Кузов / Крышка, дверь багажника': '16-818',
         'Запчасти / Для автомобилей / Кузов / Кузов по частям': '16-819',
         'Запчасти / Для автомобилей / Кузов / Кузов целиком': '16-820',
         'Запчасти / Для автомобилей / Кузов / Лючок бензобака': '16-821',
         'Запчасти / Для автомобилей / Кузов / Молдинги, накладки': '16-822',
         'Запчасти / Для автомобилей / Кузов / Пороги': '16-823',
         'Запчасти / Для автомобилей / Кузов / Рама': '16-824',
         'Запчасти / Для автомобилей / Кузов / Решетка радиатора': '16-825',
         'Запчасти / Для автомобилей / Кузов / Стойка кузова': '16-826',
         'Запчасти / Для автомобилей / Подвеска': '11-623',
         'Запчасти / Для автомобилей / Рулевое управление': '11-624',
         'Запчасти / Для автомобилей / Салон': '11-625',
         'Запчасти / Для автомобилей / Система охлаждения': '16-521',
         'Запчасти / Для автомобилей / Стекла': '11-626',
         'Запчасти / Для автомобилей / Топливная и выхлопная системы': '11-627',
         'Запчасти / Для автомобилей / Тормозная система': '11-628',
         'Запчасти / Для автомобилей / Трансмиссия и привод': '11-629',
         'Запчасти / Для автомобилей / Электрооборудование': '11-630',
         'Запчасти / Для мототехники': '6-401',
         'Запчасти / Для спецтехники': '6-406',
         'Запчасти / Для водного транспорта': '6-411',
         'Аксессуары': '4-943',
         'GPS-навигаторы': '21',
         'Автокосметика и автохимия': '4-942',
         'Аудио- и видеотехника': '20',
         'Багажники и фаркопы': '4-964',
         'Инструменты': '4-963',
         'Прицепы': '4-965',
         'Противоугонные устройства / Автосигнализации': '11-631',
         'Противоугонные устройства / Иммобилайзеры': '11-632',
         'Противоугонные устройства / Механические блокираторы': '11-633',
         'Противоугонные устройства / Спутниковые системы': '11-634',
         'Тюнинг': '22',
         'Шины, диски и колёса / Шины': '10-048',
         'Шины, диски и колёса / Мотошины': '10-047',
         'Шины, диски и колёса / Диски': '10-046',
         'Шины, диски и колёса / Колёса': '10-045',
         'Шины, диски и колёса / Колпаки': '10-044',
         'Экипировка': '6-416',
      }
      return categories[catName]
   }
}

export { Markets }