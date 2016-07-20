<style lang="sass">
  @import "../assets/css/style.scss"
</style>
<style media="screen">
  body {
    background: #eaeaea;
  }
</style>
<template>
  <div class="all-dressers">
    <head-filter :searchitems="searchItems" :locacitycode='baseRequsetData.cityCode'></head-filter>
    <hair-dresser :items="items"></hair-dresser>
    <no-result v-show="noresult" :text=""></no-result>
    <loading :show="loading.show" :show-text="loading.showText"></loading>
  </div>
</template>
<script>
import HairDresser from '../components/HairDresser'
import HeadFilter from '../components/HeadFilter'
import Loading from '../components/Loading'
import NoResult from '../components/NoResult'
import provinceCity from '../libs/province_city.js'
import utils from '../js/utils.js'

export default {
  data () {
    return {
      loading: {
        show: true
      },
      searchItems: {
        filters: [
          {
            'name': '门店',
            'param': 'shopId',
            'values': [
              {
                'name': '张江店',
                'id': 1
              }, {
                'name': '张江店',
                'id': 2
              }, {
                'name': '张江店',
                'id': 3
              }, {
                'name': '张江店',
                'id': 4
              }
            ]
          }, {
            'name': '职位',
            'param': 'positioned',
            'values': [
              {
                'name': '总监',
                'id': 1
              }, {
                'name': '经理',
                'id': 2
              }, {
                'name': '师傅',
                'id': 3
              }, {
                'name': '学徒',
                'id': 4
              }
            ]
          }
        ],
        // 'areas': true,
        'search': true
      },
      items: null,
      noresult: false,
      baseRequsetData: {
        pageNo: 1,
        pageSize: 20,
        cityCode: null
      }
    }
  },
  events: {
    'go-search': function (searchData) {
      console.log(searchData)
      this.getData(searchData)
    }
  },
  created () {
    // 百度地图api放在最后加载，判断api加载完成后获取城市
    var getCityInterval = setInterval(() => {
      if (typeof (window.BMap) !== 'undefined') {
        this.getLocation()
        clearInterval(getCityInterval)
      }
    }, 500)
  },
  methods: {
    getLocation: function () {
      var self = this
      var BaiduMap = window.BMap
      new BaiduMap.LocalCity().get((result) => {
        var cityName = result.name
        for (var i = 0; i < provinceCity.data.length; i++) {
          for (var j = 0; j < provinceCity.data[i].cities.length; j++) {
            if (provinceCity.data[i].cities[j].city === cityName) {
              self.baseRequsetData.cityCode = parseInt(provinceCity.data[i].cities[j].city_code, 10)
              self.getData()
              return false
            }
          }
        }
      })
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
      // var geolocation = new window.BMap.Geolocation()
      // geolocation.getCurrentPosition(function (r) {// 支持h5定位
      //   alert(r.address.city_code)
      //   if (r.accuracy) {// 获取到了精确位置
      //     if (this.getStatus() === window.BMAP_STATUS_SUCCESS) {
      //       window.userLatitude = r.point.lat
      //       window.userLongitude = r.point.lng
      //     }
      //   }
      // }, function () {// 不支持h5定位
      //
      // }, {enableHighAccuracy: true})
    },
    getData: function (requestData) {
      let self = this
      if (requestData && requestData.cityCode) {
        self.baseRequsetData.cityCode = requestData.cityCode
      }
      let extendRequestData = utils.extendObj(self.baseRequsetData, requestData)
      console.log(extendRequestData)
      // 获取发型师列表
      this.loading.show = true
      self.$http.get(window.ctx + '/api/barber/list', extendRequestData).then((response) => {
        self.loading.show = false
        let res = response.data
        if (res.code === 0) {
          self.$set('items', res.result.result)
          if (!res.result.result || res.result.result.length === 0) {
            self.noresult = true
          }else {
            self.noresult = false
          }
        }else {
          self.noresult = true
        }
      }, (response) => {
        self.noresult = true
        self.loading.show = false
      })
    },
    getStoreList: function (citycode) {// 获取门店列表

    },
    getPositionList: function () {// 获取职位列表

    }
  },
  components: {
    HairDresser,
    HeadFilter,
    Loading,
    NoResult
  }
}
</script>
