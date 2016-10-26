<style lang="sass">
  @import '../assets/css/style.scss'
</style>
<style>
  body {
    background: #eaeaea;
  }
</style>
<template>
  <div class="shop-barbers">
    <hair-dresser :items="items"></hair-dresser>
    <no-result v-show="noresult" :text=""></no-result>
    <loading :show="loading.show" :show-text=""></loading>
  </div>
</template>
<script>
  import HairDresser from '../components/HairDresser'
  import Loading from '../components/Loading'
  import NoResult from '../components/NoResult'
  import utils from '../js/utils'
  import toast from '../js/toast.js'

  export default {
    data () {
      return {
        loading: {
          show: true
        },
        noresult: false,
        items: [],
        baseRequsetData: {
          shopId: utils.getUrlParam('id'),
          pageNo: 1,
          pageSize: 10
        },
        hasMoreData: false,
        shopId: ''
      }
    },
    created () {
      this.setFirstData()
    },
    ready: function () {
      let self = this
      window.onscroll = function () {
        let container = document.querySelector('.shop-barbers')
        if (self.hasMoreData && (window.screen.height + window.scrollY) >= container.offsetHeight) {
          self.setMoreData()
        }
      }
    },
    methods: {
      setFirstData: function (requestData) {
        let self = this
        // 获取发型师列表
        self.$http.get(window.ctx + '/api/shop/barberList', self.baseRequsetData).then((response) => {
          document.querySelector('html').style.overflowY = 'auto'
          self.loading.show = false
          let res = response.data
          if (res.code === 0) {
            document.querySelector('body').scrollTop = 0
            self.$set('items', res.result.result)
            if (!res.result.result || res.result.result.length === 0) {
              self.noresult = true
            }else if (res.result.result.length < self.baseRequsetData.pageSize) {
              self.noresult = false
              self.hasMoreData = false
            }else {
              self.noresult = false
              self.hasMoreData = true
            }
          }else {
            self.noresult = true
          }
        }, (response) => {
          self.noresult = true
          document.querySelector('html').style.overflowY = 'auto'
          self.loading.show = false
        })
      },
      setMoreData: function () {
        let self = this
        self.baseRequsetData.pageNo = self.baseRequsetData.pageNo + 1
        self.loading.show = true
        document.querySelector('html').style.overflowY = 'hidden'
        self.$http.get(window.ctx + '/api/shop/barberList', self.baseRequsetData).then((response) => {
          self.loading.show = false
          document.querySelector('html').style.overflowY = 'auto'
          let res = response.data
          if (res.code === 0) {
            self.items = self.items.concat(res.result.result)
            if (!res.result.result || res.result.result.length === 0) {
              toast('没有更多数据了')
              self.hasMoreData = false
            }else if (res.result.result.length < self.baseRequsetData.pageSize) {
              self.hasMoreData = false
            }
          }else {
            toast('加载失败')
          }
        }, (response) => {
          self.loading.show = false
          document.querySelector('html').style.overflowY = 'auto'
          toast('加载失败')
        })
      }
    },
    components: {
      HairDresser,
      Loading,
      NoResult
    }
  }
</script>
