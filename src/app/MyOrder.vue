<style lang="sass">
@import '../assets/css/style.scss'
</style>
<template>
  <div class="order-list">
    <tab-set :active="0" v-on:child-msg="handleLink">
      <Tab header="待付款">
        <template v-if="waitPay && waitPay.length === 0">
          <no-result></no-result>
        </template>
        <template v-if="waitPay && waitPay.length > 0">
          <order-item :items="waitPay" v-on:detail-msg="showDetailModal"></order-item>
        </template>
      </Tab>
      <Tab header="待服务">
        <template v-if="waitService && waitService.length === 0">
          <no-result></no-result>
        </template>
        <template v-if="waitService && waitService.length > 0">
          <order-item :items="waitService" v-on:detail-msg="showDetailModal"></order-item>
        </template>
      </Tab>
      <Tab header="已完成">
        <template v-if="orderDone && orderDone.length === 0">
          <no-result></no-result>
        </template>
        <template v-if="orderDone && orderDone.length > 0">
          <order-item :items="orderDone" v-on:detail-msg="showDetailModal"></order-item>
        </template>
      </Tab>
      <Tab header="已取消">
        <template v-if="orderCanceled && orderCanceled.length === 0">
          <no-result></no-result>
        </template>
        <template v-if="orderCanceled && orderCanceled.length > 0">
          <order-item :items="orderCanceled" v-on:detail-msg="showDetailModal"></order-item>
        </template>
      </Tab>
    </tab-set>
    <!-- 详情modal -->
    <detail-modal :show.sync="showDetail">
      <div slot="detail-modal-header" class="detail-modal-header">
        <h4 class="detail-modal-title">
          订单编号：{{orderDetail.id}}<span>金额：{{orderDetail.price}}元</span>
        </h4>
      </div>
      <div slot="detail-modal-body" class="detail-modal-body">
        <div class="order-detail-list">
          <h5><i></i>预约门店</h5>
          <p>{{orderDetail.shopName}}</p>
          <h5><i></i>预约发型师</h5>
          <p>{{orderDetail.barberName}}</p>
          <h5><i></i>预约项目</h5>
          <p><span v-for="(index,pro) in orderDetail.productList">{{pro.productName}}<i v-if="index != (orderDetail.productList.length-1)">、</i></span></p>
          <h5><i></i>预约时间</h5>
          <p>{{orderDetail.time}}</p>
        </div>
      </div>
    </detail-modal>
  </div>
  <loading :show="loading.show"></loading>
</template>
<script>

import Tab from '../components/Tab'
import TabSet from '../components/TabSet'
import OrderItem from '../components/OrderItem'
import DetailModal from '../components/DetailModal'
import Loading from '../components/Loading'
import NoResult from '../components/NoResult'

export default {
  data () {
    return {
      loading: {
        show: true
      },
      noresult: false,
      waitPay: null,
      waitService: null,
      orderDone: null,
      orderCanceled: null,
      orderDetail: {},
      showDetail: false,
      state: 1,
      token: ''
    }
  },
  created () {
    let self = this
    self.token = localStorage.getItem('token')
    self.getOrder(1, 1, 10)
  },
  methods: {
    handleLink (active) {
      console.log(active)
      let self = this
      let state
      let pageNo = 1
      let pageSize = 10
      if (active === 0) {
        self.state = 1
        state = self.state
      }
      if (active === 1) {
        self.state = 2
        state = self.state
      }
      if (active === 2) {
        self.state = 3
        state = self.state
      }
      if (active === 3) {
        self.state = 4
        state = self.state
      }
      self.getOrder(state, pageNo, pageSize)
    },
    getOrder (state, pageNo, pageSize) {
      let self = this
      self.loading.show = true
      self.$http.get(window.ctx + '/api/order/t/list', {state: state, pageNo: pageNo, pageSize: pageSize}, {headers: {token: self.token}}).then((response) => {
        self.loading.show = false
        let res = response.data
        if (res.code === 0) {
          if (state === 1) {
            self.$set('waitPay', res.result.result)
          }
          if (state === 2) {
            self.$set('waitService', res.result.result)
          }
          if (state === 3) {
            self.$set('orderDone', res.result.result)
          }
          if (state === 4) {
            self.$set('orderCanceled', res.result.result)
          }
        }
      }, (response) => {
        self.loading.show = false
      })
    },
    showDetailModal (orderId) {
      let self = this
      self.$http.get(window.ctx + '/api/order/t/detail', {orderId: orderId}, {headers: {token: self.token}}).then((response) => {
        let res = response.data
        if (res.code === 0) {
          self.$set('orderDetail', res.result)
          self.showDetail = true
        }
      })
    }
  },
  components: {
    Tab,
    TabSet,
    OrderItem,
    DetailModal,
    Loading,
    NoResult
  }
}
</script>
<style>
body {
  background-color: #eaeaea;
}
.order-list .tab-list {
  background-color: #fff;
}
.no-data {
  background-color: #fff;
  margin: 15px auto;
  text-align: center;
  padding: 80px 0;
  font-size: 1.6rem;
}
.order-list .detail-modal .detail-modal-title span {
  margin-left: 4px;
}
.order-list .detail-modal h5 {
  font-weight: normal;
  font-size: 1.5rem;
  margin: 15px auto;
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
  align-items: center;
}
.order-list .detail-modal h5 i {
  display: inline-block;
  width: 5px;
  height: 8px;
  background-color: #ff6251;
  margin-right: 10px;
}
.order-list .order-detail-list {
  padding: 0 15px;
}
.order-list .order-detail-list p {
  font-size: 1.4rem;
  padding-left: 11px;
  color: #8f8e8e;
}
</style>
