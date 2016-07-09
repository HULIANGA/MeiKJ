<style lang="sass">
@import "../assets/css/style.scss"
</style>
<template>
<div class="all-dressers">
  <head-filter :searchitems="searchItems"></head-filter>
  <hair-dresser :items="items"></hair-dresser>
</div>
</template>
<script>
import HairDresser from '../components/HairDresser'
import HeadFilter from '../components/HeadFilter'

export default {
  data () {
    return {
      searchItems: null,
      items: null
    }
  },
  ready () {
    let self = this
    // 获取发型师列表
    self.$http.get('/api/barber/list').then((response) => {
      let res = response.data
      if (res.code === 0) {
        self.$set('items', res.result.result)
      }
    }, (response) => {
      console.log(response.data)
    })
    // 头部filter数据
    self.$http.get('/static/filter.json').then((response) => {
      self.searchItems = response.data
    }, (response) => {

    })
  },
  components: {
    HairDresser,
    HeadFilter
  }
}
</script>
