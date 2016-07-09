var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");//提取css到单独文件
var HtmlWebpackPlugin = require('html-webpack-plugin');//自动生成html
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
    comment: './src/entrys/comment.js',
    hair: './src/entrys/hair.js',
    shopbarber: './src/entrys/shopbarber.js',
    collection: './src/entrys/collection.js',
    resetpwd: './src/entrys/resetpwd.js'
  },
  output: {
    path: './dist',//输出文件目录
    publicPath: 'http://localhost:8080/dist/',//使用绝对地址磁能进入debug模式
    filename: 'js/[name].[hash].js'//js输出的路径和名称
  },
  externals: {//不打包在一起的js。需要在页面上用script标签引入
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    alias: {

    }
  },
  plugins: [
    new ExtractTextPlugin("css/[name].[hash].css"),//css单独输出到dist下
    new HtmlWebpackPlugin({
      template: 'src/html/index.html',
      filename: 'html/index.html',
      //chunks这个参数告诉插件要引用entry里面的哪几个入口
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/login.html',
      filename: 'html/login.html',
      chunks: ['login']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/regist.html',
      filename: 'html/regist.html',
      chunks: ['regist']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/findpwd.html',
      filename: 'html/findpwd.html',
      chunks: ['findpwd']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/mycoupon.html',
      filename: 'html/mycoupon.html',
      chunks: ['mycoupon']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/myorder.html',
      filename: 'html/myorder.html',
      chunks: ['myorder']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/alldressers.html',
      filename: 'html/alldressers.html',
      chunks: ['hairdresser']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/hairDresserDetail.html',
      filename: 'html/barberDetail.html',
      chunks: ['hairDresserDetail']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/allStore.html',
      filename: 'html/allstore.html',
      chunks: ['allStore']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/storeDetail.html',
      filename: 'html/storedetail.html',
      chunks: ['storeDetail']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/hairlist.html',
      filename: 'html/hairlist.html',
      chunks: ['hairList']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/hair.html',
      filename: 'html/hair.html',
      chunks: ['hair']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/shopbarber.html',
      filename: 'html/shopbarber.html',
      chunks: ['shopbarber']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/usercenter.html',
      filename: 'html/usercenter.html',
      chunks: ['usercenter']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/personalData.html',
      filename: 'html/personalData.html',
      chunks: ['personalData']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/collection.html',
      filename: 'html/collection.html',
      chunks: ['collection']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/resetpwd.html',
      filename: 'html/resetpwd.html',
      chunks: ['resetpwd']
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
