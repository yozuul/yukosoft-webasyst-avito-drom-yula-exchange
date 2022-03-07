import { green, darkGray, red, yellow } from 'ansicolor'
import fs from 'fs';
import { dromXmlUnit } from './drom-formatter'
import { finished } from 'stream/promises'

class ExportDrom {
   constructor(settings) {
      this.settings = settings
      this.writeExport = fs.createWriteStream('./.exports/drom.new.xml', 'utf-8')
      this.added = []
   }
   initStream(exportResult) {
      const rs = this.writeExport
      return {
         start: () => {
            const dealer = {
               openTag: `<Dealers><Dealer>`,
               idCity: `<sCity>ст.Троицкая, Крымского района</sCity>`,
               name: `<Name>Авторазбор "Славянин"</Name>`,
               contact: `<Contact>${this.settings.company_adress} Тел.: ${this.settings.company_phone}</Contact>`,
               url: `<Url>https://slavyanin23rus.ru/</Url>`,
               closeTag: `</Dealer></Dealers>`,
            }
            const wrapperOpen = '<avtoxml>' + dealer.openTag + dealer.idCity + dealer.name + dealer.contact + dealer.url + dealer.closeTag + '<Offers>'
            this.writeExport.write(wrapperOpen)
            const run = async () => {
               await finished(rs)
               exportResult({
                  type: 'global',
                  market: 'drom',
                  products: this.added.length
               })
             }
             run().catch(console.error)
         },
         write: (product) => {
            this.writeExport.write(dromXmlUnit(product))
            this.added.push(product.ID)
            console.log((`Товар с ID ${product.ID} добавлен в выгрузку Дром`).darkGray)
         },
         stop: () => {
            this.writeExport.end('</Offers></avtoxml>')
            const readNew = fs.createReadStream('./.exports/drom.new.xml')
            const writeMain = fs.createWriteStream('./.exports/drom.xml')
            readNew.pipe(writeMain)
         }
      }
   }
}

export { ExportDrom }