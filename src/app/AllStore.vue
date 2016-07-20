<style lang="sass">
  @import '../assets/css/style.scss'
</style>
<template>
  <div class="store-list">
    <head-filter :searchitems="searchItems"></head-filter>
    <store-list :items="items"></store-list>
    <no-result v-show="noresult" :text=""></no-result>
    <loading :show="loading.show" :show-text=""></loading>
  </div>
  </template>
<script>
  import StoreList from '../components/StoreList'
  import HeadFilter from '../components/HeadFilter'
  import Loading from '../components/Loading'
  import NoResult from '../components/NoResult'
  import utils from '../js/utils.js'
  import provinceCity from '../libs/province_city.js'

  export default {
    data () {
      return {
        loading: {
          show: true
        },
        searchItems: {
          filters: [],
          'search': true
        },
        items: null,
        noresult: false,
        baseRequsetData: {
          pageNo: 1,
          pageSize: 20,
          longitude: null,
          latitude: null
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
      // 附近选项
      let tempFilter = {
        'name': '附近',
        'param': 'range',
        'values': [
          {
            'name': '500米',
            'id': 500
          },
          {
            'name': '1000米',
            'id': 1000
          },
          {
            'name': '2000米',
            'id': 2000
          },
          {
            'name': '5000米',
            'id': 5000
          }
        ]
      }
      this.searchItems.filters.$set(0, tempFilter)
      // 获取地区列表
      this.getAreaList(localStorage.cityCode)
      // 根据条件获取门店列表
      // 百度地图api放在最后加载，判断api加载完成后获取城市
      let getCityInterval = setInterval(() => {
        if (typeof (window.BMap) !== 'undefined') {
          this.getLocation()
          clearInterval(getCityInterval)
        }
      }, 500)
    },
    methods: {
      getLocation: function () {
        let self = this
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
            self.baseRequsetData.latitude = r.point.lat
            self.baseRequsetData.longitude = r.point.lng
          }
          self.getData()
          // }
        }, function () {// 不支持h5定位
          self.getData()
        }, {enableHighAccuracy: true})
      },
      getData: function (requestData) {
        let self = this
        let extendRequestData = utils.extendObj(self.baseRequsetData, requestData)
        if (!extendRequestData.cityCode) {
          extendRequestData.cityCode = localStorage.cityCode
        }
        console.log(extendRequestData)
        // 获取门店列表
        this.loading.show = true
        self.$http.get(window.ctx + '/api/shop/list', extendRequestData).then((response) => {
          self.loading.show = false
          let res = response.data
          if (res.code === 0) {
            self.$set('items', res.result.result)
            if (!res.result.result || res.result.result.length === 0) {
              self.noresult = true
            }
          }else {
            self.noresult = true
          }
        }, (response) => {
          self.loading.show = false
          self.noresult = true
        })
      },
      getAreaList: function (cityCode) {
        for (let i = 0; i < provinceCity.data.length; i++) { // 根据定位的城市名匹配citycode
          for (let j = 0; j < provinceCity.data[i].cities.length; j++) {
            if (parseInt(provinceCity.data[i].cities[j].city_code, 10) === parseInt(cityCode, 10)) {
              let tempFilter = {
                'name': localStorage.cityName,
                'param': 'cityCode',
                'values': provinceCity.data[i].cities[j].areas
              }
              console.log(tempFilter)
              this.searchItems.filters.$set(1, tempFilter)
              return false
            }
          }
        }
      }
    },
    components: {
      StoreList,
      Loading,
      NoResult,
      HeadFilter
    }
  }
</script>
<style>
  body {
    background: #eaeaea;
  }
</style>
