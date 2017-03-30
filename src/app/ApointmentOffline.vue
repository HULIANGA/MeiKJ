<template lang="html">
  <table>
    <thead>
      <th>
        发型师职位
      </th>
      <th>
        价格
      </th>
      <th>
        排号数
      </th>
      <th>
        预约
      </th>
    </thead>
    <tbody>
      <tr v-for="item in serviceItem">
        <td>
          {{item.positionName}}
        </td>
        <td>
          洗剪吹&yen;{{item.blowCutPrice}}
        </td>
        <td>
          {{item.waitCount}}
        </td>
        <td>
          <input type="radio" name="position" :value="item.positionId" v-model="positionId">
        </td>
      </tr>
    </tbody>
  </table>
  <div class="input-panel">
    <div class="input-div">
      <input placeholder="请输入您的姓名" maxlength="4" v-model="customerName" @keyup.enter="goAppoint">
    </div>
    <div class="input-div">
      <input type="tel" placeholder="请输入手机号码" maxlength="11" v-model="phone" @keyup.enter="goAppoint">
    </div>
    <template v-if="!hasLogin">
      <div class="input-div code-input-div">
        <input type="tel" placeholder="请输入图形验证码" v-model="imageCode" @keyup.enter="goAppoint">
        <img @click.prevent="changeCodeImage" :src="codeImage" alt="看不清?点击图片换一张" alt="">
      </div>
      <div class="input-div code-input-div">
        <input type="tel" placeholder="请输入短信验证码" v-model="sendVerifyCode" @keyup.enter="goAppoint">
        <button type="button" name="button" class="get-code-btn" @click.prevent="getVerifyCode" :disabled="disabled">{{disabled ? count : '获取验证码'}}</button>
      </div>
    </template>
    <p class="tips">
      *您的预约排号完成后，发型师将叫号为您服务，届时您可以与发型师确认服务项目及服务金额。
    </p>
  </div>
  <div class="appoint-btn">
    <button type="button" name="button" @click.prevent="goAppoint">预约</button>
  </div>
  <loading :show="loading.show"></loading>
</template>

<script>
import Loading from '../components/Loading'
import autoLogin from '../js/autoLogin'
import utils from '../js/utils'
import toast from '../js/toast'

export default {
  data () {
    return {
      token: localStorage.token,
      loading: {
        show: true
      },
      shopId: null,
      hasLogin: false,
      phone: '',
      imageCode: '',
      sendVerifyCode: '',
      codeImage: '',
      ran: '',
      disabled: false,
      count: 60,
      customerName: '',
      positionId: '',
      serviceItem: null // 项目数据
    }
  },
  computed: {},
  created () {
    var self = this
    self.shopId = utils.getUrlParam('shopId')
    self.getProject({shopId: utils.getUrlParam('shopId')}) // 获取项目列表
    // 自动登录
    self.$http.post(window.ctx + '/api/customer/t/tokenState', {}, {headers: {token: localStorage.getItem('token')}}).then(function (response) {
      if (response.data.code === 0) {
        self.hasLogin = true
        self.loading.show = false
        self.phone = localStorage.loginphone
        if (!self.customerName) {
          self.customerName = localStorage.loginname
        }
      }else {
        autoLogin.login({
          component: this,
          yCallback: function () {
            self.hasLogin = true
            self.loading.show = false
            self.phone = localStorage.loginphone
            if (!self.customerName) {
              self.customerName = localStorage.loginname
            }
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
  },
  attached () {},
  events: {
  },
  methods: {
    goAppoint () {
      var self = this
      if (!self.hasLogin) { // 未登录时先登录
        self.login()
      }else {
        if (!self.positionId) {
          toast('请选择您要预约的发型师')
          return false
        }
        if (!self.customerName) {
          toast('请输入您的姓名')
          return false
        }
        self.loading.show = true
        self.$http.post(window.ctx + '/api/order/t/saveOfflineOrder', {
          shopId: self.shopId,
          customerName: self.customerName,
          customerPhone: self.phone,
          positionId: self.positionId
        }, {headers: {token: localStorage.token}, emulateJSON: false}).then(function (response) {
          self.loading.show = false
          if (response.data.code === 0) {
            localStorage.setItem('showRownumDialog', 'true')
            window.goPage('userCenter.html')
          }else {
            toast(response.data.message)
          }
        }, function (response) {
          self.loading.show = false
          toast(response.data.message)
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
          if (self.customerName) {
            localStorage.loginname = self.customerName
          }else {
            self.customerName = localStorage.loginname
          }
          self.phone = this.phone
          self.hasLogin = true
          self.goAppoint()
        }else {
          toast(response.data.message)
          self.loading.show = false
        }
      }, (response) => {
        toast('登录失败')
        self.loading.show = false
      })
    },
    getProject: function (requestData) {
      this.loading.show = true
      this.$http.get(window.ctx + '/api/shop/waitNumList', requestData).then(function (response) {
        this.loading.show = false
        var res = response.data
        if (res.code === 0) {
          this.serviceItem = res.result
        }else {
          toast(res.message)
        }
      }, function (response) {
        this.loading.show = false
        toast('获取项目失败')
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

<style lang="sass">
  @import '../assets/css/style.scss'
</style>
<style>
html, body {
  height: 100%;
  background: #eeeeee;
}
body {
  padding-bottom: 60px;
  box-sizing: border-box;
  overflow-y: auto;
}
table {
  width: 100%;
  border-spacing: 0;
  background: #ffffff;
  font-size: 13px;
  line-height: 30px;
}
table thead th, table tbody tr td {
  text-align: center;
  padding: 4px 0;
}
table thead th:first-child, table tbody tr td:first-child {
  text-align: left;
  padding-left: 10px;
}
table thead th:last-child, table tbody tr td:last-child {
  text-align: right;
  padding-right: 10px;
}
input[type=radio] {
  appearance:none;
  width: 17px;
  height: 17px;
  background-image: url(../assets/img/not-check.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  float: right;
  background-color: #ffffff;
}
input[type=radio]:checked {
  background-image: url(../assets/img/checked.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
.input-panel {
  margin-top: 10px;
  background: #ffffff;
  padding: 5px 10px;
}
.input-div {
  margin: 10px 0;
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
.appoint-btn {
  position: absolute;
  bottom: 0;
  text-align: center;
  height: 60px;
  width: 100%;
  background: #ffffff;
}
.appoint-btn button {
  background: #ff6251;
  line-height: 40px;
  width: 90%;
  margin-top: 10px;
}
.tips {
  color: #888;
  margin: 20px 0 10px;
}
</style>
