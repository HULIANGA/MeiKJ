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
        return ['丽人淘造型是一家互联网美发品牌，推崇不推销、不卖卡、不掺假、没有隐形消费、承诺品质保障，不满意免费重做的宗旨，致在为每位 顾客提供透明、安全、超值、便捷、轻松、愉悦的消费环境。']
      } else if (window.systemType === 'DY') {
        return ['东瀛造型是一家以简约、休闲日式发型为主的专业美发沙龙，致力于研究将欧洲立体剪裁和亚洲人的柔合线条相融合，创造出适合亚洲人简洁、舒适的发型风格，重新定义了自然时尚的东方新上班族形象。公司拥有强大的国际技术团队、世界品牌产品的支持、超值的服务和个性舒适的美发空间给顾客非凡感观体验。']
      }
    }
  },
  components: { StaticInfo }
})
