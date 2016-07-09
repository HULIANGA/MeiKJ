<style lang="sass">
@import '../assets/css/style.scss'
</style>
<template>
  <div class="order-list">
    <tab-set :active="0" v-on:child-msg="handleLink">
      <Tab header="待付款">
        <template v-if="waitPay == null">
          <div class="no-data">暂无订单</div>
        </template>
        <template v-if="waitPay">
          <order-item :items="waitPay"></order-item>
        </template>
      </Tab>
      <Tab header="待服务">
        <template v-if="waitService == null">
          <div class="no-data">暂无订单</div>
        </template>
        <template v-if="waitService">
          <order-item :items="waitService"></order-item>
        </template>
      </Tab>
      <Tab header="已完成">
        <template v-if="orderDone == null">
          <div class="no-data">暂无订单</div>
        </template>
        <template v-if="orderDone">
          <order-item :items="orderDone"></order-item>
        </template>
      </Tab>
      <Tab header="已取消">
        <template v-if="orderCanceled == null">
          <div class="no-data">暂无订单</div>
        </template>
        <template v-if="orderCanceled">
          <order-item :items="orderCanceled"></order-item>
        </template>
      </Tab>
    </tab-set>
  </div>
</template>
<script>

import Tab from '../components/Tab'
import TabSet from '../components/TabSet'
import OrderItem from '../components/OrderItem'
export default {
  data () {
    return {
      waitPay: [],
      waitService: [],
      orderDone: [],
      orderCanceled: [],
      state: 1,
      token: ''
    }
  },
  ready () {
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
        self.state = 9
        state = self.state
      }
      self.getOrder(state, pageNo, pageSize)
    },
    getOrder (state, pageNo, pageSize) {
      let self = this
      self.$http.get('/api/order/t/list', {state: state, pageNo: pageNo, pageSize: pageSize}, {headers: {token: self.token}}).then((response) => {
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
          if (state === 9) {
            self.$set('orderCanceled', res.result.result)
          }
        }
      })
    }
  },
  components: {
    Tab,
    TabSet,
    OrderItem
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
</style>
