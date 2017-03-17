<template>
  <div class="order-item" v-for="(index, item) in items" @click.prevent="detailModal(item)">
    <p class="order-paytime" v-if="item.processState == 1">剩余支付时间：<count-time :ctime="item.createTime"></count-time></p>
    <p class="orderno">订单编号：{{item.id}} <span>金额：{{item.realPrice}}元</span></p>
    <p>预约门店：{{item.shopName}}</p>
    <p v-if="item.offline === 0">预约时间：{{new Date(item.date).getFullYear() + '-' + (new Date(item.date).getMonth() + 1) + '-' + new Date(item.date).getDate()}} {{item.time}}</p>
    <p class="clearfix">
      <span class="pull-l">预约项目：<span v-for="(index,pro) in item.productList" v-show="$index < 1">{{pro.productName}}<i v-show="item.productList.length > 1">...</i></span></span>
      <span v-if="item.offline === 0" class="pull-r">预约发型师：{{item.barberName}}</span>
    </p>
    <p v-if="item.offline === 1 && (item.processState === 1 || item.processState === 2 || item.processState === 0)">等待人数：{{item.waitNum}}</p>
    <div class="order-control">
      <div>
        <template v-if="item.processState === 1 || item.processState === 2">
          <button class="btn btn-default" @click.prevent.stop="cancelOrder(item.id,$index)">取消订单</button>
        </template>
        <template v-if="item.processState === 3 || item.processState === 4">
          <button class="btn btn-primary" @click.prevent.stop="goApointment(item.barberId, item.barberName, item.shopId, item.shopName)">再来一单</button>
        </template>
      </div>
      <div class="control-right" v-if="item.processState === 0">
        <button class="btn btn-default" @click.prevent.stop="cancelOrder(item.id,$index)">取消订单</button>
      </div>
      <div v-if="item.processState === 1">
          <button class="btn btn-primary" @click.prevent.stop="goPay(item)">去付款</button>
      </div>
      <div v-if="item.processState === 2">
        <button class="btn btn-primary" @click.prevent.stop="confirmService(item.id,$index)">确认服务</button>
      </div>
      <div v-if="item.processState === 3">
        <button class="btn btn-primary" @click.prevent.stop="goComment(item.id)">去评价</button>
      </div>
      <div v-if="item.processState === 4">
        <button class="btn btn-primary" @click.prevent.stop="viewComment(item.barberId)">查看评价</button>
      </div>
      <div class="control-right" v-if="item.processState === 5">
        <span class="order-status">待退款</span>
      </div>
      <div class="control-right" v-if="item.processState === 6">
        <span class="order-status">已退款</span>
      </div>
      <div class="control-right" v-if="item.processState === 7">
        <span class="order-status">待验券</span>
      </div>
      <div class="control-right" v-if="item.processState === 9">
        <span class="order-status">已取消</span>
      </div>
    </div>
  </div>
</template>

<script>
import toast from '../js/toast'
import utils from '../js/utils'
import CountTime from '../components/CountTime'
export default {
  data () {
    return {
      token: localStorage.getItem('token')
    }
  },
  props: {
    items: Array,
    cancelText: {
      type: String,
      default: ''
    },
    confirmText: {
      type: String,
      default: ''
    }
  },
  methods: {
    goApointment (personId, personName, shopId, shopName) {
      window.goPage(
      'apointment.html?' +
      'personId=' + personId +
      '&personName=' + encodeURIComponent(personName) +
      '&shopId=' + shopId +
      '&shopName=' + encodeURIComponent(shopName))
    },
    goPay (item) {
      this.$parent.$parent.$parent.loading.show = true
      if (item.payType === 1) { // 微信支付
        this.$http.post(window.ctx + '/api/pay/wechat-pay' + (utils.getUrlParam('session_key') ? ('?session_key=' + utils.getUrlParam('session_key')) : ''), item, {headers: {token: this.token}, emulateJSON: true}).then(function (response) {
          window.location.href = response.data
        }, function (response) {
          this.$parent.$parent.$parent.loading.show = false
          toast('支付失败')
        })
      }else if (item.payType === 2) { // 支付宝支付
        this.$http.post(window.ctx + '/api/pay/ali-pay', item, {headers: {token: this.token}, emulateJSON: true}).then(function (response) {
          window.location.href = decodeURIComponent(response.data)
        }, function (response) {
          this.$parent.$parent.$parent.loading.show = false
          toast('支付失败')
        })
      }

    },
    detailModal (item) {
      this.$emit('detail-msg', item.id)
    },
    goComment (orderId) {
      window.goPage('writeComment.html?orderId=' + orderId)
    },
    viewComment (barberId) {
      window.goPage('dresserDetail.html?id=' + barberId)
    },
    confirmService (orderId, index) {
      let self = this
      self.$parent.$parent.$parent.loading.show = true
      if (self.token) {
        self.$http.post(window.ctx + '/api/order/t/confirm', {orderId: orderId}, {headers: {token: self.token}}).then((response) => {
          let res = response.data
          self.$parent.$parent.$parent.loading.show = false
          if (res.code === 0) {
            toast('确认成功')
            self.items.$remove(self.items[index])
          }else if (res.code === 10007) {
            toast('登录已过期，请重新登录')
            setTimeout(function () {
              window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
            }, 1000)
          }
        })
      }else {
        self.$parent.$parent.$parent.loading.show = false
        toast('请先登录')
        setTimeout(function () {
          window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
        }, 1000)
      }
    },
    cancelOrder (orderId, index) {
      let self = this
      // 弹出提示框:确定取消？
      self.$parent.$parent.$parent.dialog.show = true
      self.$parent.$parent.$parent.dialog.transitionName = 'fade'
      if (self.token) {
        self.$parent.$parent.$parent.dialog.callback = function () {
          self.$parent.$parent.$parent.loading.show = true
          self.$http.post(window.ctx + '/api/order/t/cancel', {orderId: orderId}, {headers: {token: self.token}}).then((response) => {
            let res = response.data
            self.$parent.$parent.$parent.loading.show = false
            self.$parent.$parent.$parent.dialog.show = false
            if (res.code === 0) {
              toast('取消成功')
              self.items.$remove(self.items[index])
            }else if (res.code === 10007) {
              toast('登录已过期，请重新登录')
              setTimeout(function () {
                window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
              }, 1000)
            }
          }, (response) => {
            self.$parent.$parent.$parent.loading.show = false
            self.$parent.$parent.$parent.dialog.show = false
            toast('取消失败')
          })
        }
      }else {
        toast('请先登录')
        self.$parent.$parent.$parent.loading.show = false
        setTimeout(function () {
          window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
        }, 1000)
      }
    }
  },
  components: {
    CountTime
  }
}
</script>
<style>
.order-item {
  margin-top: 15px;
  background-color: #fff;
  font-size: 1.4rem;
  padding: 10px 15px;
  color: #8d8d8d;
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
</style>
