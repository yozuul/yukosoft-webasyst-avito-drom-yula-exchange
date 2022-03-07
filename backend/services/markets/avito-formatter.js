export const avitoXmlUnit = (product) => {
   const WRAPPER = {
      OpenTag: '<Ad>', CloseTag: '</Ad>'
   }
   const productID = `<Id>${product.ID}</Id>`
   const allowEmail = `<AllowEmail>Да</AllowEmail>`
   const managerName = `<ManagerName>Вячеслав</ManagerName>`
   const contactPhone = `<ContactPhone>+${product.company_phone}</ContactPhone>`
   const companyAdress = `<Address>${product.company_adress}</Address>`
   const longitude = `<Longitude>38.100712</Longitude>`
   const latitude = `<Latitude>45.150327</Latitude>`
   const adType = `<AdType>Товар приобретен на продажу</AdType>`
   const condition = `<Condition>Б/у</Condition>`
   const category = `<Category>Запчасти и аксессуары</Category>`
   const typeId = product.avitoCategory ? `<TypeId>${product.avitoCategory}</TypeId>` : ''
   const title = `<Title>${product.ItemName.split(' ')[0]} ${product.mark.Model}</Title>`
   const wheelType = product.donor.RightWheel ? 'правый' : 'левый'
   const description = {
      openTag: `<Description><![CDATA[`,
      name: `<p>Название: ${product.ItemName}</p>`,
      number: product.OriginalNo ? `<p>Оригинальный номер: ${product.OriginalNo}</p>` : '',
      article: `<p>Внутренний номер (код): ${product.ID}</p>`,
      text: product.Descr ? `<p>Описание: ${product.Descr}</p>` : '',
      wheel: `<p>Руль: ${wheelType}</p>`,
      drive: product.donor.CarDrive ? `<p>Привод: ${product.donor.CarDrive}</p>` : '',
      transmission: product.donor.Transmission ? `<p>Трансмиссия: ${product.donor.Transmission}</p>` : '',
      body: product.donor.BodyType ? `<p>Тип кузова: ${product.donor.BodyType}</p>` : '',
      defect: product.Defect ? `<p>Дефекты: ${product.Defect}</p>` : '',
      condition:`<p>Состояние: хорошее</p>`,
      applicability: `<p>Применимость: ${product.mark.Model}</p>`,
      donor: `<p>Автомобиль донор: ${product.donor.CarFullName}</p>`,
      VIN: product.donor.VIN ? `<p>VIN: ${product.donor.VIN}</p>` : '',
      bodyNum: product.donor.CarBodyNumber ? `<p>Номер кузова: ${product.donor.CarBodyNumber}</p>` : '',
      textSign: product.customText ? product.customText : `<p>В наличии много других запчастей на данный автомобиль - звоните!</p><p>Гарантия!</p><p>Мы поможем установить приобретённую у нас запчасть.</p><p>Доставка в регионы!</p>`,
      closeTag: `]]></Description>`
   }
   const price = `<Price>${product.Price}</Price>`
   // const oem = product.donor.CarBodyNumber ? `<OEM>${product.donor.CarBodyNumber}</OEM>` : ''
   // const defect = product.Defect ? `<RimDiameter>Дефект: ${product.Defect}</RimDiameter>` : ''
   const images = {
      openTag: `<Images>`,
      url: (() => {
         let imgTag = ''
         for(let imgNum of product.imagesPath) {
            imgTag += `<Image url="${imgNum}" />`
         }
         return imgTag
      })(),
      closeTag: `</Images>`
   }

   const productXML = WRAPPER.OpenTag + productID + allowEmail + managerName + contactPhone + companyAdress + longitude + latitude + adType + condition + category + typeId + title + description.openTag + description.name + description.number + description.article + description.text + description.defect + description.wheel + description.drive  + description.transmission + description.body + description.condition + description.applicability + description.donor + description.VIN + description.bodyNum + description.textSign + description.closeTag + price + images.openTag + images.url + images.closeTag + WRAPPER.CloseTag

   return productXML
}