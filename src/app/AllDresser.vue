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
  components: {
    HairDresser
  }
}
</script>
