<style lang="sass">
  @import '../assets/css/swiper.scss'
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
        <a :href="item.url"><img :src="imageDomain + item.imgUrl"></a>
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
        items: null,
        imageDomain: window.imageDomain
      }
    },
    ready: function () {
      this.$http.get(this.datahref).then(function (response) {
        var res = response.data
        if (res.code === 0) {
          this.items = res.result
          this.$nextTick(function () {
            /* eslint-disable no-new */
            new Swiper('.swiper-box', {
              pagination: '.swiper-pagination',
              speed: 1000,
              autoplay: 2500,
              loop: true,
              autoplayDisableOnInteraction: false
            })
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
