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
import autoLogin from '../js/autoLogin'

export default {
  data: function () {
    return {
      token: localStorage.token,
      loading: {
        show: true
      },
      maxHours: null, // 消耗时间
      shopId: null, // 门店id
      positionId: null, // 职位id
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
          payType: 4, // 支付方式
          shopId: null, // 门店id
          customerName: localStorage.loginname ? localStorage.loginname : '', // 用户名称
          customerPhone: localStorage.loginphone, // 用户手机号
          date: null, // 预约日期
          time: null, // 预约时间
          barberId: null, // 发型师id
          price: null, // 订单总额
          realPrice: null, // 实付金额
          memo: null, // 订单备注
          couponId: null, // 优惠券id
          barberFirst: null // 是否从发型师预约，1是，0否
        }
      }
    }
  },
  computed: {},
  created: function () {
    let self = this
    if (utils.getUrlParam('personId')) {
      self.orderInfo.orderSubmit.barberFirst = 1
    }else {
      self.orderInfo.orderSubmit.barberFirst = 0
    }
    self.loading.show = true
    this.$http.post(window.ctx + '/api/customer/t/tokenState', {}, {headers: {token: this.token}}).then(function (response) {
      let res = response.data
      if (res.code === 0) {
        self.initPageData()
      }else {
        autoLogin.login({
          component: this,
          yCallback: function () {
            self.initPageData()
            self.orderInfo.orderSubmit.customerName = localStorage.loginname
            self.orderInfo.orderSubmit.customerPhone = localStorage.loginphone
          },
          nCallback: null
        })
      }
    }, function () {
      toast('请先登录')
      setTimeout(function () {
        window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
      }, 1000)
    })
  },
  ready: function () {

  },
  attached: function () {},
  events: {
    'next': function (data) {
      var self = this
      // 在ready里绑定onhashchange事件，手机QQ内置浏览器不触发，故在此绑定
      window.onhashchange = function () {
        var hashVal = window.location.hash
        if (hashVal === '') {
          if (utils.getUrlParam('skipProductSelect')) {
            window.history.go(-1)
          }else {
            self.currentStep = 'service'
          }
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
      if (data.fromStep === 'service') { // 在项目选择点下一步
        this.positionId = data.positionId
        if (utils.getUrlParam('shopId')) { // 从门店预约和从发型师预约
          window.location.hash = 'time'
          this.$broadcast('reset-select-time')
          this.$broadcast('date-set')
          this.shopId = parseInt(utils.getUrlParam('shopId'), 10)
          this.orderInfo.shopName = decodeURIComponent(utils.getUrlParam('shopName'))
          this.orderInfo.orderSubmit.shopId = this.shopId
          let nowDate = new Date()
          nowDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate())
          let nowTime = nowDate.getTime()
          if (utils.getUrlParam('personId')) {
            this.getTime({'shopId': this.shopId, 'barberId': utils.getUrlParam('personId'), date: nowTime, positionId: this.positionId})
          }else {
            this.getTime({'shopId': this.shopId, date: nowTime, positionId: this.positionId})
          }
        }else {
          window.location.hash = 'store'
          this.$broadcast('get-store-data', data.productIds)
        }
        this.maxHours = data.maxHours
        this.orderInfo.orderSubmit.hours = data.maxHours
        this.orderInfo.orderSubmit.productList = data.productItems
        let productNameString = ''
        for (let index = 0; index < data.productItems.length; index++) {
          if (index > 0) {
            productNameString += ','
          }
          productNameString += data.productItems[index].productName
        }
        this.orderInfo.productNames = productNameString
        this.orderInfo.productIds = data.productIds
      }else if (data.fromStep === 'store') { // 在选择门店点下一步
        window.location.hash = 'time'
        this.$broadcast('reset-select-time')
        this.$broadcast('date-set')
        this.shopId = data.shopId
        let nowDate = new Date()
        nowDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate())
        let nowTime = nowDate.getTime()
        this.getTime({'shopId': data.shopId, date: nowTime, positionId: this.positionId})
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
          window.location.hash = 'order'
          this.$broadcast('date-set')
          this.$broadcast('reset-select-time')
          this.orderInfo.orderSubmit.price = 0
          this.orderInfo.orderSubmit.realPrice = 0
          for (let i = 0; i < this.orderInfo.orderSubmit.productList.length; i++) {
            let productInfo = this.orderInfo.orderSubmit.productList[i]
            this.orderInfo.orderSubmit.price += parseFloat(productInfo.price, 10)
            this.orderInfo.orderSubmit.realPrice += parseFloat(productInfo.price, 10)
          }
          if (utils.getUrlParam('personId')) { // 从发型师预约
            this.orderInfo.orderSubmit.barberId = utils.getUrlParam('personId')
            this.orderInfo.barberName = decodeURIComponent(utils.getUrlParam('personName'))
            this.getAvilCoupon({'barberId': this.orderInfo.orderSubmit.barberId, 'productIds': this.orderInfo.productIds, 'money': this.orderInfo.orderSubmit.price})
          }else { // 自动选择发型师
            this.loading.show = true
            var requestData = {'date': parseInt(tempDate, 10), 'time': tempTime, 'hours': this.maxHours, shopId: this.shopId, 'positionId': this.positionId}
            if (utils.getUrlParam('couponId')) { // 从我的优惠券进入预约
              requestData.couponId = utils.getUrlParam('couponId')
            }else {
              requestData.couponId = ''
            }
            this.$http.post(window.ctx + '/api/order/t/chooseBarber', requestData, {headers: {token: this.token}, emulateJSON: true}).then(function (response) {
              this.loading.show = false
              var res = response.data
              if (res.code === 0) {
                this.orderInfo.orderSubmit.barberId = res.result.id
                this.orderInfo.barberName = res.result.positionName + '发型师'
                this.getAvilCoupon({'barberId': this.orderInfo.orderSubmit.barberId, 'productIds': this.orderInfo.productIds, 'money': this.orderInfo.orderSubmit.price})
              }else {
                toast('获取发型师失败')
              }
            }, function (response) {
              this.loading.show = false
              toast('获取发型师失败')
            })
          }
        }else {
          toast('请选择时间')
        }
      }else if (data.fromStep === 'person') { // 在选择发型师点下一步
        window.location.hash = 'order'
        this.$broadcast('reset-select-time')
        this.$broadcast('date-set')
        this.orderInfo.orderSubmit.barberId = data.personId
        this.orderInfo.barberName = data.personName
        this.orderInfo.orderSubmit.price = 0
        this.orderInfo.orderSubmit.realPrice = 0
        for (let i = 0; i < this.orderInfo.orderSubmit.productList.length; i++) {
          let productInfo = this.orderInfo.orderSubmit.productList[i]
          this.orderInfo.orderSubmit.price += parseFloat(productInfo.price, 10)
          this.orderInfo.orderSubmit.realPrice += parseFloat(productInfo.price, 10)
        }
        this.getAvilCoupon({'barberId': this.orderInfo.orderSubmit.barberId, 'productIds': this.orderInfo.productIds, 'money': this.orderInfo.orderSubmit.price})
      }
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
    initPageData: function () {
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
      if (utils.getUrlParam('skipProductSelect')) { // 跳过项目选择
        this.$dispatch('next', {'fromStep': 'service', 'maxHours': parseInt(localStorage.appointmentMaxHours, 10), 'productItems': JSON.parse(localStorage.appointmentProductItems), 'productIds': localStorage.appointmentProductIds, 'positionId': localStorage.appointmentPositionId})
      }else {
        this.getProject(requestData)
      }
    },
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
    getTime: function (requestData) {
      if (utils.getUrlParam('couponId')) {
        requestData.couponId = utils.getUrlParam('couponId')
      }
      this.$broadcast('get-time-list', requestData)
    },
    getPerson: function (requestData) {
      this.loading.show = true
      if (utils.getUrlParam('couponId')) { // 从我的优惠券进入预约
        requestData.couponId = utils.getUrlParam('couponId')
      }
      this.$http.get(window.ctx + '/api/order/selectSortBarber', requestData).then(function (response) {
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
html, body {
  height: 100%;
}
body {
  background: #eaeaea;
}
</style>
