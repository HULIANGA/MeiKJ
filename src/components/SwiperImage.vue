<style>
  @import '../assets/css/swiper.scss';
  .swiper-box .swiper-pagination-white .swiper-pagination-bullet {
    background-color:#000;
  }
  .swiper-box .swiper-pagination-white .swiper-pagination-bullet-active {
    background-color:#008757;
  }
</style>
<style scoped>
  .swiper-box {
    width: 100%;
    margin: 0;
    z-index: 2;
    top: 0;
  }
</style>

<template>
  <div class="swiper-container swiper-box">
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
    data () {
      return {
        items: null
      }
    },
    ready: function () {
<<<<<<< HEAD
      this.$http.get(this.datahref).then(function (response) {
        this.items = response.data
        this.$nextTick(function () {
          /* eslint-disable no-new */
          new Swiper('.swiper-box', {
            pagination: '.swiper-pagination',
            speed: 1000,
            autoplay: 2500,
            loop: true,
            autoplayDisableOnInteraction: false
=======
      let self = this
      self.$http.get(this.datahref).then(function (response) {
        let res = response.data
        if (res.code === 0) {
          self.items = res.result
          self.$nextTick(function () {
            /* eslint-disable no-new */
            new Swiper('.swiper-box', {
              pagination: '.swiper-pagination',
              speed: 1000,
              autoplay: 2500,
              loop: true,
              autoplayDisableOnInteraction: false,
              observer: true
            })
>>>>>>> 81b8bd60356751eab20668dd3d8ca9b316bf0f42
          })
        }
      }).catch(function (response) {
        console.log(response.data)
      })
    },
    props: {
      datahref: String
    }
  }
</script>
