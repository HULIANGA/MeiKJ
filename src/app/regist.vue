<style lang="sass">
@import '../assets/css/style.scss'
</style>
<template>
  <div class="regist-page">
    <img src="../assets/img/login-header.jpg">
    <div class="regist-body">
      <div class="input-item">
        <input class="user-phone" type="tel" placeholder="请输入手机号" v-model="phone" @keyup.enter="register">
      </div>
      <div class="input-item input-code">
        <input class="user-code" type="tel" placeholder="请输入验证码" v-model="verifyCode" @keyup.enter="register">
        <button class="btn btn-code" @click.prevent="getVerifyCode" :disabled="disabled">{{disabled ? count : '获取验证码'}}</button>
      </div>
      <div class="input-item">
        <input class="user-pwd" type="password" placeholder="请设置密码" v-model="password" @keyup.enter="register">
      </div>
      <button class="btn btn-confirm" @click.prevent="register">注册</button>
    </div>
    <p class="clearfix regist-link"><a class="pull-r" :href="login">已有账号，去登录</a></p>
  </div>
  <loading :show="loading.show" :show-text="loading.showText"></loading>
    <modal :show.sync="showModal">
      <div slot="modal-header" class="modal-header">
        <button class="close" @click.prevent="goMain"></button>
        <h4 class="modal-title">
          个人信息
        </h4>
      </div>
      <div slot="modal-body" class="modal-body">
        <div class="p-item">
          <div class="p-item-hd">
            <label>昵称</label>
          </div>
          <div class="p-item-bd">
            <input type="text" placeholder="昵称" v-model="userInfo.nickName" maxlength="15">
          </div>
        </div>
        <div class="p-item">
          <div class="p-item-hd">
            <label>性别</label>
          </div>
          <div class="p-item-bd">
            <input type="radio" name="gender" value="1" v-model="userInfo.gender">男
            <input type="radio" name="gender" value="0" v-model="userInfo.gender">女
          </div>
        </div>
      </div>
      <div slot="modal-footer" class="modal-footer">
        <button type="button" class="btn btn-ok" @click.prevent="confirmInfo">确认</button>
        <button type="button" class="btn btn-close" @click.prevent="goMain">跳过</button>
      </div>
  </modal>
</template>
<script>
import utils from '../js/utils'
import toast from '../js/toast'
import Loading from '../components/Loading'
import Modal from '../components/Modal'

export default {
  data () {
    return {
      phone: '',
      verifyCode: '',
      password: '',
      loading: {
        show: false
      },
      userInfo: {
        nickName: '',
        gender: 1,
        email: ''
      },
      disabled: false,
      count: 60,
      showModal: false,
      token: ''
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
    register () {
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
        toast('请输入密码')
        return
      }
      if (!utils.getCheck.checkPhone(self.phone.trim())) {
        toast('请输入正确的手机号')
        return
      }
      self.loading.show = true
      self.$http.post(window.ctx + '/api/customer/register', {mobile: self.phone, password: self.password}, {headers: {code: self.verifyCode}}).then((response) => {
        let res = response.data
        if (res.code === 0) {
          self.loading.show = false
          toast('注册成功')
          self.loading.show = true
          self.$http.post(window.ctx + '/api/customer/login', {mobile: self.phone, password: self.password}).then((response) => {
            self.loading.show = false
            if (response.data.code === 0) {
              localStorage.loginid = response.data.result.id
              localStorage.loginphone = this.phone
              localStorage.loginname = response.data.result.nickName ? response.data.result.nickName : ''
              localStorage.token = response.data.result.token
              self.showModal = true
            }else {
              toast(response.data.message)
              self.loading.show = false
            }
          }, (response) => {
            toast('登录失败')
            self.loading.show = false
          })
        }else {
          self.loading.show = false
          toast(res.message)
        }
      }, (response) => {
        toast('注册失败')
        self.loading.show = false
      })
    },
    getVerifyCode () {
      let self = this
      if (self.phone.trim() === '') {
        toast('请输入手机号')
        return
      }
      if (!utils.getCheck.checkPhone(self.phone.trim())) {
        toast('请输入正确的手机号')
        return
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
    confirmInfo () {
      let self = this
      self.token = localStorage.getItem('token')
      if (self.userInfo.nickName.trim() === '') {
        toast('请填写昵称')
        return
      }
      self.$http.post(window.ctx + '/api/customer/t/edit', {nickName: self.userInfo.nickName, gender: self.userInfo.gender, email: self.userInfo.email}, {headers: {token: self.token}}).then((response) => {
        let res = response.data
        if (res.code === 0) {
          toast('保存成功')
          self.showModal = false
          localStorage.loginname = self.userInfo.nickName ? self.userInfo.nickName : ''
          if (utils.getUrlParam('fromUrl')) {
            window.location.href = decodeURIComponent(utils.getUrlParam('fromUrl'))
          }else {
            window.goPage('main.html')
          }
          // window.goPage('main.html')
        }
      })
    },
    goMain () {
      this.showModal = false
      if (utils.getUrlParam('fromUrl')) {
        window.location.href = decodeURIComponent(utils.getUrlParam('fromUrl'))
      }else {
        window.goPage('main.html')
      }
    }
  },
  components: {
    Loading,
    Modal
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
.modal-body {
  padding: 15px 10px;
}
.p-item {
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
  padding: 10px 15px;
  border-bottom: 1px solid #eaeaea;
  align-items: center;
  -webkit-filter: blur(0);
}
.p-item .p-item-hd {
  font-size: 1.6rem;
}
.p-item .p-item-bd {
  -webkit-box-flex:1;
  flex: 1;
  -webkit-flex:1;
  font-size: 1.5rem;
  text-align: right;
}
.p-item-hd>label {
  display: block;
  width: 105px;
  word-wrap: break-word;
  word-break: break-all;
}
.p-item-bd>input {
  height: 24px;
  line-height: 24px;
  width: 100%;
  text-align: right;
  font-size: 1.5rem;
}
.p-item-bd>input[type=radio] {
  -webkit-appearance:none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #eaeaea;
  vertical-align: middle;
  margin-right: 5px;
  position: relative;
  top: -2px;
}
.p-item-bd>input[type=radio]:checked {
  background-color: #ff6251;
}
.btn-close {
  background-color:#fff;
  color: #333;
	border:1px solid #eaeaea;
}
</style>
