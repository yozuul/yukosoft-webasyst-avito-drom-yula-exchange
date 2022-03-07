export const prepareProducts = (products) => {

   const productsArray = products.map((card) => {
   const nomenclatures = card.nomenclatures[0].addin
   const photos = nomenclatures.find(addins => addins.type === 'Фото')
   const properties = card.addin
   const brand = properties.find(props => props.type === 'Бренд')
   const name = properties.find(props => props.type === 'Наименование')

   return {
         id: card.id,
         imtId: card.imtId,
         name: name.params[0].value,
         image: photos ? photos.params[0].value : 'https://kristalls.ru/wp-content/themes/crystal/img/no-image.png',
         brand: brand.params[0].value,
         subcat: card.object,
         cat: card.parent,
      }
   })

   return productsArray
}