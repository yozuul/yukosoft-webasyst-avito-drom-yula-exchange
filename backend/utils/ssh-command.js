import { Client } from'ssh2'
import { green, darkGray, red } from 'ansicolor'

class NewSSH {
   constructor(config) {
      this.config = config
   }
   command(cmd) {
      const conn = new Client();
      conn.on('ready', () => {
      console.log('Client :: ready');
      conn.exec(cmd, (err, stream) => {
         if (err) throw err;
         stream.on('close', (code, signal) => {
            console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
            conn.end();
         }).on('data', (data) => {
            console.log('STDOUT: ' + data);
         }).stderr.on('data', (data) => {
            console.log('STDERR: ' + data);
         });
      });
      }).connect(this.config);
   }
}

export { NewSSH }