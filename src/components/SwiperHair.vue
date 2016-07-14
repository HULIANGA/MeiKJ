<style>
  @import '../assets/css/swiper.scss';
</style>
<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div v-if="items" class="swiper-slide" v-for="item in items">
        <img :src="'http://meimeidou.qiniudn.com/'+item.path">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      items: Array
    },
    data () {
      return {
      }
    },
    events: {
      'init-swiper': function () {
        console.log(2323232)
      }
    }
  }
</script>
