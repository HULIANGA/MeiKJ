<style lang="sass">
@import '../assets/css/style.scss'
</style>
<template>
<div class="my-coupon-list">
  <button class="btn btn-primary btn-exchange" @click.prevent="exchangeCoupon">去兑换</button>
  <p class="del-info"><em>*</em>向左滑动可删除优惠券</p>
  <div class="coupon-item-wrap" v-for="(index,item) in items">
    <div class="behind">
      <button class="btn btn-del" @click.prevent="delCoupon(item.customerCouponId,$index)">删除</button>
    </div>
    <div class="coupon-item" v-on:touchstart="touchStart" v-on:touchmove="touchMove" v-on:touchend="touchEnd">
      <div class="coupon-subitem" @click.prevent.stop="showCouponDetail(item.id)">
        <div class="c-left" v-bind:class="{'out-status': item.state == 4 || item.useState == 2}">
            <p class="coupon-price" v-if="item.type == 1">{{ item.discount / 10}}折</p>
            <p class="coupon-price" v-if="item.type == 2">&yen;{{ item.money}}</p>
            <p class="coupon-limit" v-if="item.type == 2">（满{{item.line}}可用）</p>
            <p class="coupon-price" v-if="item.type == 3">&yen;{{ item.quota}}</p>
        </div>
        <div class="c-right">
          <h3>{{item.name}}</h3>
          <p class="coupon-time">{{item.startTime}} - {{item.endTime}}</p>
        </div>
      </div>
      <div class="coupon-control">
        <button class="btn btn-coupon" v-if="(item.state == 2 || item.state == 3) && item.useState == 1" @click.prevent="useCoupon(item.id,item.applyShop)">去使用</button>
        <span class="coupon-status btn-coupon" v-if="item.useState != 2 && item.state == 4">已过期</span>
        <span class="coupon-status btn-coupon" v-if="item.useState == 2">已使用</span>
      </div>
    </div>
  </div>
  <loading :show="loading.show" :show-text=""></loading>
  <detail-modal :show.sync="showDetail">
    <div slot="detail-modal-header" class="detail-modal-header">
      <h4 class="detail-modal-title">
        {{couponDetail.name}}
      </h4>
    </div>
    <div slot="detail-modal-body" class="detail-modal-body">
      <div class="coupon-detail-list">
        <h5><i></i>适用门店</h5>
        <p><span>{{couponDetail.shopName}}</span></p>
        <h5><i></i>适用职位</h5>
        <p>{{couponDetail.positionName}}</p>
        <h5><i></i>适用项目</h5>
        <p><span>{{couponDetail.projectName}}</span></p>
        <h5><i></i>适用城市</h5>
        <p>{{couponDetail.cityName}}</p>
      </div>
    </div>
  </detail-modal>
  <modal :show.sync="exchangeModal">
    <div slot="modal-body" class="modal-body">
      <input type="input" maxlength="50" class="exchange-code" v-model="exchangeCode" placeholder="请填写兑换码">
    </div>
    <div class="modal-footer" slot="modal-footer">
      <button class="btn btn-primary" @click.prevent="exchange()">兑换</button>
    </div>
  </modal>
</div>
<no-result v-show="noresult" :text=""></no-result>
</template>
<script>
import NoResult from '../components/NoResult'
import Loading from '../components/Loading'
import DetailModal from '../components/DetailModal'
import Modal from '../components/Modal'
import toast from '../js/toast'
import autoLogin from '../js/autoLogin'

