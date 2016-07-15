<template lang="html">
  <select-item v-show="currentStep === 'service'" :items="serviceItem"></select-item>
  <select-store v-show="currentStep === 'store'" :items="storeItem"></select-store>
  <select-time v-show="currentStep === 'time'" :hours="maxHours" :shopid="shopId"></select-time>
  <select-person v-show="currentStep === 'person'" :items="personItem"></select-person>
  <create-order v-show="currentStep === 'order'" :order="orderInfo"></create-order>
</template>

<script>
import SelectItem from '../components/SelectItem'
import SelectStore from '../components/SelectStore'
import SelectTime from '../components/SelectTime'
import SelectPerson from '../components/SelectPerson'
import CreateOrder from '../components/CreateOrder'
import utils from '../js/utils'
import toast from '../js/toast'

export default {
  data: function () {
    return {
      maxHours: null, // 消耗时间
      shopId: null, // 门店id
      serviceItem: null, // 项目数据
      storeItem: null, // 门店数据
      timeItem: null, // 时间数据
      personItem: null, // 发型师数据
      currentStep: 'service', // 当前显示步骤。service选项目；store选门店；time选时间；person选发型师；order下单
      orderInfo: { // 订单初始化数据，包括显示的数据和提交的数据
        shopName: null, // 门店名称
        barberName: null, // 发型师名称
        timeString: null, // 预约时间
        productNames: null, // 预约产品
        orderSubmit: { // 提交订单数据
          productList: [], // 产品信息
          payType: null, // 支付方式
          shopId: null, // 门店id
          customerName: null, // 用户名称
          customerPhone: null, // 用户手机号
          date: null, // 预约日期
          time: null, // 预约时间
          barberId: null, // 发型师id
          price: null, // 订单总额
          realPrice: null, // 实付金额
          memo: null // 订单备注
        }
      }
    }
  },
  computed: {},
  created: function () {
    let requestData = {}
    if (utils.getUrlParam('shopId')) {
      requestData.shopId = utils.getUrlParam('shopId')
    }
    if (utils.getUrlParam('personId')) {
      requestData.barberId = utils.getUrlParam('personId')
    }
    this.getProject(requestData)
  },
  attached: function () {},
  events: {
    'next': function (data) {
      if (data.fromStep === 'service') {
        if (utils.getUrlParam('shopId')) { // 从门店预约和从发型师预约
          this.currentStep = 'time'
          this.$broadcast('time-show')
          this.shopId = parseInt(utils.getUrlParam('shopId'), 10)
          this.getTime({'shopId': this.shopId})
          this.orderInfo.shopName = decodeURIComponent(utils.getUrlParam('shopName'))
          this.orderInfo.orderSubmit.shopId = this.shopId
        }else {
          this.currentStep = 'store'
          this.getStore()
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
      }else if (data.fromStep === 'store') {
        this.currentStep = 'time'
        this.$broadcast('time-show')
        this.shopId = data.shopId
        this.getTime({'shopId': data.shopId})
        this.orderInfo.shopName = data.shopName
        this.orderInfo.orderSubmit.shopId = data.shopId
      }else if (data.fromStep === 'time') {
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
            this.currentStep = 'order'
            this.orderInfo.orderSubmit.barberId = utils.getUrlParam('personId')
            this.orderInfo.barberName = decodeURIComponent(utils.getUrlParam('personName'))
          }else {
            this.currentStep = 'person'
            this.getPerson({'date': parseInt(tempDate, 10), 'time': tempTime, 'hours': this.maxHours, shopId: this.shopId})
          }
        }else {
          toast('请选择时间')
        }
      }else if (data.fromStep === 'person') {
        this.currentStep = 'order'
        this.orderInfo.orderSubmit.barberId = data.personId
        this.orderInfo.barberName = data.personName
      }
    }
  },
  methods: {
    getProject: function (requestData) {// 获取项目列表
      this.$http.get('/api/order/selectProject', requestData).then(function (response) {
        var res = response.data
        if (res.code === 0) {
          this.serviceItem = res.result
        }
      })
    },
    getStore: function () {
      this.$http.get('/api/order/selectShop').then(function (response) {
        var res = response.data
        if (res.code === 0) {
          this.storeItem = res.result.result
        }
      })
    },
    getTime: function (requestData) {
      this.$broadcast('get-time-list', requestData)
    },
    getPerson: function (requestData) {
      this.$http.get('/api/order/selectBarber', requestData).then(function (response) {
        var res = response.data
        if (res.code === 0) {
          this.personItem = res.result
        }
      })
    }
  },
  components: {
    SelectItem,
    SelectStore,
    SelectTime,
    SelectPerson,
    CreateOrder
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
