<style lang="sass">
@import '../assets/css/style.scss'
</style>
<template>
  <div class="hair-detail">
    <swiper-hair :items="imgItems"></swiper-hair>
  </div>
</template>
<script>
import SwiperHair from '../components/SwiperHair'
export default {
  data () {
    return {
      imgItems: [],
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
    self.$http.post('/api/hairstyle/t/detail', {hairstyleId: self.hairId}, {headers: {token: self.token}}).then((response) => {
      let res = response.data
      if (res.code === 0) {
        self.$set('imgItems', res.result)
      }
    })
  },
  components: {
    SwiperHair
  }
}
</script>
