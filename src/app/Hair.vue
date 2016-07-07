<style lang="sass">
@import '../assets/css/style.scss'
</style>
<template>
  <div class="hair-detail">
    <swiper-hair :items="hairDetail.photoList"></swiper-hair>
  </div>
</template>
<script>
import SwiperHair from '../components/SwiperHair'
export default {
  data () {
    return {
      hairDetail: {},
      hairId: '',
      token: ''
    }
  },
  ready () {
    let self = this
    let _hairId = window.location.search.substr(1).split('=')[1]
    self.hairId = _hairId
    let _token = localStorage.token
    self.token = _token
    self.$http.post('/api/hairstyle/detail', {hairstyleId: self.hairId}).then((response) => {
      let res = response.data
      if (res.code === 0) {
        self.$set('hairDetail', res.result)
      }
    })
  },
  components: {
    SwiperHair
  }
}
</script>
