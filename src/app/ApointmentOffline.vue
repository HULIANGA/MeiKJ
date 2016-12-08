<template lang="html">
  <select-offlineitem v-show="currentStep === 'service'" :items="serviceItem"></select-offlineitem>
  <create-offlineorder v-show="currentStep === 'order'" :order="orderInfo"></create-offlineorder>
  <loading :show="loading.show"></loading>
</template>

<script>
import SelectOfflineitem from '../components/SelectOfflineitem'
import CreateOfflineorder from '../components/CreateOfflineorder'
import Loading from '../components/Loading'
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
        orderSubmit: { // 提交订单数据
          productList: [], // 产品信息
          payType: 1, // 支付方式
          shopId: null, // 门店id
          customerName: localStorage.loginname ? localStorage.loginname : '', // 用户名称
          customerPhone: localStorage.loginphone, // 用户手机号
          price: null, // 订单总额
          realPrice: null, // 实付金额
          memo: null, // 订单备注
          positionId: null
        }
      },
      serviceItem: null, // 项目数据
      currentStep: 'service' // 当前显示步骤。service选项目；store选门店；time选时间；person选发型师；order下单
    }
  },
  computed: {},
  created () {
    this.orderInfo.orderSubmit.shopId = utils.getUrlParam('shopId')
    if (window.location.hash !== '') { // 刷新页面时清空hash值
      window.location.hash = ''
    }
    this.getProject({shopId: utils.getUrlParam('shopId')}) // 获取项目列表
  },
  ready () {
  },
  attached () {},
  events: {
    'next': function (data) {
      var self = this
      // 在ready里绑定onhashchange事件，手机QQ内置浏览器不触发，故在此绑定
      window.onhashchange = function () {
        var hashVal = window.location.hash
        if (hashVal === '') {
          self.currentStep = 'service'
        }else if (hashVal === '#order') {
          self.currentStep = 'order'
        }
      }
      if (data.fromStep === 'service') { // 选择项目点下一步
        console.log(data)
        window.location.hash = 'order'
        this.orderInfo.orderSubmit.productList = data.productItems
        let productNameString = ''
        for (let index = 0; index < data.productItems.length; index++) {
          if (index > 0) {
            productNameString += ','
          }
          productNameString += data.productItems[index].productName
        }
        this.orderInfo.orderSubmit.hours = data.maxHours
        this.orderInfo.productNames = productNameString
        this.orderInfo.productIds = data.productIds
        this.orderInfo.orderSubmit.price = 0
        this.orderInfo.orderSubmit.realPrice = 0
        for (let i = 0; i < this.orderInfo.orderSubmit.productList.length; i++) {
          let productInfo = this.orderInfo.orderSubmit.productList[i]
          this.orderInfo.orderSubmit.price += parseFloat(productInfo.price, 10)
          this.orderInfo.orderSubmit.realPrice += parseFloat(productInfo.price, 10)
        }
        this.orderInfo.orderSubmit.positionId = data.positionId
        this.$http.get(window.ctx + '/api/shop/waitPositionNum', {shopId: utils.getUrlParam('shopId'), positionId: data.positionId}).then(function (response) {
          let res = response.data
          if (res.code === 0) {
            this.orderInfo.queueNum = res.result
          }
        })
      }
    }
  },
  methods: {
    getProject: function (requestData) {
      this.loading.show = true
      this.$http.get(window.ctx + '/api/shop/offlineProductList', requestData).then(function (response) {
        this.loading.show = false
        var res = response.data
        if (res.code === 0) {
          this.serviceItem = res.result
          this.orderInfo.shopName = res.message
        }else {
          toast(res.message)
        }
      }, function (response) {
        this.loading.show = false
        toast('获取项目失败')
      })
    }
  },
  components: {
    Loading,
    SelectOfflineitem,
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
body {
  background: #eaeaea;
}
</style>
