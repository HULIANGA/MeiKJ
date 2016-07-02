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
      waitPay: window.waitPay,
      waitService: window.waitService,
      orderDone: window.orderDone,
      orderCanceled: window.orderCanceled
    }
  },
  ready () {
  },
  methods: {
    handleLink (active) {
      console.log(active)
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
