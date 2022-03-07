import {} from 'dotenv/config'

const env = process.env

const db = {
   mssql: {
      host: env.DB_MsSQL_HOST,
      user: env.DB_MsSQL_USER,
      password: env.DB_MsSQL_PASS,
      database: env.DB_MsSQL_NAME,
      dialect: 'mssql'
   },
   mysql: {
      host: env.DB_MySQL_HOST,
      user: env.DB_MySQL_USER,
      password: env.DB_MySQL_PASS,
      database: env.DB_MySQL_NAME,
      dialect: 'mysql'
   },
   pg: {
      host: env.DB_PG_HOST,
      user: env.DB_PG_USER,
      password: env.PG_PASS,
      database: env.DB_PG_DB,
      dialect: 'postgres'
   },
}

const basicImageFolders = {
   local: {
      relative: '.exports/temp/img',
      absolute: '/home/avtorazbor-exchange/.exports/temp/img',
   },
   remote: `/var/www/u1439241/data/www/${env.DOMAIN_NAME}/wa-data`,
}

const imageFolders = {
   local: {
      basic: {
         relative: `${basicImageFolders.local.relative}`,
         absolute: `${basicImageFolders.local.absolute}`
      },
      public: {
         relative: `${basicImageFolders.local.relative}/public`,
         absolute: `${basicImageFolders.local.absolute}/public`
      },
      protected: {
         relative: `${basicImageFolders.local.relative}/protected`,
         absolute: `${basicImageFolders.local.absolute}/protected`
      }
   },
   remote: {
      basic: basicImageFolders.remote,
      public: `${basicImageFolders.remote}/public/shop/products`,
      protected: `${basicImageFolders.remote}/protected/shop/products`,
   }
}

const sftConfig = {
   vps: {
      host: env.VPS_HOST,
      port: env.VPS_PORT,
      username: env.VPS_USER,
      password: env.VPS_PASS
   },
   hosting: {
      host: env.HOSTING_HOST,
      port: env.HOSTING_PORT,
      username: env.HOSTING_USER,
      password: env.HOSTING_PASS
   }
}

const sshCommand = {
   delFolders: 'sudo rm -rf '
}

const resizer = [
   // {
   //    postfix: '970',
   //    size: {
   //       width: 970,
   //       height: 970
   //    }
   // },
   {
      postfix: '600',
      size: {
         width: 600,
      }
   },
   {
      postfix: '400',
      size: {
         width: 400,
         height: 400
      }
   },
   {
      postfix: '200x0',
      size: {
         width: 200,
         height: 180
      }
   },
   {
      postfix: '96x96',
      size: {
         width: 96,
         height: 96
      }
   },
   {
      postfix: '75x75',
      size: {
         width: 75,
         height: 75
      }
   },
   // {
   //    postfix: '750x0',
   //    size: {
   //       width: 750
   //    }
   // },
   // {
   //    postfix: '750',
   //    size: {
   //       width: 750,
   //       height: 750
   //    }
   // },
   // {
   //    postfix: '48x48',
   //    size: {
   //       width: 48,
   //       height: 48
   //    },
   // },
   // {
   //    postfix: '0x320',
   //    size: {
   //       width: 450,
   //       height: 320
   //    },
   // }
]

export { db, imageFolders, sftConfig, resizer, sshCommand }