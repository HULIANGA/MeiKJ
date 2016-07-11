<template lang="html">
  <select-item v-show="currentStep === 'service'" :items="serviceItem"></select-item>
  <select-store v-show="currentStep === 'store'" :items="storeItem"></select-store>
  <select-time v-show="currentStep === 'time'"></select-time>
  <select-person v-show="currentStep === 'person'" :items="personItem"></select-person>
  <create-order v-show="currentStep === 'order'" :order="orderInfo"></create-order>
</template>

<script>
import SelectItem from '../components/SelectItem'
import SelectStore from '../components/SelectStore'
import SelectTime from '../components/SelectTime'
import SelectPerson from '../components/SelectPerson'
import CreateOrder from '../components/CreateOrder'

export default {
  data: function () {
    return {
      maxHours: null, // 消耗时间
      shopId: null, // 门店id
      serviceItem: null, // 项目数据
      storeItem: null, // 门店数据
      timeItem: null, // 时间数据
      personItem: null, // 发型师数据
      currentStep: 'time', // 当前显示步骤。service选项目；store选门店；time选时间；person选发型师；order下单
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
  ready: function () {
    this.getProject()
  },
  attached: function () {},
  events: {
    'next': function (data) {
      if (data.fromStep === 'service') {
        this.currentStep = 'store'
        this.maxHours = data.maxHours
        this.getStore()
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
        this.shopId = data.shopId
        this.getTime({'shopId': data.shopId})
        this.orderInfo.shopName = data.shopName
        this.orderInfo.orderSubmit.shopId = data.shopId
      }else if (data.fromStep === 'time') {
        this.currentStep = 'person'
        this.getPerson({'date': 1468166400000, 'time': '09:00', 'hours': this.maxHours})
        this.orderInfo.timeString = '2016-04-20 09:00'
        this.orderInfo.orderSubmit.date = 1468166400000
        this.orderInfo.orderSubmit.time = '09:00'
      }else if (data.fromStep === 'person') {
        this.currentStep = 'order'
        this.orderInfo.orderSubmit.barberId = data.personId
        this.orderInfo.barberName = data.personName
      }
    }
  },
  methods: {
    getProject: function () {// 获取项目列表
      this.$http.get('/api/order/selectProject').then(function (response) {
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
      this.$http.get('/api/order/selectAppointment', requestData).then(function (response) {

      })
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
