<template>
<div class="order-container">
  <div class="order">
    <div class="order-reserve-detail">
      <div class="reserve-detail-item">
        <img src="../assets/img/order-store.png">
        <span>预约门店：<span>
        <span class="value">{{order.shopName}}</span>
      </div>
      <div class="reserve-detail-item">
        <img src="../assets/img/order-hair.png">
        <span>预约发型师：</span>
        <span class="value">{{order.barberName}}</span>
      </div>
      <div class="reserve-detail-item">
        <img src="../assets/img/order-project.png">
        <span>预约项目：</span>
        <span class="value">{{order.productNames}}</span>
      </div>
      <div class="reserve-detail-item">
        <img src="../assets/img/order-time.png">
        <span>预约时间：</span>
        <span class="value">{{order.timeString}}</span>
      </div>
    </div>
    <div class="user-info">
      <div class="user-info-item">
        <div class="user-info-hd">
          <label>真实姓名：</label>
        </div>
        <div class="user-info-bd">
          <input type="text" v-model="order.orderSubmit.customerName" placeholder="请输入您的真实姓名">
        </div>
      </div>
      <div class="user-info-item">
        <div class="user-info-hd">
          <label>手机号码：</label>
        </div>
        <div class="user-info-bd">
          <input type="tel" v-model="order.orderSubmit.customerPhone" placeholder="请输入您的手机号码">
        </div>
      </div>
    </div>
    <div class="user-coupon" @click="showCoupon()">
      <a class="user-info-item">
        <div class="user-info-hd">
          <label>优惠券</label>
        </div>
        <div class="user-info-bd">
          <p class="u-info-text">
            <span v-if="couponName">{{couponName}}</span>
            <span v-else>{{order.couponItem.length}}张可用</span>
          </p>
        </div>
      </a>
    </div>
    <!-- pay  -->
    <div class="order-pay">
      <div class="order-pay-title">付款方式</div>
      <div class="o-pay-item">
        <div class="o-pay-hd">
          <img src="../assets/img/wechat-pay.png">
        </div>
        <div class="o-pay-bd">
          <p>微信支付</p>
        </div>
        <div class="o-pay-ft">
          <input type="radio" name="pay" v-model="order.orderSubmit.payType" value='1'>
        </div>
      </div>
      <!-- <div class="o-pay-item">
        <div class="o-pay-hd">
          <img src="../assets/img/alipay.png">
        </div>
        <div class="o-pay-bd">
          <p>支付宝</p>
        </div>
        <div class="o-pay-ft">
          <input type="radio" name="pay" v-model="order.orderSubmit.payType" value="2">
        </div>
      </div> -->
    </div>
    <!-- remark -->
    <div class="order-remark">
      <div class="order-remark-item">
        <div class="o-remark-bd">
          <textarea rows="3" placeholder="在这里填上您的备注说明" v-model="order.orderSubmit.memo"></textarea>
        </div>
      </div>
    </div>
  </div>
  <div class="order-submit">
    <div class="o-submit-left">
      <p>
        <span class="real-price">实付金额：{{order.orderSubmit.realPrice}}元</span>
        <span class="cut-price">(优惠：{{couponPrice}}元)</span>
      </p>
    </div>
    <div class="o-submit-right">
      <button class="btn btn-submit" @click.prevent.stop="submit()">提交</button>
    </div>
  </div>
