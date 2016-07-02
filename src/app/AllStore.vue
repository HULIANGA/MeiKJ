<style lang="sass">
@import '../assets/css/style.scss'
</style>
<template>
<div class="store-list">
  <store :items="items"></store>
</div>
</template>
<script>
import Store from '../components/Store'

export default {
  data () {
    return {
      items: window.storeList
    }
  },
  ready () {
    let self = this
    self.$http.get('/api/shop/list').then((response) => {
      let res = response.data
      if (res.code === 0) {
        self.$set('items', res.result.result)
      }
    }, (response) => {
      console.log(response.data)
    })
  },
  components: {
    Store
  }
}
</script>
