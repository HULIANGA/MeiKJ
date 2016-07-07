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
      dataUrl: String
    },
    data () {
      return {
        items: [],
        hairId: ''
      }
    },
    ready () {
      let self = this
      let _hairId = window.location.search.substr(1).split('=')[1]
      self.hairId = _hairId
      self.$http.post(self.dataUrl, {hairstyleId: self.hairId}).then((response) => {
        let res = response.data
        if (res.code === 0) {
          self.$set('items', res.result.photoList)
          self.$nextTick(() => {
            /* eslint-disable no-new */
            new Swiper('.swiper-container')
          })
        }
      })
    }
  }
</script>
