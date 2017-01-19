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
        <img src="../assets/img/order-project.png">
        <span>预约项目：</span>
        <span class="value">{{order.productNames}}</span>
      </div>
      <div class="reserve-detail-item">
        <img src="../assets/img/order-time.png">
        <span>等待人数：</span>
        <span class="value">{{order.queueNum}}</span>
      </div>
    </div>
    <div class="user-info">
      <div class="user-info-item">
        <div class="user-info-hd">
          <label>真实姓名：</label>
        </div>
        <div class="user-info-bd">
          <input type="text" v-model="order.orderSubmit.customerName" maxlength="10" placeholder="请输入您的真实姓名">
        </div>
      </div>
      <div class="user-info-item">
        <div class="user-info-hd">
          <label>手机号码：</label>
        </div>
        <div class="user-info-bd">
          <input type="tel" v-model="order.orderSubmit.customerPhone" maxlength="11" placeholder="请输入您的手机号码">
        </div>
      </div>
      <div v-if="!hasLogin" class="user-info-item img-code-item" v-show="order.orderSubmit.customerPhone">
        <div class="user-info-hd">
          <label>图片验证：</label>
        </div>
        <div class="user-info-bd">
          <input type="tel" placeholder="请输入图片验证码" v-model="imageCode">
          <img class="checkCodeImage" @click.prevent="changeCodeImage" :src="codeImage" alt="看不清?点击图片换一张">
        </div>
      </div>
      <div v-if="!hasLogin" class="user-info-item msg-code-item" v-show="order.orderSubmit.customerPhone">
        <div class="user-info-hd">
          <label>短信验证：</label>
        </div>
        <div class="user-info-bd">
          <input type="tel" placeholder="请输入短信验证码" v-model="sendVerifyCode">
          <button class="btn btn-code" @click.prevent="getVerifyCode" :disabled="disabled">{{disabled ? count : '获取验证码'}}</button>
        </div>
      </div>
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
      <div class="o-pay-item">
        <div class="o-pay-hd">
          <img src="../assets/img/alipay.png">
        </div>
        <div class="o-pay-bd">
          <p>支付宝</p>
        </div>
        <div class="o-pay-ft">
          <input type="radio" name="pay" v-model="order.orderSubmit.payType" value="2">
        </div>
      </div>
      <div class="o-pay-item" v-if="systemType === 'DY'">
        <div class="o-pay-hd">
          <img src="../assets/img/shop-pay.png">
        </div>
        <div class="o-pay-bd">
          <p>到店付</p>
        </div>
        <div class="o-pay-ft">
          <input type="radio" name="pay" v-model="order.orderSubmit.payType" value="4">
        </div>
      </div>
    </div>
    <!-- remark -->
    <div class="order-remark">
      <div class="order-remark-item">
        <div class="o-remark-bd">
          <textarea rows="3" placeholder="在这里填上您的备注说明" maxlength="50" v-model="order.orderSubmit.memo"></textarea>
        </div>
      </div>
    </div>
  </div>
  <div class="order-submit">
    <div class="o-submit-left">
      <p>
        <span class="real-price">实付金额：{{order.orderSubmit.realPrice}}元</span>
      </p>
    </div>
    <div class="o-submit-right">
      <button class="btn btn-submit" @click.prevent.stop="submit()">提交</button>
    </div>
  </div>
