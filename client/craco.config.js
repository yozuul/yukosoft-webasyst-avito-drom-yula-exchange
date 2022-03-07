const path = require('path');
const resolvePath = p => path.resolve(__dirname, p)

module.exports = {
    webpack: {
        alias: {
         '@components': resolvePath('./src/components'),
         '@store': resolvePath('./src/store'),
         '@actions': resolvePath('./src/store/actions'),
         '@reducers': resolvePath('./src/store/reducers'),
         '@services': resolvePath('./src/services')
        }
    },
    eslint: {
      enable: false
   },
}