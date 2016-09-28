import Vue from 'vue'
import StaticInfo from '../app/StaticInfo'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.timeout = 30000
/* eslint-disable no-new */
new Vue({
  el: 'body',
  data () {
    return {
      title: '关于我们',
      content:
        ['东瀛美空间是由上海美发领导品牌东瀛造型2015年3月推出的发型师1对1服务的品牌，为顾客提供一个透明、安全、便捷、超值的美发体验空间，顾客可通过东瀛美空间微信平台完成预约支付，并且可以在线选择发型师、发型、价格、然后去附近的美空间门店享受美发服务，目前已在北京、上海繁 华商业圈开设多家门店。']
    }
  },
  components: { StaticInfo }
})
