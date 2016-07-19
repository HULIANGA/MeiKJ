<style lang="sass">
@import '../assets/css/style.scss'
</style>
<template>
  <div class="collection">
    <fashion-hair :hairitems="hairItems"></fashion-hair>
  </div>
  <no-result v-show="noresult" :text=""></no-result>
</template>
<script>
import FashionHair from '../components/FashionHair'
import NoResult from '../components/NoResult'
export default {
  data () {
    return {
      hairItems: [],
      token: '',
      noresult: false
    }
  },
  ready () {
    let self = this
    self.token = localStorage.token
    self.$http.get(window.ctx + '/api/collect/t/list', {}, {headers: {token: self.token}}).then((response) => {
      let res = response.data
      if (res.code === 0) {
        self.$set('hairItems', res.result.result)
        if (!res.result.result || res.result.result.length === 0) {
          self.noresult = true
        }
      }
    })
  },
  components: {
    FashionHair,
    NoResult
  }
}
</script>
<style>
body {
  background:#eaeaea;
}
.collection .hair-item {
  padding: 5px;
}
.collection .hair-like {
  position: absolute;
  right: 5px;
  bottom: 5px;
  background-color: rgba(0,0,0,.4);
  color: #fff;
  background-image: url(../assets/img/good-white.png);
}
</style>
