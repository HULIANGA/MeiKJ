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
        <img :src="item.pictureFull_url">
      </div>
    </div>
    <div class="swiper-pagination swiper-pagination-white"></div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import Swiper from 'swiper'
  export default {
    ready: function () {
      $('.swiper_box').each(function (index) {
        var $this = $(this)
        var swiperClass = 'swiper_box' + index
        var paginationClass = 'swiper-pagination' + index
        $this.addClass(swiperClass)
        $('.swiper-pagination').eq(index).addClass(paginationClass)
        /* eslint-disable no-new */
        new Swiper('.' + swiperClass, {
          pagination: '.' + paginationClass,
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
