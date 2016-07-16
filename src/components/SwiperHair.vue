<style>
  @import '../assets/css/swiper.scss';
</style>
<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div v-if="items" class="swiper-slide" v-for="item in items">
        <img :src="imageDomain + item.path">
      </div>
    </div>
    <div class="swiper-pagination swiper-pagination-white"></div>
  </div>
</template>

<script>
  import Swiper from 'swiper'

  export default {
    props: {
      items: Array
    },
    data () {
      return {
        imageDomain: window.imageDomain
      }
    },
    events: {
      'init-swiper': function () {
        this.$nextTick(function () {
          /* eslint-disable no-new */
          new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            speed: 1000,
            autoplay: 2500,
            loop: true,
            autoplayDisableOnInteraction: false
          })
        })
      }
    }
  }
</script>
