var config = require('./webpack.base.config')

config.devtool = 'eval-source-map'

config.devServer = {
  noInfo: true,
  proxy: {
    '/api/*': {
      target: 'http://139.196.87.99',
      secure: false
    }
  }
}

module.exports = config
