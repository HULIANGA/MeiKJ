<style lang="sass">
@import '../assets/css/style.scss'
</style>
<template lang="html">
  <div class="coupon-container">
    <img src="../assets/img/coupon-border.png" alt="">
    <div class="coupon-top-info">
      <h1>{{couponInfo.couponName}}</h1>
      <img src="../assets/img/coupon-tag-icon.png" alt="">
      <div class="coupon-detail">
        <div class="coupon-price">
          <p>{{{couponInfo.couponPrice}}}</p>
          <p class="coupon-limit" v-if="couponInfo.couponLimit">{{couponInfo.couponLimit}}</p>
        </div>
        <div class="coupon-useage">
          <p class="coupon-project">项目：{{couponInfo.projectName}}</p>
          <p class="coupon-time">有效期：{{couponInfo.startTime}} ~ {{couponInfo.endTime}}</p>
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
      <img class="person-icon" v-if="dresserLogo" :src="dresserLogo" alt="">
      <p class="person-name">{{couponInfo.barberName}}发券给您</p>
      <template v-if="hasLogin">
        <p class="tips">* 您将领取发型师指定发放的优惠券，领取后将仅限发型师处使用。</p>
        <button type="button" class="get-coupon-btn" name="button" @click.prevent="getCoupon">领取</button>
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
  <div class="coupon-success-dialog" v-show="showDialog">
    <img src="../assets/img/barber-coupon-success.png" class="dialog-success" alt="领取成功">
    <div class="dialog-buttons clearfix">
      <a href="" type="button" class="btn btn-default" @click.prevent="goMain">到丽人淘逛逛</a>
      <a href="" type="button" class="btn btn-primary" @click.prevent="useCoupon">直接使用</a>
    </div>
    <img src="../assets/img/barber-coupon-close.png" class="dialog-close" alt="关闭" @click.prevent="showDialog=false">
  </div>
  <dialog :show.sync="dialog.show" :title="dialog.title" :is-B.sync="dialog.isB" :ok-text="dialog.okText" :cancel-text="dialog.cancelText" :callback="dialog.callback"></dialog>
  <loading :show="loading.show" :show-text=""></loading>
</template>

<script>
import toast from '../js/toast'
import utils from '../js/utils'
import Loading from '../components/Loading'
import autoLogin from '../js/autoLogin'
import Dialog from '../components/Dialog'