</div>
</template>
<script>
  import utils from '../js/utils'
  import toast from '../js/toast'
  import autoLogin from '../js/autoLogin'

  export default {
    data () {
      return {
        isWeixin: /MicroMessenger/i.test(navigator.userAgent),
        token: localStorage.token,
        systemType: window.systemType,
        hasLogin: false,
        codeImage: '',
        imageCode: '',
        ran: '',
        sendVerifyCode: '',
        disabled: false,
        count: 60
      }
    },
    created () {
      var self = this
      self.$parent.loading.show = true
      self.$http.post(window.ctx + '/api/customer/t/tokenState', {}, {headers: {token: self.token}}).then(function (response) {
        var res = response.data
        if (res.code === 0) {
          self.$parent.loading.show = false
          self.hasLogin = true
        } else {
          autoLogin.login({
            component: self,
            yCallback: function () {
              self.$parent.loading.show = false
              self.hasLogin = true
              self.token = localStorage.token
              self.order.orderSubmit.customerPhone = localStorage.loginphone
              self.order.orderSubmit.customerName = localStorage.loginname
            },
            nCallback: function () {
              self.$parent.loading.show = false
              self.hasLogin = false
            }
          })
        }
      }, function (response) {
        autoLogin.login({
          component: self,
          yCallback: function () {
            self.$parent.loading.show = false
            self.hasLogin = true
            self.token = localStorage.token
            self.order.orderSubmit.customerPhone = localStorage.loginphone
            self.order.orderSubmit.customerName = localStorage.loginname
          },
          nCallback: function () {
            self.$parent.loading.show = false
            self.hasLogin = false
          }
        })
      })
    },
    ready () {
      this.changeCodeImage()
    },
    methods: {
      submit: function () {
        let self = this
        if (self.order.orderSubmit.customerPhone.trim() === '') {
          toast('请输入手机号')
          return
        }
        if (!self.hasLogin) { // 未登录下单
          if (self.imageCode.trim() === '') {
            toast('请输入图片验证码')
            return
          }
          if (self.sendVerifyCode.trim() === '') {
            toast('请输入验证码')
            return
          }
        }
        if (!utils.getCheck.checkPhone(self.order.orderSubmit.customerPhone.trim())) {
          toast('请输入正确的手机号')
          return
        }
        self.$parent.loading.show = true
        if (!self.hasLogin) { // 未登录下单
          self.$http.post(window.ctx + '/api/customer/codeLogin' + (utils.getUrlParam('session_key') ? ('?session_key=' + utils.getUrlParam('session_key')) : ''), {mobile: self.order.orderSubmit.customerPhone}, {headers: {code: self.sendVerifyCode}, emulateJSON: true}).then((response) => {
            if (response.data.code === 0) {
              localStorage.loginid = response.data.result.id
              localStorage.loginphone = self.order.orderSubmit.customerPhone
              localStorage.loginname = response.data.result.nickName ? response.data.result.nickName : ''
              self.token = localStorage.token = response.data.result.token
              if (self.order.orderSubmit.realPrice === 0) {
                self.order.orderSubmit.realPrice = 0.01
              }
              if (self.order.orderSubmit.price === 0) {
                self.order.orderSubmit.price = 0.01
              }
              self.saveOrder()
            }else {
              toast(response.data.message)
              self.$parent.loading.show = false
            }
          }, (response) => {
            toast('登录失败')
            self.$parent.loading.show = false
          })
        } else { // 已登录下单
          if (self.order.orderSubmit.realPrice === 0) {
            self.order.orderSubmit.realPrice = 0.01
          }
          if (self.order.orderSubmit.price === 0) {
            self.order.orderSubmit.price = 0.01
          }
          self.saveOrder()
        }
      },
      saveOrder () {
        var self = this
        self.$http.post(window.ctx + '/api/order/t/saveOfflineOrder', self.order.orderSubmit, {headers: {token: self.token}}).then(function (response) {
          localStorage.loginname = self.order.orderSubmit.customerName
          let res = response.data
          if (res.code === 0) {
            if (this.order.orderSubmit.payType === '4' || this.order.orderSubmit.payType === 4) { // 到店付
              toast('订单提交成功')
              setTimeout(function () {
                window.goPage('userCenter.html')
              }, 500)
            }else {
              toast('订单提交成功，请在15分钟内完成付款')
              if (this.order.orderSubmit.payType === '1' || this.order.orderSubmit.payType === 1) { // 微信支付
                this.$http.post(window.ctx + '/api/pay/wechat-pay' + (utils.getUrlParam('session_key') ? ('?session_key=' + utils.getUrlParam('session_key')) : ''), res.result, {headers: {token: this.token}, emulateJSON: true}).then(function (response) {
                  window.location.href = response.data
                }, function (response) {
                  this.$parent.loading.show = false
                  toast('支付失败')
                })
              }else if (this.order.orderSubmit.payType === '2' || this.order.orderSubmit.payType === 2) { // 支付宝支付
                this.$http.post(window.ctx + '/api/pay/ali-pay', res.result, {headers: {token: this.token}, emulateJSON: true}).then(function (response) {
                  window.location.href = decodeURIComponent(response.data)
                }, function (response) {
                  this.$parent.loading.show = false
                  toast('支付失败')
                })
              }
            }
          }else if (res.code === 10007) {
            toast('登录已过期，请重新登录')
            setTimeout(function () {
              window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
            }, 1000)
          }else {
            self.$parent.loading.show = false
            toast('订单提交失败')
          }
        }, function (response) {
          self.$parent.loading.show = false
          toast('订单提交失败')
        })
      },
      getVerifyCode () {
        let self = this
        if (self.order.orderSubmit.customerPhone.trim() === '') {
          toast('请输入手机号')
          return
        }
        if (self.imageCode.trim() === '') {
          toast('请输入图片验证码')
          return
        }
        if (!utils.getCheck.checkPhone(self.order.orderSubmit.customerPhone.trim())) {
          toast('请输入正确的手机号')
          return
        }
        self.disabled = true
        self.$http.post(window.ctx + '/api/customer/sendVerifyCode', {picText: self.imageCode, c: this.ran, mobile: self.order.orderSubmit.customerPhone, ciphertext: '7C4A8D09CA3762AF61E59520943DC26494F8941B'}, {emulateJSON: true}).then((response) => {
          let res = response.data
          if (res.code === 0) {
            toast('发送成功')
            const countTime = setInterval(function () {
              self.count = self.count - 1
              if (self.count === 0) {
                self.disabled = false
                self.count = 60
                clearInterval(countTime)
              }
            }, 1000)
          }else {
            toast(response.data.message)
            self.changeCodeImage()
            self.disabled = false
          }
        }, (response) => {
          toast('发送失败')
          self.changeCodeImage()
          self.disabled = false
        })
      },
      changeCodeImage () {
        let self = this
        this.ran = Math.random()
        self.codeImage = window.ctx + '/api/customer/picVerifyCode' + '?c=' + this.ran
      }
    },
    events: {
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
  position: relative;
}
.user-info-item.msg-code-item .user-info-bd {
  padding-right: 80px;
}
.user-info-item.msg-code-item .user-info-bd button {
  position: absolute;
  right: 0;
  top: 0;
  width: 80px;
}
.user-info-item.img-code-item .user-info-bd {
  padding-right: 80px;
}
.user-info-item.img-code-item .user-info-bd img {
  position: absolute;
  right: 0;
  height: auto;
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
