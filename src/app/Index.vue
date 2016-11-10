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
import provinceCity from '../libs/province_city.js'
import toast from '../js/toast.js'

export default {
  data () {
    return {
      loading: {
        show: true
      },
      dataHref: window.window.ctx + '/api/banner/list',
      hairItems: null,
      localCity: '定位中',
      searchPageParam: {
        pageNo: 1,
        pageSize: 20
      },
      hasMoreData: true
    }
  },
  created: function () {
    if (window.systemType === 'MKJ') {
      document.title = '美空间'
    } else if (window.systemType === 'DY') {
      document.title = '东瀛造型'
    }
    let self = this
    // 百度地图api放在最后加载，判断api加载完成后获取城市
    let getCityInterval = setInterval(() => {
      if (typeof (window.BMap) !== 'undefined') {
        this.loading.show = false
        this.getCity()
        this.getLocation()
        clearInterval(getCityInterval)
      }
    }, 500)
    // 获取发型列表
    document.querySelector('html').style.overflowY = 'hidden'
    //
    self.$http.get(window.ctx + '/api/hairstyle/popularList', self.searchPageParam).then((response) => {
      document.querySelector('html').style.overflowY = 'auto'
      let res = response.data
      if (res.code === 0) {
        self.$set('hairItems', res.result.result)
        const scrollTop = Number(sessionStorage.getItem('hairScrollTop'))
        if (scrollTop) {
          self.$nextTick(() => {
            window.scrollTo(0, scrollTop)
          })
        }
        if (Number(sessionStorage.getItem('hairPageNum')) === self.searchPageParam.pageNo) {
          sessionStorage.removeItem('hairScrollTop')
        }
        if (!res.result.result || res.result.result.length === 0) {
          self.hasMoreData = false
        }else if (res.result.result.length < self.searchPageParam.pageSize) {
          self.hasMoreData = false
        }else {
          self.hasMoreData = true
        }
      }
    }, (response) => {
      document.querySelector('html').style.overflowY = 'auto'
      self.loading.show = false
    })
  },
  ready: function () {
    let self = this
    window.onscroll = function () {
      let container = document.querySelector('body')
      // let laschild = document.querySelectorAll('.store-item')[document.querySelectorAll('.store-item').length - 1]
      if (self.hasMoreData && (window.screen.height + window.scrollY) >= container.offsetHeight
    ) {
        self.setMoreData()
      }
    }
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
    setMoreData: function () {
      let self = this
      self.searchPageParam.pageNo = self.searchPageParam.pageNo + 1
      self.loading.show = true
      document.querySelector('html').style.overflowY = 'hidden'
      self.$http.get(window.ctx + '/api/hairstyle/popularList', self.searchPageParam).then((response) => {
        self.loading.show = false
        document.querySelector('html').style.overflowY = 'auto'
        let res = response.data
        if (res.code === 0) {
          self.hairItems = self.hairItems.concat(res.result.result)
          const scrollTop = Number(sessionStorage.getItem('hairScrollTop'))
          if (scrollTop) {
            self.$nextTick(() => {
              window.scrollTo(0, scrollTop)
            })
          }
          if (Number(sessionStorage.getItem('hairPageNum')) === self.searchPageParam.pageNo) {
            sessionStorage.removeItem('hairScrollTop')
          }
          if (!res.result.result || res.result.result.length === 0) {
            toast('没有更多数据了')
            self.hasMoreData = false
          }else if (res.result.result.length < self.searchPageParam.pageSize) {
            self.hasMoreData = false
          }
        }else {
          toast('加载失败')
        }
      }, (response) => {
        self.loading.show = false
        document.querySelector('html').style.overflowY = 'auto'
        toast('加载失败')
      })
    },
    getCity: function () {
      let BaiduMap = window.BMap
      let self = this
      self.$http.get(window.ctx + '/api/area/list').then(function (response) {
        if (response.data.code === 0) {
          let cityJson = response.data.result
          new BaiduMap.LocalCity().get((result) => {
            let cityName = result.name
            let cityCode = 310000
            for (let i = 0; i < provinceCity.data.length; i++) { // 根据定位的城市名匹配citycode
              for (let j = 0; j < provinceCity.data[i].cities.length; j++) {
                if (provinceCity.data[i].cities[j].city === cityName) {
                  cityCode = parseInt(provinceCity.data[i].cities[j].city_code, 10)
                  for (let i = 0; i < cityJson.length; i++) { // 根据citycode匹配城市简称
                    if (parseInt(cityJson[i].area_id, 10) === cityCode) {
                      this.localCity = cityJson[i].area_name
                      localStorage.cityName = cityJson[i].area_name
                      localStorage.cityCode = cityCode
                      return false
                    }
                  }
                }
              }
            }
          })
        }
      })
    },
    getLocation: function () {
    // 定位当前位置start
    // 关于状态码
    // BMAP_STATUS_SUCCESS	检索成功。对应数值“0”。
    // BMAP_STATUS_CITY_LIST	城市列表。对应数值“1”。
    // BMAP_STATUS_UNKNOWN_LOCATION	位置结果未知。对应数值“2”。
    // BMAP_STATUS_UNKNOWN_ROUTE	导航结果未知。对应数值“3”。
    // BMAP_STATUS_INVALID_KEY	非法密钥。对应数值“4”。
    // BMAP_STATUS_INVALID_REQUEST	非法请求。对应数值“5”。
    // BMAP_STATUS_PERMISSION_DENIED	没有权限。对应数值“6”。(自 1.1 新增)
    // BMAP_STATUS_SERVICE_UNAVAILABLE	服务不可用。对应数值“7”。(自 1.1 新增)
    // BMAP_STATUS_TIMEOUT	超时。对应数值“8”。(自 1.1 新增)
      var geolocation = new window.BMap.Geolocation()
      geolocation.getCurrentPosition(function (r) {// 支持h5定位
        console.log(r)
        // if (r.accuracy) {// 获取到了精确位置
        if (this.getStatus() === window.BMAP_STATUS_SUCCESS) {
          localStorage.latitude = r.point.lat
          localStorage.longitude = r.point.lng
        }
        // }
      }, function () {// 不支持h5定位
      }, {enableHighAccuracy: true})
    }
  },
  events: {
    'select-city': function (area) {
      this.localCity = area.name
    }
  }
}
</script>
<style>
  #app {
    padding-bottom: 60px;
  }
</style>
