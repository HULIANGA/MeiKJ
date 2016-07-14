<style lang="sass">
@import '../assets/css/style.scss'
</style>
<template>
  <div class="login-page">
    <img src="../assets/img/login-header.jpg">
    <div class="login-body">
      <div class="input-item">
        <input style="display:none"><!-- for disable autocomplete on chrome -->
        <input class="user-phone" type="tel" placeholder="请输入手机号" autocomplete="off" v-model="phone" maxlength="11">
      </div>
      <div class="input-item">
        <input style="display:none"><!-- for disable autocomplete on chrome -->
        <input class="user-pwd" type="password" placeholder="请输入密码" autocomplete="off" v-model="password">
      </div>
      <button class="btn btn-confirm" @click.prevent="login">登录</button>
    </div>
    <p class="clearfix login-link"><a class="pull-l" :href="regist">注册</a><a class="pull-r" :href="forgetPwd">忘记密码？</a></p>
  </div>
  <loading :show="loading.show" :show-text="loading.showText"></loading>
</template>
<script>
import toast from '../libs/toast'
import utils from '../libs/utils'
import Loading from '../components/Loading'

export default {
  data () {
    return {
      regist: 'regist.html',
      forgetPwd: 'findpwd.html',
      loading: {
        show: false
      },
      phone: '',
      password: ''
    }
  },
  methods: {
    login () {
      let self = this
      if (self.phone === '') {
        toast('请输入手机号')
        return
      }
      if (self.password === '') {
        toast('请输入密码')
        return false
      }
      if (!utils.getCheck.checkPhone(self.phone)) {
        toast('请输入正确的手机号')
        return
      }
      self.loading.show = true
      self.$http.post('/api/customer/login', {mobile: self.phone, password: self.password}).then((response) => {
        if (response.data.code === 0) {
          localStorage.loginname = response.data.result.id
          localStorage.loginphone = this.phone
          localStorage.token = response.data.result.token
          window.location.href = 'main.html'
        }else {
          self.loading.show = false
        }
      }, (response) => {
        toast('登录失败')
        self.loading.show = false
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
}
.login-link>a {
  font-size: 1.4rem;
  padding: 5px;
  color: #333;
}
.input-item > input {
  text-align: center;
}
</style>
