import { green, darkGray, red, yellow } from 'ansicolor'

import { imageFolders, sftConfig } from '../config/config.default'
import { ActionSSH } from '../utils'

class SyncImages {

   checkSyncImages() {
      console.log(('Проверяем, новые или удалённые картинки для синхронизации...').green)

      const localProtectedSyncPath = imageFolders.local.protected.absolute
      const localPublicSyncPath = imageFolders.local.public.absolute

      const remoteProtectedSyncPath = imageFolders.remote.protected
      const remotePublicSyncPath = imageFolders.remote.public

      const syncProtected = `sshpass -p "${sftConfig.hosting.password}" rsync -zrvh --ignore-existing --ignore-existing --delete ${localProtectedSyncPath}/ ${sftConfig.hosting.username}@${sftConfig.hosting.host}:${remoteProtectedSyncPath}`

      const syncPublic = `sshpass -p "${sftConfig.hosting.password}" rsync -zrvh --ignore-existing --delete ${localPublicSyncPath}/ ${sftConfig.hosting.username}@${sftConfig.hosting.host}:${remotePublicSyncPath}`

      this.syncDataSSH([syncProtected, syncPublic])

   }

   syncDataSSH(filePath) {
      filePath.map((cmd) => {
         ActionSSH.sync(cmd)
      })
   }
}

export { SyncImages }