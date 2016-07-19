<style lang="sass">
@import '../assets/css/style.scss'
</style>
<template>
  <div class="collection">
    <fashion-hair :hairitems="hairItems"></fashion-hair>
  </div>
</template>
<script>
import FashionHair from '../components/FashionHair'
import toast from '../js/toast'

export default {
  data () {
    return {
      hairItems: [],
      token: ''
    }
  },
  ready () {
    let self = this
    self.token = localStorage.token
    if (!self.token) {
      toast('登录已过期，请重新登录')
      setTimeout(function () {
        window.location.href = 'login.html?fromUrl=' + encodeURIComponent(window.location.href)
      }, 1000)
    }
    self.$http.get(window.ctx + '/api/collect/t/list', {}, {headers: {token: self.token}}).then((response) => {
      let res = response.data
      if (res.code === 0) {
        self.$set('hairItems', res.result.result)
      }else if (res.code === 10007) {
        toast('登录已过期，请重新登录')
        setTimeout(function () {
          window.location.href = 'login.html?fromUrl=' + encodeURIComponent(window.location.href)
        }, 1000)
      }
    })
  },
  components: {
    FashionHair
  }
}
</script>
<style>
.collection .hair-item {
  padding: 5px;
}
.collection .hair-like {
  position: absolute;
  right: 5px;
  bottom: 5px;
  background-color: rgba(0,0,0,.4);
  color: #fff;
  background-image: url(../assets/img/good-white.png);
}
</style>
