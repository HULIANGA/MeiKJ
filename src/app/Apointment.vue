<template lang="html">
  <select-item v-show="currentStep === 'service'" :items="serviceItem"></select-item>
  <select-store v-show="currentStep === 'store'"></select-store>
  <select-time v-show="currentStep === 'time'" :hours="maxHours" :shopid="shopId"></select-time>
  <select-person v-show="currentStep === 'person'" :items="personItem"></select-person>
  <create-order v-show="currentStep === 'order'" :order="orderInfo"></create-order>
  <select-coupon v-show="currentStep === 'coupon'" :items="orderInfo.couponItem"></select-coupon>
  <loading :show="loading.show"></loading>
</template>

<script>
import SelectItem from '../components/SelectItem'
import SelectStore from '../components/SelectStore'
import SelectTime from '../components/SelectTime'
import SelectPerson from '../components/SelectPerson'
import CreateOrder from '../components/CreateOrder'
import SelectCoupon from '../components/SelectCoupon'
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
      maxHours: null, // 消耗时间
      shopId: null, // 门店id
      serviceItem: null, // 项目数据
      timeItem: null, // 时间数据
      personItem: null, // 发型师数据
      currentStep: 'service', // 当前显示步骤。service选项目；store选门店；time选时间；person选发型师；order下单
      orderInfo: { // 订单初始化数据，包括显示的数据和提交的数据
        shopName: null, // 门店名称
        barberName: null, // 发型师名称
        timeString: null, // 预约时间
        productNames: null, // 预约产品名称
        productIds: null, // 预约产品id
        couponItem: [], // 优惠券数据
        orderSubmit: { // 提交订单数据
          productList: [], // 产品信息
          payType: 1, // 支付方式
          shopId: null, // 门店id
          customerName: null, // 用户名称
          customerPhone: localStorage.loginphone, // 用户手机号
          date: null, // 预约日期
          time: null, // 预约时间
          barberId: null, // 发型师id
          price: null, // 订单总额
          realPrice: null, // 实付金额
          memo: null, // 订单备注
          couponId: null // 优惠券id
        }
      }
    }
  },
  computed: {},
  created: function () {
    if (window.location.hash !== '') {
      window.location.hash = ''
    }
    let requestData = {}
    if (utils.getUrlParam('shopId')) {
      requestData.shopId = utils.getUrlParam('shopId')
    }
    if (utils.getUrlParam('personId')) {
      requestData.barberId = utils.getUrlParam('personId')
    }
    if (utils.getUrlParam('couponId')) { // 从我的优惠券进入预约
      requestData.couponId = utils.getUrlParam('couponId')
    }
    this.getProject(requestData)
  },
  ready: function () {
    var self = this
    window.onhashchange = function () {
      var hashVal = window.location.hash
      if (hashVal === '') {
        self.currentStep = 'service'
      }else if (hashVal === '#time') {
        self.currentStep = 'time'
        self.$broadcast('time-show')
      }else if (hashVal === '#store') {
        self.currentStep = 'store'
      }else if (hashVal === '#person') {
        self.currentStep = 'person'
      }else if (hashVal === '#order') {
        self.currentStep = 'order'
      }else if (hashVal === '#coupon') {
        self.currentStep = 'coupon'
      }
    }
  },
  attached: function () {},
  events: {
    'next': function (data) {
      if (data.fromStep === 'service') { // 在项目选择点下一步
        if (utils.getUrlParam('shopId')) { // 从门店预约和从发型师预约
          window.location.hash = 'time'
          this.shopId = parseInt(utils.getUrlParam('shopId'), 10)
          this.getTime({'shopId': this.shopId})
          this.orderInfo.shopName = decodeURIComponent(utils.getUrlParam('shopName'))
          this.orderInfo.orderSubmit.shopId = this.shopId
        }else {
          window.location.hash = 'store'
          this.$broadcast('get-store-data')
        }
        this.maxHours = data.maxHours
        this.orderInfo.orderSubmit.productList = data.productItems
        let productNameString = ''
        for (let index in data.productItems) {
          if (data.productItems.hasOwnProperty(index)) {
            if (index > 0) {
              productNameString += ','
            }
            productNameString += data.productItems[index].productName
          }
        }
        this.orderInfo.productNames = productNameString
        this.orderInfo.productIds = data.productIds
      }else if (data.fromStep === 'store') { // 在选择门店点下一步
        window.location.hash = 'time'
        this.$broadcast('time-show')
        this.shopId = data.shopId
        this.getTime({'shopId': data.shopId})
        this.orderInfo.shopName = data.shopName
        this.orderInfo.orderSubmit.shopId = data.shopId
      }else if (data.fromStep === 'time') { // 在选择时间点下一步
        if (document.querySelector('.time-item.active')) {
          let tempDate = document.querySelector('.date-item.active').getAttribute('data-time')
          let tempTime = document.querySelector('.time-item.active').getAttribute('data-time')
          let tempDateObj = new Date(parseInt(tempDate, 10))
          let tempDateString = ''
          if ((tempDateObj.getMonth() + 1) < 10) {
            tempDateString = tempDateObj.getFullYear() + '-0' + (tempDateObj.getMonth() + 1) + '-' + tempDateObj.getDate()
          }else {
            tempDateString = tempDateObj.getFullYear() + '-' + (tempDateObj.getMonth() + 1) + '-' + tempDateObj.getDate()
          }
          this.orderInfo.timeString = tempDateString + ' ' + tempTime
          this.orderInfo.orderSubmit.date = parseInt(tempDate, 10)
          this.orderInfo.orderSubmit.time = tempTime
          if (utils.getUrlParam('personId')) { // 从发型师预约
            window.location.hash = 'order'
            this.orderInfo.orderSubmit.barberId = utils.getUrlParam('personId')
            this.orderInfo.barberName = decodeURIComponent(utils.getUrlParam('personName'))
          }else {
            window.location.hash = 'person'
            this.getPerson({'date': parseInt(tempDate, 10), 'time': tempTime, 'hours': this.maxHours, shopId: this.shopId})
          }
        }else {
          toast('请选择时间')
        }
      }else if (data.fromStep === 'person') { // 在选择发型师点下一步
        window.location.hash = 'order'
        this.orderInfo.orderSubmit.barberId = data.personId
        this.orderInfo.barberName = data.personName
        this.orderInfo.orderSubmit.price = 0
        for (let i = 0; i < this.orderInfo.orderSubmit.productList.length; i++) {
          let productInfo = this.orderInfo.orderSubmit.productList[i]
          this.orderInfo.orderSubmit.price += parseInt(productInfo.price, 10)
          this.orderInfo.orderSubmit.realPrice += parseInt(productInfo.price, 10)
        }
        this.getAvilCoupon({'barberId': this.orderInfo.orderSubmit.barberId, 'productIds': this.orderInfo.productIds, 'money': this.orderInfo.orderSubmit.price})
      }
    },
    'select-coupon': function (id, name, type, money) {
      window.location.hash = 'order'
      this.$broadcast('select-coupon', id, name, type, money)
    }
  },
  methods: {
    getProject: function (requestData) {// 获取项目列表
      this.loading.show = true
      this.$http.get(window.ctx + '/api/order/selectProject', requestData).then(function (response) {
        this.loading.show = false
        var res = response.data
        if (res.code === 0) {
          this.serviceItem = res.result
        }else {
          toast('获取项目失败')
        }
      }, function (response) {
        this.loading.show = false
        toast('获取项目失败')
      })
    },
    // getStore: function () {
    //   this.loading.show = true
    //   let requestData = {}
    //   if (utils.getUrlParam('couponId')) { // 从我的优惠券进入预约
    //     requestData.couponId = utils.getUrlParam('couponId')
    //   }
    //   this.$http.get(window.ctx + '/api/order/selectShop', requestData).then(function (response) {
    //     this.loading.show = false
    //     var res = response.data
    //     if (res.code === 0) {
    //       this.storeItem = res.result.result
    //     }else {
    //       toast('获取门店失败')
    //     }
    //   }, function (response) {
    //     this.loading.show = false
    //     toast('获取门店失败')
    //   })
    // },
    getTime: function (requestData) {
      this.$broadcast('get-time-list', requestData)
    },
    getPerson: function (requestData) {
      this.loading.show = true
      this.$http.get(window.ctx + '/api/order/selectBarber', requestData).then(function (response) {
        this.loading.show = false
        var res = response.data
        if (res.code === 0) {
          this.personItem = res.result
        }else {
          toast('获取发型师失败')
        }
      }, function (response) {
        this.loading.show = false
        toast('获取发型师失败')
      })
    },
    getAvilCoupon: function (requestData) {
      if (this.token) {
        this.loading.show = true
        console.log(requestData)
        this.$http.post(window.ctx + '/api/coupon/t/availableList', requestData, {headers: {token: this.token}, emulateJSON: true}).then(function (response) {
          this.loading.show = false
          var res = response.data
          if (res.code === 0) {
            this.orderInfo.couponItem = res.result
          }else if (res.code === 10007) {
            toast('登录已过期，请重新登录')
            setTimeout(function () {
              window.location.href = 'login.html?fromUrl=' + encodeURIComponent(window.location.href)
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
          window.location.href = 'login.html?fromUrl=' + encodeURIComponent(window.location.href)
        }, 1000)
      }
    }
  },
  components: {
    SelectItem,
    SelectStore,
    SelectTime,
    SelectPerson,
    CreateOrder,
    SelectCoupon,
    Loading
  }
}
</script>

<style lang="sass">
@import '../assets/css/style.scss'
</style>
<style>
body {
  background: #eaeaea;
}
</style>
