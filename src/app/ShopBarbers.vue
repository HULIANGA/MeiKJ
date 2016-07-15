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

  export default {
    data () {
      return {
        loading: {
          show: true
        },
        noresult: false,
        items: [],
        shopId: ''
      }
    },
    created () {
      let self = this
      let _shopId = utils.getUrlParam('id')
      self.shopId = _shopId
      self.$http.get(ctx + '/api/shop/barberList', {shopId: self.shopId, pageNo: 1}).then((response) => {
        self.loading.show = false
        let res = response.data
        if (res.code === 0) {
          self.$set('items', res.result.result)
          if (!res.result.result || res.result.result.length === 0) {
            self.noresult = true
          }
        }else {
          self.noresult = true
        }
      }, (response) => {
        self.loading.show = false
      })
    },
    components: {
      HairDresser,
      Loading,
      NoResult
    }
  }
</script>
