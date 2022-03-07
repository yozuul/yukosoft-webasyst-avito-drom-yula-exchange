class Record {
   async add(data, id) {
      const { table, fields } = data
      try {
         const record = await table.create(fields)
         id = record.null
      } catch (err) {
         console.log(err)
         return false
      }
      return id
   }

   async find(data) {
      const { table, where, att } = data
      try {
         const updateLog = await table.findOne({
            where: where,
            attributes: att
         })
          if(updateLog) {
            return updateLog.dataValues
          } else {
            return null
          }
      } catch (err) {
         console.log(err)
         return false
       }
   }

   async findAll(data) {
      const { table, where, att } = data
      try {
         const updateLog = await table.findAll({
            where: where,
            attributes: att
         })
          if(updateLog) {
            return updateLog
          } else {
            return null
          }
      } catch (err) {
         console.log(err)
         return false
       }
   }

   async tryFind(data) {
      const { table, value, where } = data
      try {
         const updateLog = await table.findAll({
            where: where
          })
          if(updateLog) {
            return updateLog[0].dataValues
          }
      } catch (err) {
         return value
       }
   }

   async update(data) {
      const { table, fields, where } = data
      try {
         const updateLog = await table.update(fields, {
            where: where
         })
         return updateLog
      } catch (err) {
         console.log(err)
      }
   }

   async delete(data) {
      const { table, where } = data
      try {
         table.destroy({
            where: where
         })
      } catch (err) { console.log(err) }
   }
}

export default new Record()