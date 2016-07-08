<style lang="sass">
@import '../assets/css/style.scss'
</style>
<template>
<div class="shop-barbers">
  <hair-dresser :items="items"></hair-dresser>
</div>
</template>
<script>
import HairDresser from '../components/HairDresser'
import utils from '../libs/utils'
export default {
  data () {
    return {
      items: [],
      shopId: ''
    }
  },
  ready () {
    let self = this
    let _shopId = utils.getUrlParam('id')
    self.shopId = _shopId
    self.$http.get('/api/shop/barberList', {shopId: self.shopId, pageNo: 1}).then((response) => {
      let res = response.data
      if (res.code === 0) {
        self.$set('items', res.result.result)
      }
    })
  },
  components: {
    HairDresser
  }
}
</script>
