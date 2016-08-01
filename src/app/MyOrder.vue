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
          <p>{{new Date(orderDetail.date).getFullYear() + '-' + (new Date(orderDetail.date).getMonth() + 1) + '-' + new Date(orderDetail.date).getDate()}} {{orderDetail.time}}</p>
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
import toast from '../js/toast'

export default {
  data () {
    return {
      loading: {
        show: true
      },
      waitPay: null,
      waitService: null,
      orderDone: null,
      orderCanceled: null,
      orderDetail: {},
      showDetail: false,
      state: 1,
      token: '',
      currentPage: 1,
      pageSize: 10,
      hasMoreData: true
    }
  },
  created () {
    let self = this
    self.token = localStorage.getItem('token')
    self.getOrder(1, 1, 10)
  },
  ready: function () {
    let self = this
    window.onscroll = function () {
      let container = document.querySelector('body')
      // let laschild = document.querySelectorAll('.store-item')[document.querySelectorAll('.store-item').length - 1]
      if (self.hasMoreData && (window.screen.height + window.scrollY) >= container.offsetHeight) {
        self.getOrder(self.state, self.currentPage + 1, self.pageSize)
      }
    }
  },
  methods: {
    handleLink (active) {
      console.log(active)
      let self = this
      let state
      let pageNo = 1
      let pageSize = self.pageSize
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
      if (self.token) {
        self.loading.show = true
        self.currentPage = pageNo
        self.$http.get(window.ctx + '/api/order/t/list', {state: state, pageNo: pageNo, pageSize: pageSize}, {headers: {token: self.token}}).then((response) => {
          self.loading.show = false
          let res = response.data
          if (res.code === 0) {
            if (state === 1) {
              if (pageNo === 1) {
                self.$set('waitPay', res.result.result)
              }else {
                self.waitPay = self.waitPay.concat(res.result.result)
              }
            }
            if (state === 2) {
              if (pageNo === 1) {
                self.$set('waitService', res.result.result)
              }else {
                self.waitService = self.waitService.concat(res.result.result)
              }
            }
            if (state === 3) {
              if (pageNo === 1) {
                self.$set('orderDone', res.result.result)
              }else {
                self.orderDone = self.orderDone.concat(res.result.result)
              }
            }
            if (state === 4) {
              if (pageNo === 1) {
                self.$set('orderCanceled', res.result.result)
              }else {
                self.orderCanceled = self.orderCanceled.concat(res.result.result)
              }
            }
            if (!res.result.result || res.result.result.length === 0) {
              self.hasMoreData = false
            }else if (res.result.result.length < self.pageSize) {
              self.hasMoreData = false
            }else {
              self.hasMoreData = true
            }
          }else if (res.code === 10007) {
            toast('登录已过期，请重新登录')
            setTimeout(function () {
              window.location.href = 'login.html?fromUrl=' + encodeURIComponent(window.location.href)
            }, 1000)
          }
        }, (response) => {
          self.loading.show = false
        })
      }else {
        toast('请先登录')
        setTimeout(function () {
          window.location.href = 'login.html?fromUrl=' + encodeURIComponent(window.location.href)
        }, 1000)
      }
    },
    showDetailModal (orderId) {
      let self = this
      if (self.token) {
        self.$http.get(window.ctx + '/api/order/t/detail', {orderId: orderId}, {headers: {token: self.token}}).then((response) => {
          let res = response.data
          if (res.code === 0) {
            self.$set('orderDetail', res.result)
            self.showDetail = true
          }else if (res.code === 10007) {
            toast('登录已过期，请重新登录')
            setTimeout(function () {
              window.location.href = 'login.html?fromUrl=' + encodeURIComponent(window.location.href)
            }, 1000)
          }
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
  font-size: 1.4rem;
  margin: 10px auto;
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
  font-size: 1.3rem;
  padding-left: 11px;
  color: #8f8e8e;
}
</style>
