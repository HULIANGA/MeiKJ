<style>
  @import '../assets/css/swiper.scss';
    .swiper_box .swiper-pagination-white .swiper-pagination-bullet {
    background-color:#000;
  }
  .swiper_box .swiper-pagination-white .swiper-pagination-bullet-active {
    background-color:#008757;
  }
</style>
<style scoped>
  .swiper_box {
    width: 100%;
    margin: 0;
    z-index: 2;
    top: 0;
  }
</style>

<template>
  <div class="swiper-container swiper_box">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in items">
        <a :href="item.url"><img :src="'http://meimeidou.qiniudn.com/'+item.imgUrl"></a>
      </div>
    </div>
    <div class="swiper-pagination swiper-pagination-white"></div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  export default {
    ready: function () {
      let self = this
      self.$nextTick(() => {
        /* eslint-disable no-new */
        new Swiper(self.$el, {
          pagination: '.swiper-pagination',
          speed: 1000,
          autoplay: 2500,
          loop: true,
          autoplayDisableOnInteraction: false
        })
      })
    },
    props: {
      items: Array
    }
  }
</script>
