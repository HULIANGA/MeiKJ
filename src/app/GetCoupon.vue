<template lang="html">
  <loading :show="loading.show"></loading>
</template>

<script>
import Loading from '../components/Loading'
import utils from '../js/utils'
import toast from '../js/toast'
import autoLogin from '../js/autoLogin'

export default {
  data () {
    return {
      loading: {
        show: true
      }
    }
  },
  created: function () {
    let self = this
    self.loading.show = true
    this.$http.post(window.ctx + '/api/customer/t/tokenState', {}, {headers: {token: localStorage.token}}).then(function (response) {
      let res = response.data
      if (res.code === 0) {
        self.getCoupon()
      }else {
        autoLogin.login({
          component: this,
          yCallback: function () {
            self.getCoupon()
          },
          nCallback: null
        })
      }
    }, function () {
      toast('请先登录')
      setTimeout(function () {
        window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
      }, 1000)
    })
  },
  computed: {},
  ready () {},
  attached () {},
  methods: {
    getCoupon () {
      var self = this
      if (utils.getUrlParam('couponId')) {
        self.$http.post(window.ctx + '/api/coupon/t/receive', {couponId: utils.getUrlParam('couponId')}, {headers: {token: localStorage.token}}).then((response) => {
          let res = response.data
          if (res.code === 10007) {
            toast('登录已过期，请重新登录')
            setTimeout(function () {
              window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
            }, 1000)
          }else if (res.code === 10008) {
            toast('请先登录')
            setTimeout(function () {
              window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
            }, 1000)
          }else {
            toast('领取成功')
            window.goPage('userCenter.html')
          }
        }, (response) => {
          self.loading.show = false
          toast('领取失败')
        })
      }
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
