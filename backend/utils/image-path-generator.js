import { imageFolders } from '../config/config.default'

class ImagePath {

   localRelative(data) {
      return this.commonPath(imageFolders.local.basic.relative, data)
   }

   commonPath(basicPath, data) {
      const productID = data.productID.toString()

      const split = productID.split('')
      const reverse = split.reverse()

      const dir = {
         main: `${reverse[1]}${reverse[0]}`,
         sub: `${reverse[3]}${reverse[2]}`,
         data: basicPath
      }

      const commonNested = `${dir.main}/${dir.sub}/${productID}/images`
      return {
         commonNested: commonNested,
         protected: `${dir.data}/protected/${commonNested}`,
         public: `${dir.data}/public/${commonNested}/${data.imageID}`
      }
   }
}

export { ImagePath }


