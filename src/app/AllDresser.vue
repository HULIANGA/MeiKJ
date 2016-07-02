<style lang="sass">
@import '../assets/css/style.scss'
</style>
<template>
<div class="all-dressers">
  <hair-dresser :items="items"></hair-dresser>
</div>
</template>
<script>
import HairDresser from '../components/HairDresser'

export default {
  data () {
    return {
      items: window.hairDresser
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
    HairDresser
  }
}
</script>
