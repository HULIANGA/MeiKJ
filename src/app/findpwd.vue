<style lang="sass">
@import '../assets/css/style.scss'
</style>
<template>
  <div class="regist-page">
    <img src="../assets/img/login-header.jpg">
    <div class="regist-body">
      <div class="input-item">
        <input class="user-phone" type="tel" placeholder="请输入手机号" v-model="phone" @keyup.enter="findPwd">
      </div>
      <div class="input-item input-code">
        <input class="user-code" type="tel" placeholder="请输入验证码" v-model="verifyCode" @keyup.enter="findPwd">
        <button class="btn btn-code" :disabled="disabled" @click.prevent="getVerifyCode">{{disabled ? count : '获取验证码'}}</button>
      </div>
      <div class="input-item">
        <input class="user-pwd" type="password" placeholder="请设置您的新密码" v-model="password" @keyup.enter="findPwd">
      </div>
      <button class="btn btn-confirm" @click.prevent="findPwd">确认提交</button>
    </div>
    <p class="clearfix regist-link"><a class="pull-r" @click="goPage(login)">想起密码，去登录</a></p>
  </div>
  <loading :show="loading.show" :show-text="loading.showText"></loading>
</template>
<script>
import utils from '../js/utils'
import toast from '../js/toast'
import Loading from '../components/Loading'

export default {
  data () {
    return {
      phone: '',
      verifyCode: '',
      password: '',
      loading: {
        show: false
      },
      disabled: false,
      count: 60
    }
  },
  computed: {
    login: function () {
      if (utils.getUrlParam('fromUrl')) {
        return 'login.html?fromUrl=' + utils.getUrlParam('fromUrl')
      }else {
        return 'login.html'
      }
    }
  },
  methods: {
    getVerifyCode () {
      let self = this
      if (self.phone.trim() === '') {
        toast('请输入手机号')
        return
      }
      if (!utils.getCheck.checkPhone(self.phone.trim())) {
        toast('请输入正确的手机号')
      }
      self.disabled = true
      self.$http.post(window.ctx + '/api/customer/verifyCode', {mobile: self.phone, ciphertext: '7C4A8D09CA3762AF61E59520943DC26494F8941B'}).then((response) => {
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
        }
      }, (response) => {
        toast('发送失败')
        self.disabled = false
      })
    },
    findPwd () {
      let self = this
      if (self.phone.trim() === '') {
        toast('请输入手机号')
        return
      }
      if (self.verifyCode.trim() === '') {
        toast('请输入验证码')
        return
      }
      if (self.password.trim() === '') {
        toast('请输入新密码')
        return
      }
      self.loading.show = true
      self.$http.post(window.ctx + '/api/customer/resetPwd', {mobile: self.phone, password: self.password}, {headers: {code: self.verifyCode}}).then((response) => {
        let res = response.data
        if (res.code === 0) {
          self.loading.show = true
          self.$http.post(window.ctx + '/api/customer/login', {mobile: self.phone, password: self.password}).then((response) => {
            self.loading.show = false
            if (response.data.code === 0) {
              localStorage.loginid = response.data.result.id
              localStorage.loginname = response.data.result.nickName ? response.data.result.nickName : ''
              localStorage.loginphone = this.phone
              localStorage.token = response.data.result.token
              if (utils.getUrlParam('fromUrl')) {
                window.goPage(decodeURIComponent(utils.getUrlParam('fromUrl')))
              }else {
                window.goPage('main.html')
              }
            }else {
              self.loading.show = false
              toast(res.message)
            }
          }, (response) => {
            toast('登录失败')
            self.loading.show = false
          })
        }else {
          toast('重置密码失败')
          self.loading.show = false
        }
      }, (response) => {
        toast('重置密码失败')
        self.loading.show = false
      })
    },
    goPage: function (url) {
      window.goPage(url)
    }
  },
  components: {
    Loading
  }
}
</script>
<style>
.regist-body {
  padding: 0 12%;
}
.regist-link {
  padding: 20px 8%;
}
.regist-link > a {
  font-size: 1.4rem;
  padding: 5px;
  color: #333;
}
</style>
