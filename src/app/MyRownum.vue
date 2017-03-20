<style lang="sass">
@import '../assets/css/style.scss'
</style>
<template lang="html">
  <div class="my-rownum-list">
    <div class="order-item" v-for="(index, item) in orderItems">
      <div class="row-num-detail">
        <p class="text-red" v-if="item.state === 1 || item.state === 2">排号中</p>
        <p v-if="item.state === 3">已接单</p>
        <p v-if="item.state === 4">已取消</p>
        <p v-if="item.state === 5">已过号</p>
        <p class="text-big">{{item.queueNumExt}}</p>
        <p class="text-red" v-if="item.state === 1 || item.state === 2">还有{{item.queueNum - 1}}位</p>
      </div>
      <p>预约门店：{{item.shopName}}</p>
      <p>预约时间：{{new Date(item.date).getFullYear() + '-' + (new Date(item.date).getMonth() + 1) + '-' + new Date(item.date).getDate()}} {{item.time}}</p>
      <p>预约职位：{{item.positionName}}</p>
      <p class="clearfix" v-if="item.state === 3">
        <span class="pull-l">接单发型师：{{item.barberName}}</span>
        <span class="pull-r">手机号：{{item.barberMobile}}</span>
      </p>
      <div class="order-control" v-if="item.state === 1 || item.state === 2">
        <div class="control-right">
          <button class="btn btn-default" @click.prevent.stop="cancelOrder(item.id)">取消排号</button>
        </div>
      </div>
    </div>
    <no-result v-if="orderItems && orderItems.length === 0"></no-result>
  </div>
  <loading :show="loading.show"></loading>
  <dialog :show.sync="dialog.show" :title="dialog.title" :ok-text="dialog.okText" :cancel-text="dialog.cancelText" :callback="dialog.callback"></dialog>
</template>

<script>
import Loading from '../components/Loading'
import NoResult from '../components/NoResult'
import toast from '../js/toast'
import autoLogin from '../js/autoLogin'
import Dialog from '../components/Dialog'

export default {
  data () {
    return {
      loading: {
        show: true
      },
      dialog: {
        show: false,
        title: '您正在取消您的排队，已经等了那么久了，不再等一等吗？',
        okText: '去意已决',
        cancelText: '再等等吧',
        callback: null
      },
      currentPage: 1,
      pageSize: 10,
      hasMoreData: true,
      orderItems: null
    }
  },
  created () {
    let self = this
    self.loading.show = true
    this.$http.post(window.ctx + '/api/customer/t/tokenState', {}, {headers: {token: localStorage.token}}).then(function (response) {
      let res = response.data
      if (res.code === 0) {
        self.getOrder(5, 1, 10)
      }else {
        autoLogin.login({
          component: this,
          yCallback: function () {
            self.getOrder(5, 1, 10)
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
    let self = this
    window.onscroll = function () {
      let container = document.querySelector('body')
      // let laschild = document.querySelectorAll('.store-item')[document.querySelectorAll('.store-item').length - 1]
      if (self.hasMoreData && (window.screen.height + window.scrollY) >= container.offsetHeight) {
        self.getOrder(5, self.currentPage + 1, self.pageSize)
      }
    }
  },
  methods: {
    getOrder (state, pageNo, pageSize) {
      let self = this
      if (localStorage.token) {
        self.loading.show = true
        self.currentPage = pageNo
        self.$http.get(window.ctx + '/api/order/t/list', {state: state, pageNo: pageNo, pageSize: pageSize}, {headers: {token: localStorage.token}}).then((response) => {
          self.loading.show = false
          let res = response.data
          if (res.code === 0) {
            if (pageNo === 1) {
              self.$set('orderItems', res.result.result)
            }else {
              self.orderItems = self.orderItems.concat(res.result.result)
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
    cancelOrder (orderId, index) {
      let self = this
      // 弹出提示框:确定取消？
      self.dialog.transitionName = 'fade'
      self.dialog.show = true
      if (localStorage.token) {
        self.dialog.callback = function () {
          self.loading.show = true
          self.$http.post(window.ctx + '/api/order/t/cancelOfflineOrder', {offlineOrderId: orderId}, {headers: {token: localStorage.token}, emulateJSON: true}).then((response) => {
            let res = response.data
            self.loading.show = false
            self.dialog.show = false
            if (res.code === 0) {
              toast('取消成功')
              window.location.reload()
            }else if (res.code === 10007) {
              toast('登录已过期，请重新登录')
              setTimeout(function () {
                window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
              }, 1000)
            }
          }, (response) => {
            self.loading.show = false
            self.dialog.show = false
            toast('取消失败')
          })
        }
      }else {
        toast('请先登录')
        self.loading.show = false
        setTimeout(function () {
          window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
        }, 1000)
      }
    }
  },
  components: {
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
.order-item {
  margin-top: 15px;
  background-color: #fff;
  font-size: 1.4rem;
  padding: 10px 15px;
  color: #8d8d8d;
  position: relative;
}
.order-item>p {
  margin-bottom: 5px;
  font-size: 1.2rem;
}
.order-item .orderno {
  font-size: 1.5rem;
  color: #333;
}
.orderno>span {
  color: #ff7162;
  float: right;
  font-size: 1.2rem;
}
.order-item .order-control {
  display: flex;
  margin-top: 10px;
}
.order-control>div {
  flex:1;
  display: flex;
  justify-content: center;
}
.order-control>div.control-right {
  justify-content: flex-end;
}
.order-control button {
  font-size: 1.3rem;
  display: block;
  width: 50%;
  line-height: 25px
}
.order-control .btn-default {
  background-color: #424241;
}
.order-control .btn-primary {
  background-color: #ff7162;
}
.order-control .order-status {
  display: block;
  width: 50%;
  font-size: 1.3rem;
  background-color: #c0c0bf;
  color: #fff;
  height: 25px;
  line-height: 25px;
  text-align: center;
  border-radius: 3px;
}
.order-paytime>span {
  display: inline-block;
  background: #ff7162;
  color: #fff;
  text-align: center;
  height: 20px;
  width: 20px;
  line-height: 20px;
}
.row-num-detail {
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 10px;
  line-height: 12px;
  text-align: right;
}
.row-num-detail .text-red {
  color: #ff7162;
}
.row-num-detail .text-big {
  font-size: 24px;
  line-height: 26px;
}
</style>
