<style lang="sass">
@import '../assets/css/style.scss'
</style>
<template>
  <div class="reset-pwd">
    <div class="reset-body">
      <div class="input-item">
        <input class="user-pwd" type="password" placeholder="请输入您的旧密码" v-model="oldpwd">
      </div>
      <div class="input-item">
        <input class="user-pwd" type="password" placeholder="请设置您的新密码" v-model="password">
      </div>
    </div>
  </div>
  <button class="btn btn-reserve" @click.prevent="reset">重置</button>
</template>
<script>
import toast from '../libs/toast'
export default {
  data () {
    return {
      oldpwd: '',
      password: '',
      token: ''
    }
  },
  methods: {
    reset () {
      let self = this
      self.token = localStorage.getItem('token')
      if (self.oldpwd === '') {
        toast('请输入您的旧密码')
        return false
      }
      if (self.password === '') {
        toast('请输入您的新密码')
        return false
      }
      self.$http.post('/api/customer/t/changePwd', {oldPassword: self.oldpwd, newPassword: self.password}, {headers: {token: self.token}}).then((response) => {
        let res = response.data
        if (res.code === 0) {
          toast('重置成功')
          self.oldpwd = ''
          self.password = ''
        } else {
          toast(res.message)
        }
      })
    }
  }
}
</script>
<style>
.reset-body {
  padding: 0 15%;
}
</style>
