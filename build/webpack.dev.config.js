var config = require('./webpack.base.config')

config.devtool = 'eval-source-map'

config.devServer = {
  noInfo: true,
  proxy: {
    '/api/*': {
      // target: 'http://company1.bigaka.com:9552',
      target: 'http://139.196.87.99',
      secure: false
    },
    '/json/*': {
      target: 'http://company1.bigaka.com:9001/test1/',
      secure: false
    }
  }
}

module.exports = config
