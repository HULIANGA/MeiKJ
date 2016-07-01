<style lang="sass">
  @import '../assets/css/style.scss'
</style>
<template>
  <div id="app">
    <header-menu></header-menu>
    <swiper-image :items="items"></swiper-image>

    <fashion-hair :hairitems="hairItems"></fashion-hair>
    <bottom-menu></bottom-menu>
  </div>
</template>

<script>
import HeaderMenu from '../components/HeaderMenu'
import SwiperImage from '../components/SwiperImage'
import FashionHair from '../components/FashionHair'
import BottomMenu from '../components/BottomMenu'
export default {
  data () {
    return {
      items: window.ImageData,
      hairItems: window.hairItems
    }
  },
  components: {
    HeaderMenu,
    SwiperImage,
    FashionHair,
    BottomMenu
  }
}
</script>
<style>
  #app {
    padding-bottom: 60px;
  }
</style>
