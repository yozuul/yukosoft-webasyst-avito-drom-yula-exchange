import cron from 'node-cron'
import { green, darkGray, red, yellow } from 'ansicolor'

import { ProductUpater, ExportAvito, SyncImages } from './services'
import { ActionSSH } from './utils'

new ProductUpater().checkNew()
// new SyncImages().checkSyncImages()
// new ExportAvito().checkNew()
// ActionSSH.clean.imagesLocalAll()


const startCron = () => {
   cron.schedule('*/2 * * * *', () => {
      console.log(('Запуск задачи ProductUpater. Интервал 1 мин').green);
      new ProductUpater().checkNew()
      console.log(new Date());
   })
   cron.schedule('*/3 * * * *', () => {
      console.log(('Запуск задачи SyncImages. Интервал 1 мин').green);
      new SyncImages().checkSyncImages()
      console.log(new Date());
   })
}

// startCron()

const signalName = ['SIGINT', 'SIGTERM', 'SIGQUIT']
signalName.map((signal) => {
   process.on(signal, () => process.exit())
})