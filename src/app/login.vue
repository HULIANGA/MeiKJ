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
      <div class="input-item">
        <input style="display:none"><!-- for disable autocomplete on chrome -->
        <input class="user-pwd" type="password" placeholder="请输入密码" autocomplete="off" v-model="password" @keyup.enter="login">
      </div>
      <button class="btn btn-confirm" @click.prevent="login">登录</button>
    </div>
    <p class="clearfix login-link"><a class="pull-l" :href="regist">注册</a><a class="old-regist" :href="oldRegist">(老用户点此)</a><a class="pull-r" :href="forgetPwd">忘记密码？</a></p>
  </div>
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
      phone: '',
      password: '',
      token: localStorage.getItem('token')
    }
  },
  created () {
    this.autoLogin()
  },
  computed: {
    regist: function () {
      if (utils.getUrlParam('fromUrl')) {
        return 'regist.html?fromUrl=' + utils.getUrlParam('fromUrl')
      }else {
        return 'regist.html'
      }
    },
    oldRegist: function () {
      if (utils.getUrlParam('fromUrl')) {
        return 'oldRegist.html?fromUrl=' + utils.getUrlParam('fromUrl')
      }else {
        return 'oldRegist.html'
      }
    },
    forgetPwd: function () {
      if (utils.getUrlParam('fromUrl')) {
        return 'findPwd.html?fromUrl=' + utils.getUrlParam('fromUrl')
      }else {
        return 'findPwd.html'
      }
    }
  },
  methods: {
    login () {
      let self = this
      if (self.phone.trim() === '') {
        toast('请输入手机号')
        return
      }
      if (self.password.trim() === '') {
        toast('请输入密码')
        return false
      }
      if (!utils.getCheck.checkPhone(self.phone.trim())) {
        toast('请输入正确的手机号')
        return
      }
      self.loading.show = true
      self.$http.post(window.ctx + '/api/customer/login', {mobile: self.phone, password: self.password}).then((response) => {
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
          // window.location.href = 'main.html'
        }else {
          toast(response.data.message)
          self.loading.show = false
        }
      }, (response) => {
        toast('登录失败')
        self.loading.show = false
      })
    },
    autoLogin: function () {
      this.$http.post(window.ctx + '/api/customer/t/tokenState', {}, {headers: {token: this.token}}).then(function (response) {
        let res = response.data
        if (res.code === 0) {
          window.location.href = 'main.html'
        }
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
  display: inline-block;
  margin-left: 8px;
}
.input-item > input {
  text-align: center;
}
</style>
