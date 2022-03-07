import { green, darkGray, red, yellow } from 'ansicolor'
import fs from 'fs'
import { avitoXmlUnit } from './avito-formatter'
import { finished } from 'stream/promises'

class ExportAvito {
   constructor(settings) {
      this.settings = settings
      this.writeExport = fs.createWriteStream('./.exports/avito.new.xml', 'utf-8')
      this.added = []
   }
   initStream(exportResult) {
      const rs = this.writeExport
      const openWrapTag = '<?xml version="1.0" encoding="UTF-8"?><Ads formatVersion="3" target="Avito.ru">'
      return {
         start: () => {
            this.writeExport.write(openWrapTag)
            const run = async () => {
               await finished(rs)
               exportResult({
                  type: 'global',
                  market: 'avito',
                  products: this.added.length
               })
             }
             run().catch(console.error)
         },
         write: (product) => {
            this.writeExport.write(avitoXmlUnit(product))
            this.added.push(product.ID)
            console.log((`Товар с ID ${product.ID} добавлен в выгрузку Авито`).darkGray)
         },
         stop: () => {
            this.writeExport.end('</Ads>')
            const readNew = fs.createReadStream('./.exports/avito.new.xml')
            const writeMain = fs.createWriteStream('./.exports/avito.xml')
            readNew.pipe(writeMain)
         }
      }
   }
}

export { ExportAvito }