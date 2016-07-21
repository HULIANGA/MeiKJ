<template>
  <div class="order-item" v-for="(index, item) in items" @click.prevent="detailModal(item)">
    <p class="order-paytime" v-if="item.processState == 1">剩余支付时间：</p>
    <p class="orderno">订单编号：{{item.id}} <span>金额：{{item.price}}元</span></p>
    <p>预约门店：{{item.shopName}}</p>
    <p>预约时间：{{item.time}}</p>
    <p class="clearfix"><span class="pull-l">预约项目：</span><span class="pull-r">预约发型师：{{item.barberName}}</span></p>
    <div class="order-control">
      <div>
        <template v-if="item.processState == 1 || item.processState == 2">
          <button class="btn btn-default" @click.prevent.stop="cancelOrder(item.id,$index)">取消订单</button>
        </template>
      </div>
      <div v-if="item.processState == 1">
          <button class="btn btn-primary">去付款</button>
      </div>
      <div v-if="item.processState == 2">
        <button class="btn btn-primary" @click.prevent.stop="confirmService(item.id,$index)">确认服务</button>
      </div>
      <div class="control-right" v-if="item.processState == 3">
        <button class="btn btn-primary" @click.prevent.stop="goComment(item.id)">去评价</button>
      </div>
      <div class="control-right" v-if="item.processState == 4">
        <button class="btn btn-primary" @click.prevent.stop="viewComment(item.barberId)">查看评价</button>
      </div>
      <div class="control-right" v-if="item.processState == 5">
        <span class="order-status">待退款</span>
      </div>
      <div class="control-right" v-if="item.processState == 6">
        <span class="order-status">已退款</span>
      </div>
      <div class="control-right" v-if="item.processState == 7">
        <span class="order-status">待验券</span>
      </div>
      <div class="control-right" v-if="item.processState == 9">
        <span class="order-status">已取消</span>
      </div>
    </div>
  </div>
</template>

<script>
import toast from '../js/toast'
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
    detailModal (item) {
      this.$emit('detail-msg', item.id)
    },
    goComment (orderId) {
      window.location.href = 'writeComment.html?orderId=' + orderId
    },
    viewComment (barberId) {
      window.location.href = 'dresserDetail.html?id=' + barberId
    },
    confirmService (orderId, index) {
      let self = this
      if (self.token) {
        self.$http.post(window.ctx + '/api/order/t/confirm', {orderId: orderId}, {headers: {token: self.token}}).then((response) => {
          let res = response.data
          if (res.code === 0) {
            toast('确认成功')
            self.items.$remove(self.items[index])
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
    },
    cancelOrder (orderId, index) {
      let self = this
      if (self.token) {
        self.$http.post(window.ctx + '/api/order/t/cancel', {orderId: orderId}, {headers: {token: self.token}}).then((response) => {
          let res = response.data
          if (res.code === 0) {
            toast('取消成功')
            self.items.$remove(self.items[index])
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
  font-size: 1.5rem;
  background-color: #c0c0bf;
  color: #fff;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border-radius: 3px;
}
</style>
