<template lang="html">
  <create-offlineorder :order="orderInfo"></create-offlineorder>
  <loading :show="loading.show"></loading>
</template>

<script>
import Loading from '../components/Loading'
import CreateOfflineorder from '../components/CreateOfflineorder.vue'
import utils from '../js/utils'
import toast from '../js/toast'

export default {
  data () {
    return {
      token: localStorage.token,
      loading: {
        show: true
      },
      orderInfo: { // 订单初始化数据，包括显示的数据和提交的数据
        shopName: null, // 门店名称
        productNames: null, // 预约产品名称
        productIds: null, // 预约产品id
        queueNum: null,
        orderDiscount: {
          show: false,
          line: null,
          name: null,
          ratio: null
        },
        orderSubmit: { // 提交订单数据
          id: null,
          payType: 1, // 支付方式
          price: null, // 订单总额
          realPrice: null, // 实付金额
          couponId: null,
          isDiscount: null,
          memo: null // 订单备注
        }
      }
    }
  },
  computed: {},
  created () {
    var self = this
    self.orderInfo.orderSubmit.id = utils.getUrlParam('orderId')
    self.showDetail(self.orderInfo.orderSubmit.id)
  },
  ready () {
  },
  attached () {},
  events: {
  },
  methods: {
    showDetail (orderId) {
      let self = this
      if (self.token) {
        self.loading.show = true
        self.$http.get(window.ctx + '/api/order/t/detail', {orderId: orderId}, {headers: {token: localStorage.token}}).then((response) => {
          self.loading.show = false
          let res = response.data
          if (res.code === 0) {
            let orderDetail = res.result
            self.orderInfo.shopName = orderDetail.shopName
            self.orderInfo.queueNum = orderDetail.waitNum

            let productNameString = ''
            let productIdString = ''
            for (let index = 0; index < orderDetail.productList.length; index++) {
              if (index > 0) {
                productNameString += ','
                productIdString += ','
              }
              productNameString += orderDetail.productList[index].productName
              productIdString += orderDetail.productList[index].id
            }
            self.orderInfo.productNames = productNameString
            self.orderInfo.productIds = productIdString
            self.orderInfo.orderSubmit.price = 0
            self.orderInfo.orderSubmit.realPrice = 0
            for (let i = 0; i < orderDetail.productList.length; i++) {
              let productInfo = orderDetail.productList[i]
              self.orderInfo.orderSubmit.price += parseFloat(productInfo.price, 10)
              self.orderInfo.orderSubmit.realPrice += parseFloat(productInfo.price, 10)
            }

            this.$http.get(window.ctx + '/api/discount/detail', {}).then(function (response) {
              let res = response.data
              if (res.code === 0 && res.result) {
                self.orderInfo.orderDiscount.name = res.result.name
                self.orderInfo.orderDiscount.ratio = res.result.ratio
                self.orderInfo.orderDiscount.line = res.result.line
                if (res.result.state === 1 && self.orderInfo.orderSubmit.price >= res.result.line) {
                  self.orderInfo.orderDiscount.show = true
                  self.orderInfo.orderSubmit.isDiscount = 1
                  self.orderInfo.orderSubmit.realPrice = (self.orderInfo.orderSubmit.realPrice * res.result.ratio / 100).toFixed(2)
                }
              }
            })
          }else if (res.code === 10007) {
            toast('登录已过期，请重新登录')
            setTimeout(function () {
              window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
            }, 1000)
          }
        }, (response) => {
          self.loading.show = false
        })
      }else {
        toast('请先登录')
        setTimeout(function () {
          window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
        }, 1000)
      }
    }
  },
  components: {
    Loading,
    CreateOfflineorder
  }
}
</script>

<style lang="sass">
  @import '../assets/css/style.scss'
</style>
<style>
  html, body {
    height: 100%;
  }
</style>
