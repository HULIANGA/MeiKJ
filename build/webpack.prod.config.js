var webpack = require('webpack')
var path = require('path')
require('shelljs/global') //让node.js可以使用Linux命令，比如文件夹操作
var config = require('./webpack.base.config')

var distPath = path.resolve(__dirname, '../dist'); //输出文件目录
rm('-rf', distPath)
mkdir('-p', distPath)

config.plugins = (config.plugins || []).concat([
  // this allows uglify to strip all warnings
  // from Vue.js source code.
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  // This minifies not only JavaScript, but also
  // the templates (with html-minifier) and CSS (with cssnano)!
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.optimize.OccurenceOrderPlugin()
])

module.exports = config
