<style lang="sass">
@import '../assets/css/style.scss'
</style>
<template>
<div class="my-coupon-list">
  <div class="coupon-item-wrap" v-for="(index,item) in items">
    <div class="behind">
      <button class="btn btn-del" @click.prevent="delCoupon(item.id,$index)">删除</button>
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
        <span class="coupon-status btn-coupon" v-if="item.state == 4">已过期</span>
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
</div>
<no-result v-show="noresult" :text=""></no-result>
</template>
<script>
import NoResult from '../components/NoResult'
import Loading from '../components/Loading'
import DetailModal from '../components/DetailModal'
import toast from '../js/toast'
export default {
  data () {
    return {
      loading: {
        show: true
      },
      items: null,
      noresult: false,
      startX: null,
      token: '',
      showDetail: false,
      couponDetail: {}
    }
  },
  created () {
    let self = this
    self.token = localStorage.getItem('token')
    self.$http('/api/coupon/t/list', {headers: {token: localStorage.token}}).then(function (response) {
      let res = response.data
      self.loading.show = false
      if (res.code === 0) {
        self.$set('items', res.result.result)
        if (!res.result.result || res.result.result.length === 0) {
          self.noresult = true
        }
      } else {
        self.noresult = true
      }
    }).catch(function (response) {
      console.log(response)
    })
  },
  computed: {
    moveWidth: function () {
      return document.querySelector('.btn-del').clientWidth
    }
  },
  methods: {
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
    delCoupon (couponId, index) {
      let self = this
      self.$http.post('/api/coupon/t/deleteCoupon', {couponId: couponId}, {headers: {token: self.token}}).then((response) => {
        let res = response.data
        if (res.code === 0) {
          toast('删除成功')
          self.items.$remove(self.items[index])
        } else {
          toast('删除失败')
        }
      }, (response) => {
        toast('删除失败')
      })
    },
    showCouponDetail (couponId) {
      let self = this
      self.$http.post('/api/coupon/detail', {couponId: couponId}).then((response) => {
        let res = response.data
        if (res.code === 0) {
          self.$set('couponDetail', res.result)
          self.showDetail = true
        }
      })
    },
    useCoupon (couponId, applyShop) {
      window.location.href = 'apointment.html?couponId=' + couponId + 'shopId=' + applyShop
    }
  },
  components: {
    NoResult,
    DetailModal,
    Loading
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
.coupon-item-wrap {
  position: relative;
}
.coupon-item {
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
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
  -webkit-box-flex:4;
  flex: 4;
  -webkit-flex:4;
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
  padding: 10px 0;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  background-color: #fff;
}
.coupon-control {
  -webkit-box-flex:1;
  flex: 1;
  -webkit-flex:1;
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
  -webkit-box-flex:1;
  flex: 1;
  -webkit-flex:1;
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
  right: -6px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #eaeaea;
}
.coupon-subitem .c-right {
  position: relative;
  -webkit-box-flex:2;
  flex: 2;
  -webkit-flex:2;
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
  font-size: 1.8rem;
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
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
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
</style>
