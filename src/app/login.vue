<style lang="sass">
@import '../assets/css/style.scss'
</style>
<template>
  <div class="login-page">
    <img src="../assets/img/login-header.jpg">
    <div class="login-body">
      <div class="input-item">
        <input style="display:none"><!-- for disable autocomplete on chrome -->
        <input class="user-phone" type="tel" placeholder="请输入手机号" autocomplete="off" v-model="phone" maxlength="11" @keyup.enter="login">
      </div>
      <!-- <div class="input-item">
        <input style="display:none"><! for disable autocomplete on chrome -->
        <!-- <input class="user-pwd" type="password" placeholder="请输入密码" autocomplete="off" v-model="password" @keyup.enter="login"> -->
      <!-- </div> -->
      <div class="input-item input-image-code" >
        <input style="display:none"><!-- for disable autocomplete on chrome -->
        <input class="user-imageCode" type="tel" placeholder="请输入图片验证码" v-model="imageCode"  @keyup.enter="login">
				<img class="checkCodeImage" @click.prevent="changeCodeImage" :src="codeImage" alt="看不清?点击图片换一张">
      </div>
      <div class="input-item input-code">
        <input class="user-code" type="tel" placeholder="请输入验证码" v-model="sendVerifyCode" @keyup.enter="login">
        <button class="btn btn-code" @click.prevent="getVerifyCode" :disabled="disabled">{{disabled ? count : '获取验证码'}}</button>
      </div>
      <button class="btn btn-confirm" @click.prevent="login">登录</button>
    </div>

    <!-- <p class="clearfix login-link">
      <a class="pull-l" :href="regist">注册</a>
      <a class="old-regist" :href="oldRegist">(老用户点此)</a>
      <a class="pull-r" :href="forgetPwd">忘记密码？</a>
    </p>
  </div> -->
  <loading :show="loading.show" :show-text="loading.showText"></loading>
</template>
<script>
import toast from '../js/toast'
import utils from '../js/utils'
import Loading from '../components/Loading'

export default {
  data () {
    return {
      loading: {
        show: false
      },
      codeImage: '',
      phone: '',
      imageCode: '',
      userInfo: {
        nickName: '',
        gender: 1,
        email: ''
      },
      sendVerifyCode: '',
      disabled: false,
      count: 60,
      token: localStorage.getItem('token'),
      ran: ''
    }
  },
  created () {
    this.changeCodeImage()
  },
  computed: {
  },
  methods: {
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
      self.$http.post(window.ctx + '/api/customer/codeLogin', {mobile: self.phone}, {headers: {code: self.sendVerifyCode}}).then((response) => {
        if (response.data.code === 0) {
          localStorage.loginid = response.data.result.id
          localStorage.loginphone = this.phone
          localStorage.loginname = response.data.result.nickName ? response.data.result.nickName : ''
          localStorage.token = response.data.result.token
          if (utils.getUrlParam('fromUrl')) {
            window.location.href = decodeURIComponent(utils.getUrlParam('fromUrl'))
          }else {
            window.location.href = 'main.html'
          }
        }else {
          toast(response.data.message)
          self.loading.show = false
        }
      }, (response) => {
        toast('登录失败')
        self.loading.show = false
      })
    },
    changeCodeImage () {
      let self = this
      this.ran = Math.random()
      self.codeImage = window.ctx + '/api/customer/picVerifyCode' + '?c=' + this.ran
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
<style>
.login-body {
  padding: 0 12%;
}
.login-link {
  padding: 20px 8%;
  text-align: center;
}
.login-link>a {
  font-size: 1.4rem;
  padding: 5px;
  color: #333;
  position: relative;
}
.login-link>a:first-child {
  margin-right: 8px;
}
.old-regist {
  display: none;
  margin-left: 8px;
}
.input-item > input {
  text-align: left;
}
</style>
