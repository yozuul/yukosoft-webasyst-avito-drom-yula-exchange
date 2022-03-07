export const dromXmlUnit = (product) => {
   const WRAPPER = {
      OpenTag: '<Offer>', CloseTag: '</Offer>'
   }
   const idOffer = `<idOffer>${product.ID}</idOffer>`

   const idMark = product.dromRefs.mark?.idMark
   const idModel = product.dromRefs.model?.idModel
   const idFrameType = product.dromRefs.frameType?.idFrameType
   const idColor = product.dromRefs.color?.color
   const idTransmission = product.dromRefs.transmission?.idTransmission
   const idDriveType = product.dromRefs.driveType?.idDriveType
   const wheelType = product.dromRefs.wheelType
   const wheelTypeName = product.donor.RightWheel ? 'правый' : 'левый'

   const markTag = idMark ? `<idMark>${idMark}</idMark>` : `<sMark>${product.mark.Mark}</sMark>`
   const modelTag = idModel ? `<idModel>${idModel}</idModel>` : `<sModel>${product.mark.Model}</sModel>`
   const frameTypeTag = idFrameType ? `<idFrameType>${idFrameType}</idFrameType>` : ''
   const colorTag = idColor ? `<idColor>${idColor}</idColor>` : ''
   const transmissionTag = idTransmission ? `<idTransmission>${idTransmission}</idTransmission>` : ''
   const driveTypeTag = idDriveType ? `<idDriveType>${idDriveType}</idDriveType>` : ''
   const wheelTypeTag = wheelType ? `<idWheelType>${wheelType}</idWheelType>` : ''

   const sCity = `<sCity>ст.Троицкая, Крымского района</sCity>`
   const year = `<YearOfMade>${product.donor.ProductionYear}</YearOfMade>`
   const VIN = '<VIN>' + (product.donor.VIN ? product.donor.VIN : product.donor.CarBodyNumber) + '</VIN>'
   const price = `<Price>${product.Price}</Price>`
   const description = {
      openTag: `<Additional>`,
      name: `<p>Название: ${product.ItemName}</p>`,
      number: product.OriginalNo ? `<p>Оригинальный номер: ${product.OriginalNo}</p>` : '',
      article: `<p>Внутренний номер (код): ${product.ID}</p>`,
      text: product.Descr ? `<p>Описание: ${product.Descr}</p>` : '',
      wheel: `<p>Руль: ${wheelTypeName}</p>`,
      drive: product.donor.CarDrive ? `<p>Привод: ${product.donor.CarDrive}</p>` : '',
      transmission: product.donor.Transmission ? `<p>Трансмиссия: ${product.donor.Transmission}</p>` : '',
      body: product.donor.BodyType ? `<p>Тип кузова: ${product.donor.BodyType}</p>` : '',
      defect: product.Defect ? `<p>Дефекты: ${product.Defect}</p>` : '',
      condition: product.Defect ? `<p>Состояние: ${product.Defect}</p>` : `<p>Состояние: хорошее</p>`,
      applicability: `<p>Применимость: ${product.mark.Model}</p>`,
      donor: `<p>Автомобиль донор: ${product.donor.CarFullName}</p>`,
      VIN: product.donor.VIN ? `<p>VIN: ${product.donor.VIN}</p>` : '',
      bodyNum: product.donor.CarBodyNumber ? `<p>Номер кузова: ${product.donor.CarBodyNumber}</p>` : '',
      textSign: product.customText ? product.customText : `<p>В наличии много других запчастей на данный автомобиль - звоните!</p><p>Гарантия!</p><p>Мы поможем установить приобретённую у нас запчасть.</p><p>Доставка в регионы!</p>`,
      closeTag: `</Additional>`
   }
   const images = {
      openTag: `<Photos PhotoDir="" PhotoMain="https://s.auto.drom.ru/i24220/c/photos/fullsize/toyota/camry/toyota_camry_803542.jpg">`,
      url: (() => {
         let imgTag = ''
         for(let imgNum of product.imagesPath) {
            imgTag += `<Photo>${imgNum}</Photo>`
         }
         return imgTag
      })(),
      closeTag: `</Photos>`
   }

   const productXML = WRAPPER.OpenTag + idOffer + markTag + modelTag + sCity + year + VIN + price + frameTypeTag + colorTag + transmissionTag + driveTypeTag + wheelTypeTag + description.openTag + description.name + description.number + description.article + description.text + description.defect + description.wheel  + description.drive  + description.transmission + description.body + description.condition + description.applicability + description.donor + description.VIN + description.bodyNum + description.textSign + description.closeTag + images.openTag + images.url + images.closeTag + WRAPPER.CloseTag

   return productXML
}