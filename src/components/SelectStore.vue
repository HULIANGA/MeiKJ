<template>
  <div class="store-list-container">
    <head-filter :searchitems="searchItems"></head-filter>
    <div class="store-list-wrapper">
      <div class="store-list">
        <store-one @click="selectStore(item)" :class="selectId === item.id ? 'active' : ''" v-for="item in storeItems" :item="item"></store-one>
        <no-result v-show="noresult" :text=""></no-result>
      </div>
    </div>
    <button class="btn btn-reserve" @click="next()">已选好</button>
    <loading :show="loading.show"></loading>
  </div>
</template>
<script>
import StoreOne from '../components/StoreOne'
import HeadFilter from '../components/HeadFilter'
import NoResult from '../components/NoResult'
import Loading from '../components/Loading'
import utils from '../js/utils'
import toast from '../js/toast'

export default {
  data () {
    return {
      loading: {
        show: false
      },
      selectId: null,
      selectName: null,
      storeItems: null,
      searchItems: {
        filters: []
      },
      noresult: false,
      baseRequsetData: {
        pageNo: 1,
        pageSize: 20,
        customerId: localStorage.loginid,
        longitude: localStorage.longitude,
        latitude: localStorage.latitude,
        productIds: '',
        customerCouponId: '',
        barberId: ''
      },
      hasMoreData: true
    }
  },
  created: function () {
    if (utils.getUrlParam('customerCouponId')) {
      this.baseRequsetData.customerCouponId = utils.getUrlParam('customerCouponId')
    }
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
  },
  ready: function () {
    let self = this
    document.querySelector('.store-list-wrapper').onscroll = function () {
      if (self.hasMoreData && (document.querySelector('.store-list-wrapper').scrollTop + document.querySelector('.store-list-wrapper').offsetHeight - 50) >= document.querySelector('.store-list').offsetHeight) {
        self.setMoreData()
      }
    }
  },
  events: {
    'get-store-data': function (data) {
      this.loading.show = true
      this.baseRequsetData.productIds = data
      // 根据条件获取门店列表
      // 百度地图api放在最后加载，判断api加载完成后获取城市
      let getCityInterval = setInterval(() => {
        if (typeof (window.BMap) !== 'undefined') {
          this.getLocation()
          clearInterval(getCityInterval)
        }
      }, 500)
    },
    'go-search': function (searchData) {
      console.log(searchData)
      this.getFirstStore(searchData)
    }
  },
  methods: {
    next: function () {
      if (this.selectId) {
        this.$dispatch('next', {'fromStep': 'store', 'shopId': this.selectId, 'shopName': this.selectName})
      }else {
        toast('请选择门店')
      }
    },
    selectStore: function (selectItem) {
      if (this.selectId === selectItem.id) {
        this.selectId = null
        this.selectName = null
      }else {
        this.selectId = selectItem.id
        this.selectName = selectItem.name
      }
    },
    getFirstStore: function (requestData) {
      let self = this
      let extendRequestData = utils.extendObj(this.baseRequsetData, requestData)
      if (!extendRequestData.cityCode) {
        extendRequestData.cityCode = localStorage.cityCode
      }
      if (utils.getUrlParam('couponId')) { // 从我的优惠券进入预约
        extendRequestData.couponId = utils.getUrlParam('couponId')
      }
      if (utils.getUrlParam('personId')) {
        extendRequestData.barberId = utils.getUrlParam('personId')
      }
      extendRequestData.pageNo = 1
      self.baseRequsetData = extendRequestData
      console.log('getFirstStore')
      console.log(self.baseRequsetData)
      self.loading.show = true
      // 获取门店列表
      document.querySelector('.store-list-wrapper').style.overflowY = 'hidden'
      self.$http.get(window.ctx + '/api/order/selectShop', extendRequestData).then(function (response) {
        document.querySelector('.store-list-wrapper').style.overflowY = 'auto'
        self.loading.show = false
        let res = response.data
        if (res.code === 0) {
          document.querySelector('.store-list-wrapper').scrollTop = 0
          self.storeItems = res.result.result
          if (!res.result.result || res.result.result.length === 0) {
            self.noresult = true
            self.hasMoreData = false
          }else if (res.result.result.length < self.baseRequsetData.pageSize) {
            self.noresult = false
            self.hasMoreData = false
          }else {
            self.noresult = false
            self.hasMoreData = true
          }
        }else {
          self.noresult = true
          toast('获取门店失败')
        }
      }, function (response) {
        self.loading.show = false
        document.querySelector('.store-list-wrapper').style.overflowY = 'auto'
        self.noresult = true
        toast('获取门店失败')
      })
    },
    setMoreData: function () {
      let self = this
      self.baseRequsetData.pageNo = self.baseRequsetData.pageNo + 1
      this.loading.show = true
      document.querySelector('html').style.overflowY = 'hidden'
      console.log('getmoredata：')
      console.log(self.baseRequsetData)
      self.$http.get(window.ctx + '/api/order/selectShop', self.baseRequsetData).then((response) => {
        self.loading.show = false
        document.querySelector('html').style.overflowY = 'auto'
        let res = response.data
        if (res.code === 0) {
          self.storeItems = self.storeItems.concat(res.result.result)
          if (!res.result.result || res.result.result.length === 0) {
            toast('没有更多数据了')
            self.hasMoreData = false
          }else if (res.result.result.length < self.baseRequsetData.pageSize) {
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
      if (!(localStorage.longitude && localStorage.latitude)) {
        geolocation.getCurrentPosition(function (r) {// 支持h5定位
          console.log(r)
          // if (r.accuracy) {// 获取到了精确位置
          if (this.getStatus() === window.BMAP_STATUS_SUCCESS) {
            localStorage.latitude = r.point.lat
            localStorage.longitude = r.point.lng
          }
          // self.getFirstStore()
          // }
        }, function () {// 不支持h5定位
          // self.getFirstStore()
        }, {enableHighAccuracy: true})
      }
      self.getFirstStore()
    },
    getAreaList: function (cityCode) {
      this.$http.get(window.ctx + '/api/area/list').then(function (response) {
        let res = response.data
        if (res.code === 0) {
          let cityJson = res.result
          let provinceCitys = []
          for (let i = 0; i < cityJson.length; i++) {
            if (typeof (cityJson[i].parent_id) !== 'undefined' && cityJson[i].parent_id.toString() === cityCode) {
              let provinceCity = {
                'id': cityJson[i].area_id,
                'name': cityJson[i].area_name
              }
              provinceCitys.push(provinceCity)
            }
          }
          let tempFilter = {
            // 'name': localStorage.cityName,
            'name': '区域',
            'param': 'cityCode',
            'values': provinceCitys
          }
          this.searchItems.filters.$set(1, tempFilter)
        }
      }, function (response) {

      })
    }
  },
  components: {
    StoreOne,
    Loading,
    HeadFilter,
    NoResult
  }
}
</script>
<style scoped>
.store-list-container {
  height: 100%;
  position: relative;
}
.store-list-wrapper {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling:touch;
  position: absolute;
  top: 0;
  padding-top: 39px;
  padding-bottom: 50px;
  box-sizing: border-box;
}
</style>
