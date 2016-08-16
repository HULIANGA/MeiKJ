import Vue from 'vue'
import StaticInfo from '../app/StaticInfo'
import VueResource from 'vue-resource'
Vue.use(VueResource)
/* eslint-disable no-new */
new Vue({
  el: 'body',
  data () {
    return {
      title: '售后保障',
      content:
      [
        '1、东瀛美空间所使用的产品均为东瀛定制或世界知名品牌，同时配备了世界最前沿科技的美发设备，为您的头发保驾护航不受到伤害！',
        '2、如果您对发型或者服务有任何的不满意，我们提供15天的无理由免费调整或者重做，对烫染需要重做的顾客，我们还将提供瞬间修护护理来保护您的头发不再受到2次伤害，为了您的方便我们还可以为您安排同一城市内的任何一家门店服务， 同时应您的要求我们可以给您更换设计师。',
        '3、您可以拨打全国统一售后电话 <a href="tel:4008207213">4008207213</a> ，客服会在第一时间为您服务并给您一个满意的回复。'
      ]
    }
  },
  components: { StaticInfo }
})
