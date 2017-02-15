<style lang="sass">
@import '../assets/css/style.scss'
</style>
<template lang="html">
  <div class="coupon-container">
    <img src="../assets/img/coupon-border.png" alt="">
    <div class="coupon-top-info">
      <h1>优惠券名称</h1>
      <img src="../assets/img/coupon-tag-icon.png" alt="">
      <div class="coupon-detail">
        <div class="coupon-price">
          3折
        </div>
        <div class="coupon-useage">
          <p class="coupon-project">项目：项目A|项目B</p>
          <p class="coupon-time">有效期：2017.1.9 ~ 2017.2.13</p>
        </div>
      </div>
    </div>
    <img src="../assets/img/coupon-split.png" alt="">
    <!-- <div class="coupon-bot-info has-login">
      <img class="person-icon" src="../assets/img/dresser-default.png" alt="">
      <p class="person-name">XX发型师发券给您</p>
      <p class="tips">* 您将领取发型师指定发放的优惠券，领取后将仅限发型师处使用。</p>
      <button type="button" class="get-coupon-btn" name="button">领取</button>
    </div> -->
    <div :class="['coupon-bot-info', hasLogin ? 'has-login' : 'not-login']">
      <img class="person-icon" src="../assets/img/dresser-default.png" alt="">
      <p class="person-name">XX发型师发券给您</p>
      <template v-if="hasLogin">
        <p class="tips">* 您将领取发型师指定发放的优惠券，领取后将仅限发型师处使用。</p>
        <button type="button" class="get-coupon-btn" name="button">领取</button>
      </template>
      <template v-if="!hasLogin">
        <div class="input-div">
          <input type="tel" name="" value="" placeholder="请输入手机号码" maxlength="11" v-model="phone" @keyup.enter="getCoupon">
        </div>
        <div class="input-div code-input-div">
          <input type="tel" name="" value="" placeholder="请输入图形验证码" v-model="imageCode" @keyup.enter="getCoupon">
          <img @click.prevent="changeCodeImage" :src="codeImage" alt="看不清?点击图片换一张" alt="">
        </div>
        <div class="input-div code-input-div">
          <input type="tel" name="" value="" placeholder="请输入短信验证码" v-model="sendVerifyCode" @keyup.enter="getCoupon">
          <button type="button" name="button" class="get-code-btn" @click.prevent="getVerifyCode" :disabled="disabled">{{disabled ? count : '获取验证码'}}</button>
        </div>
        <button type="button" class="get-coupon-btn" name="button" @click.prevent="getCoupon">领取</button>
        <p class="tips">* 您将领取发型师指定发放的优惠券，领取后将仅限发型师处使用。</p>
      </template>
    </div>
  </div>
  <loading :show="loading.show" :show-text=""></loading>
</template>

<script>
import toast from '../js/toast'
import utils from '../js/utils'
import Loading from '../components/Loading'
import autoLogin from '../js/autoLogin'

export default {
  data () {
    return {
      loading: {
        show: true
      },
      hasLogin: false,
      phone: '',
      imageCode: '',
      sendVerifyCode: '',
      codeImage: '',
      ran: '',
      disabled: false,
      count: 60,
      token: localStorage.getItem('token')
    }
  },
  created () {
    let self = this
    self.$http.post(window.ctx + '/api/customer/t/tokenState', {}, {headers: {token: self.token}}).then(function (response) {
      if (response.data.code === 0) {
        self.hasLogin = true
        self.loading.show = false
      }else {
        autoLogin.login({
          component: this,
          yCallback: function () {
            self.hasLogin = true
            self.loading.show = false
          },
          nCallback: function () {
            self.hasLogin = false
            self.loading.show = false
          }
        })
      }
    }, function () {
      self.hasLogin = false
      self.loading.show = false
    })
    self.changeCodeImage()
  },
  methods: {
    changeCodeImage () {
      let self = this
      this.ran = Math.random()
      self.codeImage = window.ctx + '/api/customer/picVerifyCode' + '?c=' + this.ran
    },
    getCoupon () {

    },
    getVerifyCode () {
      let self = this
      if (self.phone.trim() === '') {
        toast('请输入手机号')
        return
      }
      if (self.imageCode.trim() === '') {
        toast('请输入图片验证码')
        return
      }
      if (!utils.getCheck.checkPhone(self.phone.trim())) {
        toast('请输入正确的手机号')
        return
      }
      self.disabled = true
      self.$http.post(window.ctx + '/api/customer/sendVerifyCode', {picText: self.imageCode, c: this.ran, mobile: self.phone, ciphertext: '7C4A8D09CA3762AF61E59520943DC26494F8941B'}).then((response) => {
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
          self.disabled = false
        }
      }, (response) => {
        toast('发送失败')
        self.disabled = false
      })
    }
  },
  components: {
    Loading
  }
}
</script>

<style lang="css">
  html, body {
    height: 100%;
  }
  body {
    overflow-y: auto;
    background-image: url(../assets/img/coupon-back.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: left top;
  }
  .coupon-container {
    margin: 10px 20px;
  }
  .coupon-top-info {
    background-color: rgba(255, 255, 255, 0.8);
    text-align: center;
    padding: 30px 0 20px;
  }
  .coupon-top-info>h1 {
    font-size: 24px;
  }
  .coupon-top-info>img {
    width: 24px;
  }
  .coupon-detail {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
  }
  .coupon-price {
    font-size: 24px;
    color: #ff6251;
    margin-right: 20px;
  }
  .coupon-useage {
    font-size: 9px;
    text-align: left;
  }
  .coupon-time {
    color: #a7a7a7;
  }
  .coupon-bot-info {
    background-color: rgba(255, 255, 255, 0.8);
    text-align: center;
    padding: 0 25px;
  }
  .person-icon {
    width: 60px;
  }
  .get-coupon-btn {
    width: 100%;
    background: #ff6251;
    line-height: 40px;
  }
  .coupon-bot-info .tips {
    color: #ff6251;
    text-align: left;
  }
  .coupon-bot-info.has-login {
    padding: 25px 25px 45px;
  }
  .coupon-bot-info.has-login .person-icon {

  }
  .coupon-bot-info.has-login .person-name {
    margin: 25px 0;
    font-size: 14px;
  }
  .coupon-bot-info.has-login .tips {
    margin-bottom: 15px;
  }
  .coupon-bot-info.has-login .get-coupon-btn {

  }
  .input-div {
    margin: 5px 0;
    position: relative;
  }
  .input-div.code-input-div {
    padding-right: 90px;
  }
  .input-div input {
    line-height: 38px;
    border: 1px solid #ff6251;
    padding: 0 10px;
    font-size: 13px;
    width: 100%;
    box-sizing: border-box;
    border-radius: 5px;
  }
  .input-div img {
    position: absolute;
    right: 0;
    top: 0;
    width: 85px;
    height: 40px;
  }
  .input-div button {
    position: absolute;
    right: 0;
    top: 0;
    background: #ff6251;
    width: 85px;
    font-size: 12px;
    line-height: 40px;
    border-radius: 5px;
  }
  .coupon-bot-info.not-login {
    padding: 20px 25px;
  }
  .coupon-bot-info.not-login .person-icon {
    margin-bottom: 20px;
    float: left;
  }
  .coupon-bot-info.not-login .person-name {
    display: inline-block;
    font-size: 14px;
    margin: 0 0 20px 20px;
    line-height: 60px;
    float: left;
  }
  .coupon-bot-info.not-login .tips {
    margin: 10px 0;
  }
  .coupon-bot-info.not-login .get-coupon-btn {

  }
</style>
