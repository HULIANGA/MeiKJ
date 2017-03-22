<template lang="html">
  <div class="coupon-container">
    <div class="coupon-list">
      <div class="coupon-item"  v-for="item in items">
        <div class="coupon-subitem">
          <div class="c-left">
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
          <button class="btn btn-coupon" @click.prevent="getCoupon(item.id)">领取</button>
        </div>
      </div>
    </div>
    <div class="close-btn">
      <button type="button" @click="hideCoupons()">关闭</button>
    </div>
  </div>
</template>

<script>
import toast from '../js/toast'

export default {
  data () {
    return {
    }
  },
  methods: {
    hideCoupons: function () {
      this.$dispatch('hide-avali-coupons')
    },
    getCoupon (couponId) {
      let self = this
      if (localStorage.token && localStorage.token !== '') {
        self.$parent.loading.show = true
        self.$http.post(window.ctx + '/api/coupon/t/receive', {couponId: couponId}, {headers: {token: localStorage.token}, emulateJSON: true}).then((response) => {
          let res = response.data
          self.$parent.loading.show = false
          if (res.code === 10007) {
            toast('登录已过期，请重新登录')
            setTimeout(function () {
              window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
            }, 1000)
          }else if (res.code === 10008) {
            toast('请先登录')
            setTimeout(function () {
              window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
            }, 1000)
          }else {
            if (res.code === 0) {
              toast('领取成功')
              self.callback()
            }else {
              toast(res.message)
            }
          }
        }, (response) => {
          self.$parent.loading.show = false
          toast('领取失败')
        })
      } else {
        toast('登录已过期，请重新登录')
        setTimeout(function () {
          window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
        }, 1000)
      }
    }
  },
  props: {
    items: Array,
    callback: {
      type: Function,
      default () {}
    }
  }
}
</script>

<style>
.coupon-container {
  position: fixed;
  width: 100%;
  top: 0;
  background: #eaeaea;
  height: 100%;
  overflow-y: auto;
  padding-bottom: 60px;
  box-sizing: border-box;
}
.coupon-container .close-btn {
  position: fixed;
  bottom: 0;
  text-align: center;
  height: 60px;
  background: #ffffff;
  width: 100%;
}
.coupon-container .close-btn button {
  background: #ff6251;
  line-height: 40px;
  width: 90%;
  margin-top: 10px;
}
.coupon-list {
  margin-top: 10px;
}
.coupon-item {
  display: flex;
  height: 100px;
  margin-bottom: 15px;
}
.coupon-subitem {
  flex: 4;
  display: flex;
  padding: 10px 0;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  background-color: #fff;
  width: 80%;
}
.coupon-control {
  flex: 1;
  width: 20%;
  background-color: #ff6251;
  border-radius: 4px;
}
.coupon-control>button {
  background-color: #ff6251;
  width: 100%;
  height: 100px;
  line-height: 100px;
  background-image: url(../assets/img/coupon-edge.png);
  background-repeat: no-repeat;
  background-position: -5px center;
  background-size: 9px auto;
}
.coupon-subitem .c-left {
  flex: 1;
  width: 33.3333%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  padding: 10px 0;
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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 66.6666%;
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
</style>
