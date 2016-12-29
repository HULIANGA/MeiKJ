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
      title: '关于我们'
    }
  },
  computed: {
    content: function () {
      if (window.systemType === 'MKJ') {
        return ['丽人淘是由上海美发领导品牌东瀛造型2015年3月推出的发型师1对1服务的品牌，为顾客提供一个透明、安全、便捷、超值的美发体验空间，顾客可通过丽人淘微信平台完成预约支付，并且可以在线选择发型师、发型、价格、然后去附近的丽人淘门店享受美发服务，目前已在北京、上海繁 华商业圈开设多家门店。']
      } else if (window.systemType === 'DY') {
        return ['东瀛造型是一家以简约、休闲日式发型为主的专业美发沙龙，致力于研究将欧洲立体剪裁和亚洲人的柔合线条相融合，创造出适合亚洲人简洁、舒适的发型风格，重新定义了自然时尚的东方新上班族形象。公司拥有强大的国际技术团队、世界品牌产品的支持、超值的服务和个性舒适的美发空间给顾客非凡感观体验。']
      }
    }
  },
  components: { StaticInfo }
})