</div>
</template>
<script>
  import toast from '../js/toast'

  export default {
    data () {
      return {
        isWeixin: /MicroMessenger/i.test(navigator.userAgent),
        token: localStorage.token,
        couponPrice: 0,
        couponName: null
      }
    },
    methods: {
      submit: function () {
        if (!this.isWeixin) {
          toast('目前只支持微信环境支付')
          // return false
        }
        console.log(this.order.orderSubmit.productList)
        if (this.token) {
          if (!this.order.orderSubmit.customerName) {
            toast('请填写您的姓名')
            return false
          }else if (!this.order.orderSubmit.customerPhone) {
            toast('请填写您的手机号')
            return false
          }else if (!this.order.orderSubmit.memo) {
            // toast('请填写备注说明')
            // return false
          }
          this.$parent.loading.show = true
          if (this.order.orderSubmit.realPrice === 0) {
            this.order.orderSubmit.realPrice = 0.01
          }
          if (this.order.orderSubmit.price === 0) {
            this.order.orderSubmit.price = 0.01
          }
          this.$http.post(window.ctx + '/api/order/t/save', this.order.orderSubmit, {headers: {token: this.token}}).then(function (response) {
            let res = response.data
            if (res.code === 0) {
              toast('订单提交成功，请在15分钟内完成付款')
              this.$http.post(window.ctx + '/api/pay/wechat-pay', res.result, {headers: {token: this.token}, emulateJSON: true}).then(function (response) {
                window.location.href = response.data
              }, function (response) {
                this.$parent.loading.show = false
                toast('支付失败')
              })
            }else if (res.code === 10007) {
              toast('登录已过期，请重新登录')
              setTimeout(function () {
                window.location.href = 'login.html?fromUrl=' + encodeURIComponent(window.location.href)
              }, 1000)
            }else {
              this.$parent.loading.show = false
              toast('订单提交失败')
            }
          }, function (response) {
            this.$parent.loading.show = false
            toast('订单提交失败')
          })
        }else {
          toast('请先登录')
          setTimeout(function () {
            window.location.href = 'login.html?fromUrl=' + encodeURIComponent(window.location.href)
          }, 1000)
        }
      },
      showCoupon: function () {
        window.location.hash = 'coupon'
      }
    },
    events: {
      'select-coupon': function (id, name, type, money) {
        let couponPriceData = {
          couponId: id,
          productIds: this.order.productIds
        }
        this.$parent.loading.show = true
        this.$http.post(window.ctx + '/api/coupon/t/computePrice', couponPriceData, {headers: {token: this.token}}).then(function (response) {
          let res = response.data
          if (res.code === 0) {
            this.$parent.loading.show = false
            this.order.orderSubmit.couponId = id
            this.couponName = name
            money = res.result
            this.couponPrice = money
            this.order.orderSubmit.realPrice = ((this.order.orderSubmit.price * 10 * 10 - money * 10 * 10) / 10 / 10) <= 0 ? 0.01 : (this.order.orderSubmit.price * 10 * 10 - money * 10 * 10) / 10 / 10
          }else if (res.code === 10007) {
            toast('登录已过期，请重新登录')
            setTimeout(function () {
              window.location.href = 'login.html?fromUrl=' + encodeURIComponent(window.location.href)
            }, 1000)
          }else {
            this.$parent.loading.show = false
            toast('抱歉，优惠券使用出错')
          }
        }, function (response) {
          this.$parent.loading.show = false
          toast('抱歉，优惠券使用出错')
        })
        // if (type === 1) { // 折扣
        //   this.couponPrice = this.order.orderSubmit.price * (100 - money * 10) / 10 / 10
        //   this.order.orderSubmit.realPrice = this.order.orderSubmit.price * (money * 10) / 10 / 10
        // }else if (type === 2) {
        //   this.couponPrice = money
        //   this.order.orderSubmit.realPrice = ((this.order.orderSubmit.price * 10 * 10 - money * 10 * 10) / 10 / 10) <= 0 ? 0.01 : (this.order.orderSubmit.price * 10 * 10 - money * 10 * 10) / 10 / 10
        // }else if (type === 3) {
        //   this.couponPrice = money
        //   this.order.orderSubmit.realPrice = ((this.order.orderSubmit.price * 10 * 10 - money * 10 * 10) / 10 / 10) <= 0 ? 0.01 : (this.order.orderSubmit.price * 10 * 10 - money * 10 * 10) / 10 / 10
        // }
        // if (this.order.orderSubmit.realPrice.toString().indexOf('.') > 0) {
        //   this.order.orderSubmit.realPrice = parseFloat(this.order.orderSubmit.realPrice.toFixed(2))
        // }
        // this.order.orderSubmit.couponId = id
        // this.couponName = name
      },
      'cancel-select-coupon': function () {
        this.couponPrice = 0
        this.order.orderSubmit.realPrice = this.order.orderSubmit.price
        this.couponName = ''
        this.order.orderSubmit.couponId = ''
      }
    },
    props: {
      order: Object
    }
  }
