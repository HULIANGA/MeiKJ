var config = require('./webpack.base.config')

config.devtool = '#source-map'

config.devServer = {
  noInfo: true,
  proxy: {
    '/api/*': {
      // target: 'http://company1.bigaka.com:9552',
       target: 'http://139.196.87.99/mkj', // 测试环境
      // target: 'http://192.168.1.114:8080/mkj',
      // target: 'http://192.168.1.94:8080/mkj',
      secure: false
    },
    '/json/*': {
      target: 'http://company1.bigaka.com:9001/test1/',
      secure: false
    }
  }
}

module.exports = config
