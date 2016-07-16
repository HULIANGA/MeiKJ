<style lang="sass">
  @import "../assets/css/style.scss"
</style>
<style media="screen">
  body {
    background: #eaeaea;
  }
</style>
<template>
  <div class="all-dressers">
    <head-filter :searchitems="searchItems"></head-filter>
    <hair-dresser :items="items"></hair-dresser>
    <no-result v-show="noresult" :text=""></no-result>
    <loading :show="loading.show" :show-text=""></loading>
  </div>
</template>
<script>
import HairDresser from '../components/HairDresser'
import HeadFilter from '../components/HeadFilter'
import Loading from '../components/Loading'
import NoResult from '../components/NoResult'

export default {
  data () {
    return {
      loading: {
        show: true
      },
      searchItems: null,
      items: null,
      noresult: false
    }
  },
  created () {
    let self = this
    // 获取发型师列表
    self.$http.get(window.ctx + '/api/barber/list').then((response) => {
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
      self.noresult = true
      self.loading.show = false
    })
    // 头部filter数据
    self.$http.get(window.ctx + '/static/filter.json').then((response) => {
      self.searchItems = response.data
    }, (response) => {

    })
  },
  components: {
    HairDresser,
    HeadFilter,
    Loading,
    NoResult
  }
}
</script>
