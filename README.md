一、目录说明
1.build
  webpack配置文件

2.dist
  编译目标目录

3.src
  所有的本地项目代码

  src/app
    对应每个html的vue组件

  src/assets
    css和图片

  src/components
    组件

  src/entrys
    对应每个app组件的入口js

  src/html
    页面模板

  src/js
    自己封装的js方法

  src/libs
    第三方js库和第三方json数据

4.static
  临时使用的图片和json数据文件，不会打包到发布项目中

二、配置文件
.babelrc                babel配置文件
.editorconfig           sublime编辑配置文件 https://packagecontrol.io/packages/EditorConfig
.eslintrc               eslint配置文件
package.json            npm配置文件

三、how to start
install dependencies
npm install

clean dist
npm run clean

build for production with minification
npm run build

serve with hot reload at localhost:8080
npm run dev

serve with hot reload at port:8080
npm run dev-port

run unit tests
npm test

四、html说明
1.main.html               首页
2.allDresser.html              所有发型师列表
3.allStore.html.html                所有门店
4.apointment.html              预约
5.collection.html              我的收藏
6.couponStore.html             优惠专区
7.dresserDetail.html           发型师详情
8.evaluationList.html          评论列表
9.findPwd.html                 找回密码
10.hairDetail.html             发型详情
11.hairList.html               发型列表
12.login.html                  登录
13.myCoupon.html               我的优惠券
14.myOrder.html                我的订单
15.personalData.html           个人资料
16.regist.html                 注册
17.resetPwd.html               重置密码
18.shopDresser.html            门店发型师列表
19.storeDetail.html            门店详情
20.userCenter.html             个人中心
21.writeComment.html           填写评论
