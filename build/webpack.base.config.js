var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin"); //提取css到单独文件
var HtmlWebpackPlugin = require('html-webpack-plugin'); //自动生成html
var AddScriptPathPlugin = require('./addScriptPath');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var distPath = './dist'; //输出文件目录

var resourcePath = 'http://localhost:8080/dist/'; //js和css的引用路径；开发debugger
// var resourcePath = '../';//js和css的引用路径；生产

module.exports = {
  debug: true,
  entry: { //入口js
    main: './src/entrys/main.js',
    login: './src/entrys/login.js',
    regist: './src/entrys/regist.js',
    findPwd: './src/entrys/findPwd.js',
    allStore: './src/entrys/allStore.js',
    storeDetail: './src/entrys/storeDetail.js',
    shopDresser: './src/entrys/shopDresser.js',
    allDresser: './src/entrys/allDresser.js',
    dresserDetail: './src/entrys/dresserDetail.js',
    hairList: './src/entrys/hairList.js',
    hairDetail: './src/entrys/hairDetail.js',
    userCenter: './src/entrys/userCenter.js',
    myCoupon: './src/entrys/myCoupon.js',
    myOrder: './src/entrys/myOrder.js',
    couponStore: './src/entrys/couponStore.js',
    personalData: './src/entrys/personalData.js',
    comment: './src/entrys/comment.js',
    collection: './src/entrys/collection.js',
    resetpwd: './src/entrys/resetpwd.js',
    apointment: './src/entrys/apointment.js',
    evaluationList: './src/entrys/evaluationList.js'
      // base: './src/entrys/base.js'
  },
  output: {
    path: distPath, //输出文件目录
    publicPath: resourcePath, //使用绝对地址才能进入debug模式
    filename: 'js/[name].[hash].js' //js输出的路径和名称
  },
  externals: { //不打包在一起的js。需要在页面上用script标签引入
    // 'vue': 'Vue',
    // 'vue-resource': 'VueResource'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    alias: {

    }
  },
  plugins: [
    new ExtractTextPlugin("css/[name].[hash].css"), //css单独输出到dist下
    new webpack.optimize.CommonsChunkPlugin('js/common.js'),
    new AddScriptPathPlugin({
      paths: [resourcePath + 'js/base', resourcePath + 'js/common'],
    }),
    new CopyWebpackPlugin([
      // {output}/to/file.txt
      {
        from: './src/js/base.js',
        to: 'js/base.js'
      },
    ]),
    new HtmlWebpackPlugin({
      template: 'src/html/main.html',
      filename: 'html/main.html',
      //chunks这个参数告诉插件要引用entry里面的哪几个入口
      chunks: ['main']
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
      template: 'src/html/findPwd.html',
      filename: 'html/findPwd.html',
      chunks: ['findPwd']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/allStore.html',
      filename: 'html/allStore.html',
      chunks: ['allStore']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/storeDetail.html',
      filename: 'html/storeDetail.html',
      chunks: ['storeDetail']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/shopDresser.html',
      filename: 'html/shopDresser.html',
      chunks: ['shopDresser']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/allDresser.html',
      filename: 'html/allDresser.html',
      chunks: ['allDresser']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/dresserDetail.html',
      filename: 'html/dresserDetail.html',
      chunks: ['dresserDetail']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/hairList.html',
      filename: 'html/hairList.html',
      chunks: ['hairList']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/hairDetail.html',
      filename: 'html/hairDetail.html',
      chunks: ['hairDetail']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/userCenter.html',
      filename: 'html/userCenter.html',
      chunks: ['userCenter']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/myCoupon.html',
      filename: 'html/myCoupon.html',
      chunks: ['myCoupon']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/myOrder.html',
      filename: 'html/myOrder.html',
      chunks: ['myOrder']
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
      template: 'src/html/resetPwd.html',
      filename: 'html/resetPwd.html',
      chunks: ['resetPwd']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/apointment.html',
      filename: 'html/apointment.html',
      chunks: ['apointment']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/couponStore.html',
      filename: 'html/couponStore.html',
      chunks: ['couponStore']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/evaluationList.html',
      filename: 'html/evaluationList.html',
      chunks: ['evaluationList']
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/writeComment.html',
      filename: 'html/writeComment.html',
      chunks: ['comment']
    })
  ],
  module: {
    loaders: [{
      test: /\.vue$/,
      loader: 'vue'
    }, {
      test: /\.js$/,
      loader: 'babel!eslint',
      // make sure to exclude 3rd party code in node_modules
      exclude: /(node_modules|src\/libs)/
    }, {
      // edit this for additional asset file types
      test: /\.(png|jpg|gif)$/,
      loader: 'url',
      query: {
        limit: 10000, //小于10k的图片转换为base64编码
        name: 'img/[name].[ext]?[hash]' //大于10k图片输出目录和名称
      }
    }]
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