export default {
  data () {
    return {
      loading: {
        show: true
      },
      items: null,
      noresult: false,
      startX: null,
      token: localStorage.getItem('token'),
      showDetail: false,
      couponDetail: {},
      exchangeCode: '',
      exchangeModal: false,
      currentPage: 1,
      pageSize: 10,
      hasMoreData: true
    }
  },
  created () {
    let self = this
    self.loading.show = true
    this.$http.post(window.ctx + '/api/customer/t/tokenState', {}, {headers: {token: this.token}}).then(function (response) {
      let res = response.data
      if (res.code === 0) {
        self.getCouponData(1)
      }else {
        autoLogin.login({
          component: this,
          yCallback: function () {
            self.getCouponData(1)
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
    // self.getCouponData(1)
  },
  ready: function () {
    let self = this
    window.onscroll = function () {
      let container = document.querySelector('body')
      if (self.hasMoreData && (window.screen.height + window.scrollY) >= container.offsetHeight) {
        self.getCouponData(self.currentPage + 1)
      }
    }
  },
  computed: {
    moveWidth: function () {
      return document.querySelector('.btn-del').clientWidth
    }
  },
  methods: {
    getCouponData: function (pageNo) {
      let self = this
      self.loading.show = true
      self.currentPage = pageNo
      if (self.token) {
        self.$http.get(window.ctx + '/api/coupon/t/list', {pageNo: pageNo, pageSize: self.pageSize}, {headers: {token: localStorage.token}}).then(function (response) {
          let res = response.data
          self.loading.show = false
          if (res.code === 0) {
            if (pageNo === 1) {
              document.querySelector('body').scrollTop = 0
              self.$set('items', res.result.result)
              if (!res.result.result || res.result.result.length === 0) {
                self.noresult = true
              }
            }else {
              self.items = self.items.concat(res.result.result)
            }
            if (!res.result.result || res.result.result.length === 0) {
              self.hasMoreData = false
            }else if (res.result.result.length < self.pageSize) {
              self.hasMoreData = false
            }else {
              self.hasMoreData = true
            }
          } else {
            if (res.code === 10007) {
              toast('登录已过期，请重新登录')
              setTimeout(function () {
                window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
              }, 1000)
            }
            if (pageNo === 1) {
              self.noresult = true
            }
          }
        }, function () {
          self.loading.show = false
          toast('获取数据失败，请刷新重试')
        })
      }else {
        toast('请先登录')
        setTimeout(function () {
          window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
        }, 1000)
      }
    },
    touchStart (e) {
      this.startX = e.touches[0].pageX
      document.querySelector('.coupon-item').style.left = '0px'
    },
    touchMove (e) {
      let change = e.touches[0].pageX - this.startX
      change = Math.min(Math.max(-this.moveWidth, change), 0)
      e.currentTarget.style.left = change + 'px'
    },
    touchEnd (e) {
      let elLeft = parseInt(e.currentTarget.style.left, 10)
      let newLeft
      if (elLeft < -35) {
        newLeft = self.moveWidth
      } else {
        newLeft = '0px'
      }
      e.currentTarget.style.left = newLeft
    },
    delCoupon (customerCouponId, index) {
      let self = this
      self.loading.show = true
      self.$http.post(window.ctx + '/api/coupon/t/deleteCoupon', {customerCouponId: customerCouponId}, {headers: {token: self.token}, emulateJSON: true}).then((response) => {
        let res = response.data
        self.loading.show = false
        if (res.code === 0) {
          toast('删除成功')
          self.items.$remove(self.items[index])
        } else {
          toast(res.message)
        }
      }, (response) => {
        self.loading.show = false
        toast('删除失败')
      })
    },
    showCouponDetail (couponId) {
      let self = this
      self.loading.show = true
      self.$http.post(window.ctx + '/api/coupon/detail', {couponId: couponId}, {emulateJSON: true}).then((response) => {
        self.loading.show = false
        let res = response.data
        if (res.code === 0) {
          self.$set('couponDetail', res.result)
          self.showDetail = true
        }
      }, function (response) {
        self.loading.show = false
      })
    },
    useCoupon (couponId, applyShop) {
      window.goPage('apointment.html?couponId=' + couponId)
    },
    exchangeCoupon () {
      this.exchangeModal = true
    },
    exchange () {
      let self = this
      if (self.exchangeCode && self.exchangeCode.trim() === '') {
        toast('请填写兑换码')
        return
      }
      self.exchangeModal = false
      self.loading.show = true
      debugger
      self.$http.post(window.ctx + '/api/coupon/t/exchange', {code: self.exchangeCode}, {headers: {token: self.token}, emulateJSON: true}).then((response) => {
        let res = response.data
        self.loading.show = false
        if (res.code === 0) {
          toast('兑换成功')
          self.getCouponData(1)
        } else {
          toast(res.message)
        }
      }, (response) => {
        self.loading.show = false
        toast(response.data.message)
      })
    }
  },
  components: {
    NoResult,
    DetailModal,
    Loading,
    Modal
  }
}
</script>
<style>
body {
  background-color: #eaeaea;
}
.my-coupon-list {
  margin-left: 15px;
  margin-top: 10px;
}
.my-coupon-list .btn-exchange {
  display: block;
  font-size: 1.4rem;
  width: 50%;
  margin: 0 auto 10px;
}
.del-info {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #828282;
  text-align: center;
}
.del-info>em {
  color: #ff6251;
}
.coupon-item-wrap {
  position: relative;
}
.coupon-item {
  display: flex;
  height: 100px;
  margin-bottom: 15px;
  position: relative;
  cursor: pointer;
  transition: all .3s linear;
}
.coupon-item-wrap .behind {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
}
.behind button {
  width: 20%;
  height: 100%;
  float: right;
  background: #b3b3b3;
}
.coupon-subitem {
  flex: 4;
  width: 80%;
  display: flex;
  padding: 10px 0;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  background-color: #fff;
}
.coupon-control {
  flex: 1;
  width: 20%;
  border-radius: 4px;
}
.coupon-control .btn-coupon {
  background-color: #ff6251;
  width: 100%;
  height: 100px;
  line-height: 100px;
  background-image: url(../assets/img/coupon-edge.png);
  background-repeat: no-repeat;
  background-position: -5px center;
  background-size: 9px auto;
}
.coupon-control .coupon-status {
  display: block;
  font-size: 1.6rem;
  color: #fff;
  background-color: #9a9a9a;
  text-align: center;
  border-radius: 3px;
}
.coupon-subitem .c-left {
  flex: 1;
  width: 33.333%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  padding: 10px 0;
}
.out-status>p {
  color: #9a9a9a;
}
.c-left::after {
  content: '';
  position: absolute;
  bottom: -16px;
  right: -7px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #eaeaea;
}
.coupon-subitem .c-right {
  position: relative;
  flex: 2;
  width: 66.666%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px 0;
  border-left: 1px dashed #a7a7a7;
}
.c-right::after {
  content: '';
  position: absolute;
  top: -16px;
  left: -6px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #eaeaea;
}
.coupon-price {
  font-size: 2rem;
  color: #ff6251;
  text-align: center;
}
.coupon-limit {
  font-size: 1.2rem;
  color: #ff6251;
  text-align: center;
}
.c-right>h3 {
  font-size: 1.6rem;
  text-align: center;
}
.c-right .coupon-time {
  font-size: 1.2rem;
  text-align: center;
  margin-top: 10px;
}
.my-coupon-list .detail-modal h5 {
  font-weight: normal;
  font-size: 1.4rem;
  margin: 10px auto;
  display: flex;
  align-items: center;
}
.my-coupon-list .detail-modal h5 i {
  display: inline-block;
  width: 5px;
  height: 8px;
  background-color: #ff6251;
  margin-right: 10px;
}
.my-coupon-list .coupon-detail-list {
  padding: 0 15px;
}
.my-coupon-list .coupon-detail-list p {
  font-size: 1.3rem;
  padding-left: 11px;
  color: #8f8e8e;
}
.exchange-code {
  display: block;
  height: 36px;
  line-height: 36px;
  border-bottom: 1px solid #eaeaea;
  width: 80%;
  margin: 30px auto;
  text-align: center;
  -webkit-filter: blur(0); /* chrome bug blurry font or border */
}
</style>
