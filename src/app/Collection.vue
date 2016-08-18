<style lang="sass">
@import '../assets/css/style.scss'
</style>
<template>
  <div class="collection">
    <fashion-hair :hairitems="hairItems"></fashion-hair>
  </div>
  <no-result v-show="noresult" :text=""></no-result>
  <loading :show="loading.show" :show-text=""></loading>
</template>
<script>
import FashionHair from '../components/FashionHair'
import toast from '../js/toast'
import NoResult from '../components/NoResult'
import Loading from '../components/Loading'

export default {
  data () {
    return {
      loading: {
        show: true
      },
      hairItems: [],
      token: localStorage.token,
      noresult: false,
      pageSize: 20,
      currentPage: 1,
      hasMoreData: true
    }
  },
  created: function () {
    this.getCollectData(1)
  },
  ready: function () {
    let self = this
    window.onscroll = function () {
      let container = document.querySelector('body')
      if (self.hasMoreData && (window.screen.height + window.scrollY) >= container.offsetHeight) {
        self.getCollectData(self.currentPage + 1)
      }
    }
  },
  methods: {
    getCollectData: function (pageNo) {
      let self = this
      if (!self.token) {
        toast('请先登录')
        setTimeout(function () {
          window.location.href = 'login.html?fromUrl=' + encodeURIComponent(window.location.href)
        }, 1000)
      }else {
        self.loading.show = true
        self.currentPage = pageNo
        self.$http.get(window.ctx + '/api/collect/t/list', {pageNo: pageNo, pageSize: self.pageSize}, {headers: {token: self.token}}).then((response) => {
          let res = response.data
          self.loading.show = false
          if (res.code === 0) {
            if (pageNo === 1) {
              document.querySelector('body').scrollTop = 0
              self.$set('hairItems', res.result.result)
              if (!res.result.result || res.result.result.length === 0) {
                self.noresult = true
              }
            }else {
              self.hairItems = self.hairItems.concat(res.result.result)
            }
            if (!res.result.result || res.result.result.length === 0) {
              self.hasMoreData = false
            }else if (res.result.result.length < self.pageSize) {
              self.hasMoreData = false
            }else {
              self.hasMoreData = true
            }
          }else if (res.code === 10007) {
            toast('登录已过期，请重新登录')
            setTimeout(function () {
              window.location.href = 'login.html?fromUrl=' + encodeURIComponent(window.location.href)
            }, 1000)
            if (pageNo === 1) {
              self.noresult = true
            }
          }
        })
      }
    }
  },
  components: {
    FashionHair,
    NoResult,
    Loading
  }
}
</script>
<style>
.collection .hair-item {
  padding: 5px;
}
.collection .hair-name {
  position: absolute;
  right: 5px;
  bottom: 5px;
  left: 5px;
}
</style>
