<style lang="sass">
  @import '../assets/css/style.scss'
</style>
<template>
  <div id="app">
    <header-menu :localcity="localCity"></header-menu>
    <swiper-image :datahref="dataHref"></swiper-image>
    <fashion-hair :hairitems="hairItems"></fashion-hair>
    <bottom-menu :active="'main'"></bottom-menu>
    <city-select :localcity="localCity"></city-select>
    <loading :show="loading.show"></loading>
  </div>
</template>

<script>
import HeaderMenu from '../components/HeaderMenu'
import SwiperImage from '../components/SwiperImage'
import FashionHair from '../components/FashionHair'
import BottomMenu from '../components/BottomMenu'
import CitySelect from '../components/CitySelect'
import Loading from '../components/Loading'

export default {
  data () {
    return {
      loading: {
        show: true
      },
      dataHref: window.window.ctx + '/api/banner/list',
      hairItems: window.hairItems,
      localCity: '定位中'
    }
  },
  created: function () {
    // 百度地图api放在最后加载，判断api加载完成后获取城市
    var getCityInterval = setInterval(() => {
      if (typeof (window.BMap) !== 'undefined') {
        this.loading.show = false
        this.getCity()
        clearInterval(getCityInterval)
      }
    }, 500)
  },
  components: {
    HeaderMenu,
    SwiperImage,
    FashionHair,
    BottomMenu,
    CitySelect,
    Loading
  },
  methods: {
    getCity: function () {
      var BaiduMap = window.BMap
      new BaiduMap.LocalCity().get((result) => {
        console.log(result)
        this.localCity = result.name.slice(0, result.name.length - 1)
      })
    }
  },
  events: {
    'select-city': function (areaName) {
      this.localCity = areaName
    }
  }
}
</script>
<style>
  #app {
    padding-bottom: 60px;
  }
</style>
