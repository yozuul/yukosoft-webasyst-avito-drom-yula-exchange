import { Client } from'ssh2'

class NewSSH {
   constructor(config) {
      this.config = config
   }
   command(cmd) {
      const connection = new Client()
      connection.on('ready', () => {
         console.log('Client :: ready')
         connection.exec(cmd, (err, stream) => {
            if (err) throw err;
            stream.on('close', (code, signal) => {
               console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
               connection.end()
            }).on('data', (data) => {
               console.log('STDOUT: ' + data)
            }).stderr.on('data', (data) => {
               console.log('STDERR: ' + data)
            })
         })
      })
      .connect(this.config);
   }
}

export { NewSSH }