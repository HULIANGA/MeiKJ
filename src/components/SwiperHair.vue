<style>
  @import '../assets/css/swiper.scss';
</style>
<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in items">
        <img :src="'http://meimeidou.qiniudn.com/'+item.path">
      </div>
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  export default {
    props: {
      items: Array
    },
    ready () {
      this.$nextTick(() => {
        /* eslint-disable no-new */
        new Swiper('.swiper-container', {
          autoplay: 5000
        })
      })
    }
  }
</script>
