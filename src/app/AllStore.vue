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
  components: {
    Store
  }
}
</script>
