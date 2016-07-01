var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  debug: true,
  entry: {//入口js
    index: './src/entrys/main.js',
    hairList: './src/entrys/hairList.js',
    hairdresser: './src/entrys/hairdresser.js',
    hairDresserDetail: './src/entrys/hairDresserDetail.js',
    allStore: './src/entrys/allStore.js',
    storeDetail: './src/entrys/storeDetail.js',
    login: './src/entrys/login.js',
    regist: './src/entrys/regist.js',
    findpwd: './src/entrys/findpwd.js',
    couponstore: './src/entrys/couponstore.js',
    mycoupon: './src/entrys/mycoupon.js',
    personalData: './src/entrys/personalData.js',
    myorder: './src/entrys/myorder.js',
    usercenter: './src/entrys/usercenter.js',
    selectstore: './src/entrys/selectstore.js',
    selectperson: './src/entrys/selectperson.js',
    selectitem: './src/entrys/selectitem.js',
    order: './src/entrys/order.js',
    reservetime: './src/entrys/reservetime.js',
    comment: './src/entrys/comment.js'
  },
  output: {
    path: './dist',//输出文件目录
    publicPath: 'http://localhost:8080/dist/',//使用绝对地址磁能进入debug模式
    filename: 'js/[name].js'//js输出的路径和名称
  },
  externals: {//不打包在一起的js。需要在页面上用script标签引入

  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    alias: {

    }
  },
  plugins: [
    new ExtractTextPlugin("css/[name].css"),//css单独输出到./dist下
    new HtmlWebpackPlugin({
      filename: 'html/index.html',
      template: 'html/index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      filename: 'html/login.html',
      template: 'html/login.html',
      chunks: ['login']
    }),
    new HtmlWebpackPlugin({
      filename: 'html/regist.html',
      template: 'html/regist.html',
      chunks: ['regist']
    }),
    new HtmlWebpackPlugin({
      filename: 'html/findpwd.html',
      template: 'html/findpwd.html',
      chunks: ['findpwd']
    }),
    new HtmlWebpackPlugin({
      filename: 'html/mycoupon.html',
      template: 'html/mycoupon.html',
      chunks: ['mycoupon']
    }),
    new HtmlWebpackPlugin({
      filename: 'html/myorder.html',
      template: 'html/myorder.html',
      chunks: ['myorder']
    })
  ],
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel!eslint',
        // make sure to exclude 3rd party code in node_modules
        exclude: /(node_modules|service)/
      },
      {
        // edit this for additional asset file types
        test: /\.(png|jpg|gif)$/,
        loader: 'url',
        query: {
          limit: 10000,//小于10k的图片转换为base64编码
          name: 'img/[name].[ext]?[hash]'//大于10k图片输出目录和名称
        }
      }
    ]
  },
  // vue-loader config:
  // lint all JavaScript inside *.vue files with ESLint
  // make sure to adjust your .eslintrc
  vue: {
    loaders: {
      js: 'babel!eslint',
      css: ExtractTextPlugin.extract("css"),
      sass: ExtractTextPlugin.extract("css!sass")
    }
  }
}
