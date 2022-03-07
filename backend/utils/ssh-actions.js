import { NewSSH } from './ssh-command'
import { imageFolders, sshCommand, sftConfig } from '../config/config.default'

class ActionSSH {
   get clean() {
      return {
         imagesLocalAll: () => {
            const imagePath = [
               imageFolders.local.public.absolute,
               imageFolders.local.protected.absolute
            ]
            imagePath.map((folder) => {
               const cmd = `${sshCommand.delFolders}${folder}/*`
               new NewSSH(sftConfig.vps).command(cmd)
            })
         },
         imagesLocalRemoved: (folder) => {
            const cmd = `${sshCommand.delFolders}${folder}`
            console.log(cmd);
            new NewSSH(sftConfig.vps).command(cmd)
         }
      }
   }
   sync(cmd) {
      new NewSSH(sftConfig.vps).command(cmd)
   }
}

export default new ActionSSH()