</script>
<style scoped>
.order-container {
  height: 100%;
  position: relative;
}
.order{
  height: 100%;
  width: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling:touch;
  position: absolute;
  top: 0;
  padding-bottom: 50px;
  box-sizing: border-box;
}
.order-reserve-detail {
  background-image: url(../assets/img/order-back.png);
  background-repeat: no-repeat;
  background-position: left bottom;
  background-size: 100% 5px;
  background-color: #fff;
  padding: 10px 0 20px;
}
.reserve-detail-item {
  font-size: 1.4rem;
  margin-bottom: 10px;
  padding: 0 15px;
}
.order-reserve-detail .reserve-detail-item:last-child {
  margin-bottom: 0;
}
.reserve-detail-item img {
  width: 18px;
  height: auto;
  margin-right: 8px;
}
.reserve-detail-item>span.value {
  color: #fd6f60;
}
.user-info {
  background-color: #fff;
  margin-top: 15px;
  font-size: 1.4rem;
}
.user-info-item {
  display: flex;
  padding: 10px 15px;
  border-bottom: 1px solid #eaeaea;
  align-items: center;
}
.user-info-item .user-info-hd {
  padding-right: 10px;
  flex-grow: 0;
  line-height: 24px;
}
.user-info-item .user-info-bd {
  flex-grow: 1;
}
.user-info-bd>input {
  height: 24px;
  line-height: 24px;
  width: 100%;
}
.user-coupon {
  background-color: #fff;
  margin-top: 15px;
  font-size: 1.4rem;
}
.u-info-text {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #8d8d8d;
}
.u-info-text::after {
  content: '';
  display: inline-block;
  width: 9px;
  height: 9px;
  border-width: 2px 2px 0 0;
  border-style: solid;
  border-color: #8d8d8d;
  transform: rotate(45deg);
}
.order-pay {
  margin-top: 15px;
  background-color: #fff;
}
.order-pay-title {
  font-size: 1.4rem;
  border-bottom: 1px solid #eaeaea;
  padding: 8px 15px;
}
.o-pay-item {
  padding: 10px 20px;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  position: relative;
  border-bottom: 1px solid #eaeaea;
}
.o-pay-hd {
  display: flex;
  align-items: center;
}
.o-pay-hd>img {
  width: 18px;
  height: auto;
  margin-right: 8px;
}
.o-pay-bd {
  flex: 1;
}
.o-pay-ft {
  text-align: right;
  display: flex;
  align-items: center;
}
.o-pay-ft input[type=radio] {
  -webkit-appearance:none;
  appearance:none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-image:url(../assets/img/not-check.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-color: #ffffff;
}
.o-pay-ft input[type=radio]:checked {
  -webkit-appearance:none;
  appearance:none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-image:url(../assets/img/checked.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
.order-remark {
  margin-top: 15px;
  background-color: #fff;
}
.order-remark-item {
  display: flex;
  padding: 10px 15px;
}
.o-remark-bd {
  flex: 1;
}
.o-remark-bd textarea {
  display: block;
  border: 1px solid #eaeaea;
  border-radius: 3px;
  resize: none;
  font-size: 1.4rem;
  width: 100%;
  line-height: 24px;
  padding: 10px;
  box-sizing: border-box;
  appearance: none;
}
.order-submit {
  position: fixed;
  bottom:0;
  left: 0;
  width: 100%;
  display: flex;
  height: 50px;
  box-sizing: border-box;
}
.o-submit-left {
  background-color: #40403f;
  color: #fff;
  font-size: 1.6rem;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 15px;
  flex-grow: 1;
}
.o-submit-left .cut-price {
  color: #fd6f60;
  font-size: 1.4rem;
  display: inline-block;
}
.o-submit-left .real-price {
  margin-right: 10px;
}
.o-submit-right {
  height: 100%;
  width: 70px;
  flex-grow: 0;
}
.btn-submit {
  height: 50px;
  line-height: 50px;
  width: 100%;
  background-color: #fd6f60;
  border-radius: 0;
  padding: 0;
}
</style>
