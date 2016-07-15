<style lang="sass">
  @import '../assets/css/style.scss'
</style>
<template>
  <div class="store-list">
    <store-list :items="items"></store-list>
    <no-result v-show="noresult" :text=""></no-result>
    <loading :show="loading.show" :show-text=""></loading>
  </div>
  </template>
<script>
  import StoreList from '../components/StoreList'
  import Loading from '../components/Loading'
  import NoResult from '../components/NoResult'

  export default {
    data () {
      return {
        loading: {
          show: true
        },
        items: null,
        noresult: false
      }
    },
    created () {
      let self = this
      self.$http.get(ctx + '/api/shop/list').then((response) => {
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
        self.noresult = true
      })
    },
    components: {
      StoreList,
      Loading,
      NoResult
    }
  }
</script>
<style>
  body {
    background: #eaeaea;
  }
</style>
