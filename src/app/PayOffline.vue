<template lang="html">
  <create-offlineorder v-show="currentStep === 'order'" :order="orderInfo"></create-offlineorder>
  <select-coupon v-show="currentStep === 'coupon'" :items="orderInfo.couponItem"></select-coupon>
  <coupon-list v-if="orderInfo.availableCouponList.length > 0" v-show="showAvaliCoupons" :items="orderInfo.availableCouponList" :callback="orderInfo.getCouponCallback"></coupon-list>
  <loading :show="loading.show"></loading>
</template>

<script>
import CreateOfflineorder from '../components/CreateOfflineorder'
import SelectCoupon from '../components/SelectCoupon'
import CouponList from '../components/CouponList'
import Loading from '../components/Loading'
import utils from '../js/utils'
import toast from '../js/toast'

export default {
  data: function () {
    return {
      token: localStorage.token,
      loading: {
        show: true
      },
      currentStep: 'order', // 当前显示步骤。service选项目；store选门店；time选时间；person选发型师；order下单
      showAvaliCoupons: false,
      orderInfo: { // 订单初始化数据，包括显示的数据和提交的数据
        shopName: null, // 门店名称
        productNames: null, // 预约产品名称
        productIds: null, // 预约产品id
        couponItem: [], // 优惠券数据
        queueNum: null,
        discountType: null, // 优惠类型，1优惠券，2订单折扣
        orderDiscount: {
          show: false,
          line: null,
          name: null,
          ratio: null,
          state: null
        }, // 订单折扣
        availableCouponList: [],
        getCouponCallback: null,
        orderSubmit: { // 提交订单数据
          id: null,
          payType: 1, // 支付方式
          barberId: null,
          customerName: '', // 用户名称
          customerPhone: '', // 用户手机号
          price: null, // 订单总额
          realPrice: null, // 实付金额
          memo: null, // 订单备注
          couponId: null, // 优惠券id
          isDiscount: null
        }
      }
    }
  },
  computed: {},
  created: function () {
    let self = this
    self.orderInfo.orderSubmit.id = utils.getUrlParam('orderId')
    self.showDetail(self.orderInfo.orderSubmit.id)
    window.onhashchange = function () {
      var hashVal = window.location.hash
      if (hashVal === '') {
        self.currentStep = 'order'
      }else if (hashVal === '#order') {
        self.currentStep = 'order'
      }else if (hashVal === '#coupon') {
        self.currentStep = 'coupon'
      }
    }
  },
  ready: function () {
  },
  attached: function () {},
  events: {
    'show-avali-coupons': function () {
      this.showAvaliCoupons = true
    },
    'hide-avali-coupons': function () {
      this.showAvaliCoupons = false
    },
    'select-coupon': function (id, name, type, money) {
      window.location.hash = 'order'
      this.$broadcast('select-coupon', id, name, type, money)
    },
    'cancel-select-coupon': function () {
      window.location.hash = 'order'
      this.$broadcast('cancel-select-coupon')
    }
  },
  methods: {
    showDetail (orderId) {
      let self = this
      if (self.token) {
        self.loading.show = true
        self.$http.get(window.ctx + '/api/order/t/detail', {orderId: orderId}, {headers: {token: localStorage.token}}).then((response) => {
          let res = response.data
          if (res.code === 0) {
            let orderDetail = res.result
            self.orderInfo.shopName = orderDetail.shopName
            self.orderInfo.queueNum = orderDetail.waitNum
            self.orderInfo.orderSubmit.barberId = orderDetail.barberId
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
            self.orderInfo.orderSubmit.customerName = orderDetail.customerName
            self.orderInfo.orderSubmit.customerPhone = orderDetail.customerPhone

            for (let i = 0; i < orderDetail.productList.length; i++) {
              let productInfo = orderDetail.productList[i]
              self.orderInfo.orderSubmit.price += parseFloat(productInfo.price, 10)
              self.orderInfo.orderSubmit.realPrice += parseFloat(productInfo.price, 10)
            }
            self.$http.get(window.ctx + '/api/discount/detail', {}).then(function (response) {
              self.loading.show = false
              let res = response.data
              if (res.code === 0 && res.result) {
                this.orderInfo.orderDiscount.name = res.result.name
                this.orderInfo.orderDiscount.ratio = res.result.ratio
                this.orderInfo.orderDiscount.line = res.result.line
                this.orderInfo.orderDiscount.state = res.result.state
              }
              if (self.orderInfo.orderDiscount.state === 1 && self.orderInfo.orderSubmit.price >= self.orderInfo.orderDiscount.line) {
                self.orderInfo.orderDiscount.show = true
                self.orderInfo.discountType = 2
              }
            })
            self.getAvilCoupon({'barberId': self.orderInfo.orderSubmit.barberId, 'productIds': self.orderInfo.productIds, 'money': self.orderInfo.orderSubmit.price})
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
    },
    getAvilCoupon: function (requestData) {
      var self = this
      if (localStorage.token) {
        this.loading.show = true
        console.log(requestData)
        this.$http.post(window.ctx + '/api/coupon/t/availableCouponList', requestData, {
          headers: {token: localStorage.token},
          emulateJSON: true
        }).then(function (response) {
          var res = response.data
          if (res.code === 0) {
            this.orderInfo.availableCouponList = res.result
            if (res.result.length > 0) {
              self.orderInfo.getCouponCallback = function () {
                var requestData = {
                  'barberId': self.orderInfo.orderSubmit.barberId,
                  'productIds': self.orderInfo.productIds,
                  'money': self.orderInfo.orderSubmit.price
                }
                self.$http.post(window.ctx + '/api/coupon/t/availableCouponList', requestData, {
                  headers: {token: localStorage.token},
                  emulateJSON: true
                }).then(function (response) {
                  var res = response.data
                  if (res.code === 0) {
                    self.orderInfo.availableCouponList = res.result
                  }
                })
                self.$http.post(window.ctx + '/api/coupon/t/availableList', requestData, {
                  headers: {token: localStorage.token},
                  emulateJSON: true
                }).then(function (response) {
                  var res = response.data
                  if (res.code === 0) {
                    self.orderInfo.couponItem = res.result
                  }
                })
              }
            }
          }
        })
        this.$http.post(window.ctx + '/api/coupon/t/availableList', requestData, {headers: {token: localStorage.token}, emulateJSON: true}).then(function (response) {
          this.loading.show = false
          var res = response.data
          if (res.code === 0) {
            this.orderInfo.couponItem = res.result
            this.$broadcast('cancel-select-coupon')
            // 如果是从优惠券使用进入预约，默认选中使用的优惠券
            if (utils.getUrlParam('couponId')) {
              let couponId = utils.getUrlParam('couponId')
              for (let i = 0; i < this.orderInfo.couponItem.length; i++) {
                this.orderInfo.couponItem[i].id.toString() === couponId
                let item = this.orderInfo.couponItem[i]
                let money
                if (item.type === 1) { // 折扣
                  money = item.discount / 10
                }else if (item.type === 2) {
                  money = item.money
                }else if (item.type === 3) {
                  money = item.quota
                }
                if (couponId === item.id.toString()) {
                  this.$broadcast('select-coupon', item.id, item.name, item.type, money)
                }
              }
            }
          }else if (res.code === 10007) {
            toast('登录已过期，请重新登录')
            setTimeout(function () {
              window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
            }, 1000)
          }else {
            toast('获取可用优惠券失败')
          }
        }, function (response) {
          this.loading.show = false
          toast('获取可用优惠券失败')
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
    CreateOfflineorder,
    SelectCoupon,
    Loading,
    CouponList
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
body {
  background: #eaeaea;
}
</style>
