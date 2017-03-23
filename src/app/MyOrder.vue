<style lang="sass">
@import '../assets/css/style.scss'
</style>
<template>
  <div class="order-list">
    <tab-set :active="0" v-on:child-msg="handleLink">
      <Tab header="待付款">
        <no-result v-if="waitPay && waitPay.length === 0"></no-result>
        <order-item v-else :items="waitPay" v-on:detail-msg="showDetailModal"></order-item>
      </Tab>
      <Tab header="待服务">
        <no-result v-if="waitService && waitService.length === 0"></no-result>
        <order-item v-else :items="waitService" v-on:detail-msg="showDetailModal"></order-item>
      </Tab>
      <Tab header="已完成">
        <no-result v-if="orderDone && orderDone.length === 0"></no-result>
        <order-item v-else :items="orderDone" v-on:detail-msg="showDetailModal"></order-item>
      </Tab>
      <Tab header="已取消">
        <no-result v-if="orderCanceled && orderCanceled.length === 0"></no-result>
        <order-item v-else :items="orderCanceled" v-on:detail-msg="showDetailModal"></order-item>
      </Tab>
    </tab-set>
    <!-- 详情modal -->
    <detail-modal :show.sync="showDetail">
      <div slot="detail-modal-header" class="detail-modal-header">
        <h4 class="detail-modal-title">
          订单编号：{{orderDetail.id}}<span>金额：{{orderDetail.realPrice}}元</span>
        </h4>
      </div>
      <div slot="detail-modal-body" class="detail-modal-body">
        <div class="order-detail-list clearfix">
          <h5><i></i>预约门店</h5>
          <p>{{orderDetail.shopName}}</p>
          <h5 v-if="orderDetail.offline === 0"><i></i>预约发型师</h5>
          <p v-if="orderDetail.offline === 0">{{orderDetail.barberName}}</p>
          <h5><i></i>预约项目</h5>
          <p><span v-for="(index,pro) in orderDetail.productList">{{pro.productName}}<i v-if="index != (orderDetail.productList.length-1)">、</i></span></p>
          <h5 v-if="orderDetail.offline === 0"><i></i>预约时间</h5>
          <p v-if="orderDetail.offline === 0">{{new Date(orderDetail.date).getFullYear() + '-' + (new Date(orderDetail.date).getMonth() + 1) + '-' + new Date(orderDetail.date).getDate()}} {{orderDetail.time}}</p>
          <h5 class="text-highlight" v-if="orderDetail.offline === 1 && (orderDetail.processState === 1 || orderDetail.processState === 2 || orderDetail.processState === 0)"><i></i>线下订单</h5>
          <div v-if="orderDetail.dealGroupCode">
            <h5><i></i>团购券码</h5>
            <p>{{orderDetail.dealGroupCode}}</p>
          </div>
          <h5 v-if="systemType === 'DY'"><i></i>门店座机</h5>
          <p v-if="systemType === 'DY'">{{orderDetail.shopPhone}}</p>
        </div>
        <div v-if="orderDetail.offline === 1 && (orderDetail.processState === 2 || orderDetail.processState === 0)" class="offline-order-detail">
          <p>下单时间：{{new Date(orderDetail.updateTime).getFullYear() + '-' + fixNum(new Date(orderDetail.updateTime).getMonth() + 1) + '-' + fixNum(new Date(orderDetail.updateTime).getDate()) + ' ' + fixNum(new Date(orderDetail.updateTime).getHours()) + ':' + fixNum(new Date(orderDetail.updateTime).getMinutes()) + ':' + fixNum(new Date(orderDetail.updateTime).getSeconds())}}</p>
          <p>支付方式：{{orderDetail.payType === 1 ? '微信公众平台支付' : '支付宝支付'}}</p>
          <br>
          <p class="tips">请于门店中心耐心排队</p>
          <p class="tips">具体等候时间需要以实际情况为准，东瀛造型拥有最终解释权</p>
        </div>
      </div>
    </detail-modal>
  </div>
  <loading :show="loading.show"></loading>
  <dialog :show.sync="dialog.show" :title="dialog.title" :ok-text="dialog.okText" :cancel-text="dialog.cancelText" :callback="dialog.callback"></dialog>

</template>
<script>

import Tab from '../components/Tab'
import TabSet from '../components/TabSet'
import OrderItem from '../components/OrderItem'
import DetailModal from '../components/DetailModal'
import Loading from '../components/Loading'
import NoResult from '../components/NoResult'
import toast from '../js/toast'
import Dialog from '../components/Dialog'
import autoLogin from '../js/autoLogin'

export default {
  data () {
    return {
      loading: {
        show: true
      },
      dialog: {
        show: false,
        title: '您确定要取消这笔订单吗?',
        okText: '确定',
        cancelText: '取消',
        callback: null
      },
      waitPay: null,
      waitService: null,
      orderDone: null,
      orderCanceled: null,
      orderDetail: {},
      showDetail: false,
      state: 1,
      token: localStorage.token,
      currentPage: 1,
      pageSize: 10,
      hasMoreData: true,
      systemType: window.systemType
    }
  },
  created () {
    let self = this
    self.loading.show = true
    this.$http.post(window.ctx + '/api/customer/t/tokenState', {}, {headers: {token: this.token}}).then(function (response) {
      let res = response.data
      if (res.code === 0) {
        self.token = localStorage.getItem('token')
        self.getOrder(1, 1, 10)
      }else {
        autoLogin.login({
          component: this,
          yCallback: function () {
            self.getOrder(1, 1, 10)
          },
          nCallback: null
        })
      }
    }, function () {
      toast('请先登录')
      setTimeout(function () {
        window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
        // window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
      }, 1000)
    })
    // let self = this
    // self.token = localStorage.getItem('token')
    // self.getOrder(1, 1, 10)
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
    fixNum (num) {
      if (num < 10) {
        num = 0 + num.toString()
      }
      return num
    },
    handleLink (active) {
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
    showDetailModal (orderId) {
      let self = this
      if (self.token) {
        self.loading.show = true
        self.$http.get(window.ctx + '/api/order/t/detail', {orderId: orderId}, {headers: {token: self.token}}).then((response) => {
          self.loading.show = false
          let res = response.data
          if (res.code === 0) {
            self.$set('orderDetail', res.result)
            self.showDetail = true
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
    }
  },
  components: {
    Tab,
    TabSet,
    OrderItem,
    DetailModal,
    Loading,
    NoResult,
    Dialog
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
.order-list .offline-order-detail {
  padding: 15px 15px 0;
}
.order-list .offline-order-detail p {
  font-size: 1.3rem;
  color: #8f8e8e;
}
.order-list .offline-order-detail p.tips {
  text-align: center;
  font-size: 1rem;
}
.order-list .offline-order-detail h5 {
  font-weight: normal;
  font-size: 1.4rem;
  margin: 10px auto;
  text-align: center;
  display: block;
}
</style>
