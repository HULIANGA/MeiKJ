<style lang="sass">
@import '../assets/css/style.scss'
</style>
<template>
  <div class="login-page">
    <img src="../assets/img/login-header.jpg">
    <div class="login-body">
      <div class="input-item">
        <input class="user-phone" type="tel" placeholder="请输入手机号" v-model="phone" maxlength="11">
      </div>
      <div class="input-item">
        <input class="user-pwd" type="password" placeholder="请输入密码" v-model="password">
      </div>
      <button class="btn btn-confirm" @click.prevent="login">登录</button>
      <p class="clearfix login-link"><a class="pull-l" :href="regist">注册</a><a class="pull-r" :href="forgetPwd">忘记密码？</a></p>
    </div>
  </div>
  <loading :show="loading.show" :show-text="loading.showText"></loading>
</template>
<script>
import toast from '../libs/toast'
import loading from '../components/loading'
import utils from '../libs/utils'

export default {
  data () {
    return {
      regist: 'regist.html',
      forgetPwd: 'findpwd.html',
      loading: {
        show: false,
        showText: 'loading'
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
      self.$http.post('/api/customer/login', {mobile: self.phone, password: self.password}).then((response) => {
        console.log(response.data)
        if (response.data.code === 0) {
          localStorage.loginname = response.data.result.id
          localStorage.token = response.data.result.token
          window.location.href = location.origin + '/dist/html/'
        }
      }, (response) => {

      })
    }
  },
  components: {
    loading
  }
}
</script>
<style>
.login-body {
  padding: 0 15%;
}
.login-link {
  padding-top: 20px;
}
.login-link>a {
  font-size: 1.4rem;
  padding: 5px;
  color: #333;
}
</style>
