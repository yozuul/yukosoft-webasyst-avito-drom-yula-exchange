import https from 'https'
import parser from 'fast-xml-parser'
import he from 'he'
import fs from 'fs'
import { finished } from 'stream/promises'
import { DashboardProduct } from '../../models'
import { Readable, Writable } from 'stream'
import { pipeline } from 'stream/promises'


class UpdateExports {
   constructor(existData) {
      this.existData = existData
      this.xmlData = {}
   }

   initStream(readableStream, writableStream, callback) {
      const controller = new AbortController()
      const dataProcess = async (dataRead) => {
         const dataEdited = await callback(dataRead)
         return dataEdited
      }
      const run = async () => {
         await pipeline(
            readableStream,
            async function * (source, signal) {
               let newData = ''
               signal = controller.signal
               for await (const chunk of source) {
                  newData += chunk
               }
               yield await dataProcess(newData, { signal })
             },
             writableStream
          )
         // console.log('Stream is done reading.')
      }

      run().catch((err) => {
         console.error(err)
         controller.abort()
      })
   }

   panelSettingsUpdate() {
      const editAvito = (dataRead) => {
         let xmlParsed = this.parseData.xml(dataRead)
         this.xmlData.avito = xmlParsed.Ads.Ad
         for(let item of this.existData) {
            if(!item.avito) {
               console.log(item.id)
               const removed = this.xmlData.avito.filter(ad => ad.Id !== item.id)
               this.xmlData.avito = removed
            }
         }
         xmlParsed.Ads.Ad = this.xmlData.avito
         let jsonParsed = this.parseData.json(xmlParsed)
         console.log(xmlParsed.Ads.Ad[0])
         console.log(xmlParsed.Ads.Ad[0].Images.Image)
         return jsonParsed
      }

      const readbleStream = this.streamCreate.readable
      const writableStream = this.streamCreate.writable

      this.initStream(readbleStream.avito(), writableStream.avito(), editAvito)
      // const xmlParsed = this.parseData.xml(existData)

      // for(let item of producstData) {
      //    if(!item.avito) {
            // console.log(item)
            // const removed = avitoXmlParsed.Ads.Ad.filter(ad => (ad.Id !== item.id))
            // this.xmlData.avito.Ads.Ad = removed
         // }
         // if(!item.drom) {
            // const removed = this.xmlData.drom.avtoxml.Offers.Offer.filter(Offer => (Offer.idOffer !== item.id))
            // this.xmlData.drom.avtoxml.Offers.Offer = removed
      //    }
      // }


//       const updateExports = [
//          [this.xmlData.drom, writable.drom],
//          [this.xmlData.avito, writable.avito]
//       ]
//
//       updateExports.map(array => this.saveAsXml(array[0], array[1]).catch(console.error))
      // return existData
   }

   get parseData() {
      const parserOptions = {
         attributeNamePrefix: "",
         ignoreAttributes:    false,
         parseAttributeValue: true,
         decodeHTMLchar:      true,
         // attrValueProcessor: a => he.decode(a, { isAttributeValue: true })
      }
      const parserOptions2 = {
         attributeNamePrefix: "",
         ignoreAttributes:    false,
         parseAttributeValue: true,
         decodeHTMLchar:      false,
         attrValueProcessor: a => he.decode(a, { isAttributeValue: false })
      }
      return {
         xml: (xmlData) => parser.parse(xmlData, parserOptions),
         json: (jsonData) => {
            const toJSON = new parser.j2xParser(parserOptions2)
            return toJSON.parse(jsonData)
         }
      }
   }

   get streamCreate() {
      return {
         readable: {
            drom: () => fs.createReadStream('./.exports/drom.xml'),
            avito: () => fs.createReadStream('./.exports/avito.xml'),
         },
         writable: {
            drom: () => fs.createWriteStream('./.exports/drom2.xml'),
            avito: () => fs.createWriteStream('./.exports/avito2.xml'),
         }
      }
   }

   // async saveAsXml(what, where) {
   //    const parserOptions = {
   //       attrValueProcessor: (val, attrName) => he.decode(val, {isAttributeValue: true}),//default is a=>a
   //       tagValueProcessor : (val, tagName) => he.decode(val), //default is a=>a
   //    }
   //    const xmlData = ParseJSON.parse(what, parserOptions);
   //    const readable = Readable.from(xmlData)
   //    readable.pipe(where)
   //    await finished(where)
   //    readable.unpipe(where)
   // }

   // async parseXml() {
//       const readData = async (readable) => {
//          await finished(readable)
//       }
//       const readble = {
//          drom: fs.createReadStream('./.exports/drom.xml'),
//          avito: fs.createReadStream('./.exports/avito.xml'),
//       }
//
//       const avitoExport = await readData(readble.avito)
//       const dromExport = await readData(readble.drom)
//
//       const parserOptions = {
//          attrValueProcessor: (val, attrName) => he.decode(attrName, {isAttributeValue: false}),//default is a=>a
//          tagValueProcessor : (val, tagName) => he.decode(val), //default is a=>a
//       }
//       this.xmlData.avito = await parser.parse(avitoExport, parserOptions)
//       if(parser.validate(avitoExport) === true) {
//          // console.log(this.xmlData.avito.Ads.Ad[0].Images)
//       }
//       if(parser.validate(dromExport) === true) {
//          this.xmlData.drom = await parser.parse(dromExport, parserOptions)
//       }
   // }
}

export { UpdateExports }