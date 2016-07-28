<style lang="sass">
@import '../assets/css/style.scss'
</style>

<template>
<div class="personal-data">
  <div class="p-item">
    <div class="p-item-hd">
      <label>昵称</label>
    </div>
    <div class="p-item-bd">
      <p v-show="show">{{userInfo.nickName}}</p>
      <input type="text" placeholder="昵称" v-model="userInfo.nickName" maxlength="15" v-else>
    </div>
  </div>
  <div class="p-item">
    <div class="p-item-hd">
      <label>手机号</label>
    </div>
    <div class="p-item-bd">
      <p>{{userInfo.mobile}}</p>
    </div>
  </div>
  <div class="p-item">
    <div class="p-item-hd">
      <label>性别</label>
    </div>
    <div class="p-item-bd" v-show="show">
      <p v-if="userInfo.gender === 1">男</p>
      <p v-if="userInfo.gender === 0">女</p>
    </div>
    <div class="p-item-bd" v-else>
      <input type="radio" name="gender" value="1" v-model="userInfo.gender" number>男
      <input type="radio" name="gender" value="0" v-model="userInfo.gender" number>女
    </div>
  </div>
  <div class="p-item">
    <div class="p-item-hd">
      <label>我的邮箱</label>
    </div>
    <div class="p-item-bd">
      <p v-show="show">{{userInfo.email}}</p>
      <input type="text" placeholder="我的邮箱" v-model="userInfo.email" v-else>
    </div>
  </div>
</div>
<button class="btn btn-reserve" v-show="show" @click.prevent="edit">编辑</button>
<button class="btn btn-reserve" @click.prevent="save" v-else>保存</button>
</template>
<script>
import utils from '../js/utils'
import toast from '../js/toast'
export default {
  data () {
    return {
      userInfo: {nickName: '', gender: '', email: '', mobile: ''},
      token: '',
      show: true
    }
  },
  created () {
    let self = this
    self.token = localStorage.token
    if (self.token) {
      self.$http.post(window.ctx + '/api/customer/t/detail', {}, {headers: {token: self.token}}).then((response) => {
        let res = response.data
        if (res.code === 0) {
          self.$set('userInfo', res.result)
        }else if (res.code === 10007) {
          toast('登录已过期，请重新登录')
          setTimeout(function () {
            window.location.href = 'login.html?fromUrl=' + encodeURIComponent(window.location.href)
          }, 1000)
        }
      })
    }else {
      toast('请先登录')
      setTimeout(function () {
        window.location.href = 'login.html?fromUrl=' + encodeURIComponent(window.location.href)
      }, 1000)
    }
  },
  methods: {
    edit () {
      let self = this
      self.show = false
    },
    save () {
      let self = this
      if (self.token) {
        if (self.userInfo.nickName === '') {
          toast('昵称不能为空')
          return false
        }
        if (self.userInfo.email && !utils.getCheck.checkEmail(self.userInfo.email)) {
          toast('请填写正确的邮箱地址')
          return false
        }
        self.$http.post(window.ctx + '/api/customer/t/edit', {nickName: self.userInfo.nickName, gender: self.userInfo.gender, email: self.userInfo.email}, {headers: {token: self.token}}).then((response) => {
          let res = response.data
          if (res.code === 0) {
            self.show = true
            toast('修改成功')
          }else if (res.code === 10007) {
            toast('登录已过期，请重新登录')
            setTimeout(function () {
              window.location.href = 'login.html?fromUrl=' + encodeURIComponent(window.location.href)
            }, 1000)
          }
        })
      }else {
        toast('请先登录')
        setTimeout(function () {
          window.location.href = 'login.html?fromUrl=' + encodeURIComponent(window.location.href)
        }, 1000)
      }
    }
  }
}
</script>
<style>
body {
  background-color: #eaeaea;
}
.personal-data {
  margin-top: 15px;
  background-color: #fff;
}
.personal-data .p-item {
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
  padding: 10px 15px;
  border-bottom: 1px solid #eaeaea;
  align-items: center;
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
</style>