export default {
  data () {
    return {
      dialog: {
        isB: false,
        show: false,
        title: '',
        cancelText: '关闭',
        okText: '确定',
        callback: null
      },
      loading: {
        show: true
      },
      showDialog: false,
      hasLogin: false,
      phone: '',
      imageCode: '',
      sendVerifyCode: '',
      codeImage: '',
      ran: '',
      disabled: false,
      count: 60,
      dresserLogo: null,
      couponId: '',
      couponInfo: {
        couponName: '',
        couponPrice: '',
        couponLimit: '',
        startTime: '',
        endTime: '',
        projectName: '',
        barberName: ''
      }
    }
  },
  created () {
    let self = this
    self.couponId = utils.getUrlParam('couponId')
    // 发型师详情
    self.$http.post(window.ctx + '/api/barber/detail', {barberId: utils.getUrlParam('barberId')}).then((response) => {
      let res = response.data.result
      self.couponInfo.barberName = res.stageName
      self.dresserLogo = window.imageDomain + res.logo
    }, (response) => {
    })
    // 优惠券详情
    self.$http.post(window.ctx + '/api/coupon/detail', {couponId: self.couponId}).then(function (response) {
      var res = response.data.result
      self.couponInfo.couponName = res.name // 优惠券名称
      // 优惠券金额
      if (res.type === 1) {
        self.couponInfo.couponPrice = res.discount / 10 + '折'
      }else if (res.type === 2) {
        self.couponInfo.couponPrice = '&yen;' + res.money
        self.couponInfo.couponLimit = '（满' + res.line + '可用）'
      }else if (res.type === 3) {
        self.couponInfo.couponPrice = '&yen;' + res.quota
      }
      // 有效时间
      self.couponInfo.startTime = res.startTime
      self.couponInfo.endTime = res.endTime
      // 使用项目
      self.couponInfo.projectName = res.projectName
    }, function (response) {
    })
    // 自动登录
    self.$http.post(window.ctx + '/api/customer/t/tokenState', {}, {headers: {token: localStorage.getItem('token')}}).then(function (response) {
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
  ready () {
    let self = this
    let isCanuse = utils.getUrlParam('isCanuse')
    if (isCanuse === 'true') {
    }else {
      self.dialog.title = '当前优惠券不可用，到丽人淘逛逛吧'
      self.dialog.show = true
      self.dialog.callback = function () {
        window.goPage('main.html')
      }
    }
  },
  methods: {
    changeCodeImage () {
      let self = this
      this.ran = Math.random()
      self.codeImage = window.ctx + '/api/customer/picVerifyCode' + '?c=' + this.ran
    },
    goMain () {
      window.goPage('main.html')
    },
    useCoupon () {
      debugger
      window.goPage('apointment.html?couponId=' + this.couponId + '&personId=' + utils.getUrlParam('barberId') + '&personName=' + encodeURIComponent(this.couponInfo.barberName))
    },
    getCoupon () {
      var self = this
      if (!self.hasLogin) { // 未登录时先登录
        self.login()
      }else {
        self.loading.show = true
        self.$http.get(window.ctx + '/api/coupon/t/receiveBarberCoupon', {
          couponId: utils.getUrlParam('couponId'),
          code: utils.getUrlParam('code'),
          barberId: utils.getUrlParam('barberId')
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        }).then(function (response) {
          self.loading.show = false
          if (response.data.code === 0) {
            self.showDialog = true
          }else {
            toast(response.data.message)
          }
        }, function (response) {
          self.loading.show = false
        })
      }
    },
    login () {
      let self = this
      if (self.phone.trim() === '') {
        toast('请输入手机号')
        return
      }
      if (self.imageCode.trim() === '') {
        toast('请输入图片验证码')
        return
      }
      if (self.sendVerifyCode.trim() === '') {
        toast('请输入验证码')
        return
      }
      if (!utils.getCheck.checkPhone(self.phone.trim())) {
        toast('请输入正确的手机号')
        return
      }
      self.loading.show = true
      self.$http.post(window.ctx + '/api/customer/codeLogin' + (utils.getUrlParam('session_key') ? ('?session_key=' + utils.getUrlParam('session_key')) : ''), {mobile: self.phone}, {headers: {code: self.sendVerifyCode}}).then((response) => {
        if (response.data.code === 0) {
          localStorage.loginid = response.data.result.id
          localStorage.loginphone = this.phone
          localStorage.loginname = response.data.result.nickName ? response.data.result.nickName : ''
          localStorage.token = response.data.result.token
          self.loading.show = false
          // 登陆成功，领取优惠券
          self.hasLogin = true
          self.getCoupon()
        }else {
          toast(response.data.message)
          self.loading.show = false
        }
      }, (response) => {
        toast('登录失败')
        self.loading.show = false
      })
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
    Loading,
    Dialog
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
    padding: 30px 10px 20px;
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
  .coupon-limit {
    font-size: 10px;
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
    height: 60px;
    border-radius: 50%;
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
  .coupon-success-dialog {
    position: fixed;
    overflow-y: auto;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.8);
    text-align: center;
    width: 100%;
    height: 100%;
    padding-bottom: 50px;
    box-sizing: border-box;
  }
  .dialog-success {
    width: 80%;
    margin-top: 50px;
  }
  .dialog-buttons {
    width: 80%;
    margin: 0 auto;
    margin-top: 15px;
  }
  .dialog-buttons .btn {
    line-height: 40px;
    width: 45%;
    box-sizing: border-box;
    font-size: 14px;
  }
  .dialog-buttons .btn.btn-primary {
    float: right;
  }
  .dialog-buttons .btn.btn-default {
    float: left;
    background: transparent;
    border: 1px solid #fff;
    line-height: 38px;
  }
  .dialog-close {
    width: 30px;
    margin-top: 40px;
  }
</style>
