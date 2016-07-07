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
      items: null,
      hairItems: window.hairItems
    }
  },
  ready () {
    let self = this
    self.$http.get('/api/banner/list').then((response) => {
      let res = response.data
      if (res.code === 0) {
        self.$set('items', res.result)
      }
    }, (response) => {
      console.log(response.data)
    })
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
