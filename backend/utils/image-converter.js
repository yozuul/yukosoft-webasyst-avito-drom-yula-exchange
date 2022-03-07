import fse from 'fs-extra'
import { constants } from 'fs';
import { writeFile, copyFile, access } from 'fs/promises';
import { green, darkGray, red } from 'ansicolor'

import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const sharp = require('sharp')

import { ImagePath } from '../utils'
import { resizer } from '../config/config.default'
// import { Updates } from '../services'
// import { Images, ShopProduct, ShopProductImages, Record } from '../models'

class ImageConverter {
   async makePreview(data) {
      this.converted = []
      data.path = new ImagePath().localRelative({
         productID: data.productID,
         imageID: data.imageID
      })

      this.generateImages(data)
      return data.path
   }

   async generateImages(data) {
      const { imageID, ext } = data

      const buffer = data.FILE_DATA
      const publicPath = data.path.public
      const protectedPath = data.path.protected

      const protectdImagePath = `${protectedPath}/${imageID}.${ext}`
      const checkProtectedPath = await this.isExist(protectdImagePath)

      if(!checkProtectedPath) {
         try {
            await sharp(buffer)
            .resize({ width: 970 })
            .toBuffer()
            .then(async (outputBuffer) => {
               await this.createFolders(protectedPath)
               await writeFile(protectdImagePath, outputBuffer)
               await this.copyMainImageToPublic(protectdImagePath, publicPath, imageID, ext)
               await this.createPreview(outputBuffer, publicPath, imageID, ext)
            })
         } catch (error) {
            console.log(error);
            console.log(('Image generation error').red);
         }
      }
   }

   async copyMainImageToPublic(protectdImagePath, publicPath, imageID, ext) {
      const publicImagePath = `${publicPath}/${imageID}.970.${ext}`
      const checkPublicPath = await this.isExist(publicPath)
      await this.createFolders(publicPath)
      if(!checkPublicPath) {
         try {
            await copyFile(protectdImagePath, publicImagePath)
          } catch(err) {
            console.log(err);
            console.log((`The file ${publicPath} could not be copied`).red);
          }
      }
   }

   async createPreview(buffer, publicPath, imageID, ext) {
      for (let preview of resizer) {
         const publicImagePath = `${publicPath}/${imageID}.${preview.postfix}.${ext}`

         try {
            await sharp(buffer)
            .resize(preview.size)
            .toBuffer()
            .then(async (outputBuffer) => {
               await writeFile(publicImagePath, outputBuffer)
            })
            .then(() => {
               this.checkPreviewDone(imageID.toString(), publicImagePath)
            })
         } catch (error) {
            console.log(error);
            console.log(('Error converting preview').red);
         }
      }
   }

   async checkPreviewDone(imageID, publicImagePath) {
      if(this.converted[imageID]) {
         this.converted[imageID].push(publicImagePath)
         if(this.converted[imageID].length == 4) {
            delete this.converted[imageID]
            // console.log(publicImagePath);
            console.log(('Изображение 📸').darkGray, (`${imageID}`).green, ('сконвертировано').darkGray);
         }
      } else {
         this.converted[imageID] = []
         this.converted[imageID].push(publicImagePath)
      }
   }

   async createFolders(dirPath) {
      try {
         await fse.ensureDir(dirPath)
       } catch (err) {
         console.error(err)
         ('Error create image folder').red
       }
   }

   async isExist(checkPath) {
      try {
         await access(checkPath, constants.R_OK | constants.W_OK);
         return true
       } catch {
         return false
       }
   }
}

export { ImageConverter }