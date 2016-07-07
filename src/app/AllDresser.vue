<style lang="sass">
@import "../assets/css/style.scss";
@import "../assets/css/flex.scss"
</style>
<template>
<div class="all-dressers">
  <head-filter></head-filter>
  <hair-dresser :items="items"></hair-dresser>
</div>
</template>
<script>
import HairDresser from '../components/HairDresser'
import HeadFilter from '../components/HeadFilter'

export default {
  data () {
    return {
      items: null
    }
  },
  ready () {
    let self = this
    self.$http.get('/api/barber/list').then((response) => {
      let res = response.data
      if (res.code === 0) {
        self.$set('items', res.result.result)
      }
    }, (response) => {
      console.log(response.data)
    })
  },
  components: {
    HairDresser,
    HeadFilter
  }
}
</script>
