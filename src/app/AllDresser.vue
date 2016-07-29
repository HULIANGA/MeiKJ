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
    <head-filter :searchitems="searchItems"></head-filter>
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
import toast from '../js/toast.js'

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
        pageSize: 20
      },
      hasMoreData: true
    }
  },
  events: {
    'go-search': function (searchData) {
      console.log(searchData)
      this.setFirstData(searchData)
    }
  },
  created () {
    // 门店列表
    this.getStoreList(localStorage.cityCode)
    // 职位列表
    this.getPositionList()
    // 获取地区列表
    this.getAreaList(localStorage.cityCode)
    // 根据条件获取发型师列表
    this.setFirstData()
  },
  ready: function () {
    let self = this
    window.onscroll = function () {
      let container = document.querySelector('.all-dressers')
      // let laschild = document.querySelectorAll('.store-item')[document.querySelectorAll('.store-item').length - 1]
      if (self.hasMoreData && (window.screen.height + window.scrollY) >= container.offsetHeight) {
        self.setMoreData()
      }
    }
  },
  methods: {
    setFirstData: function (requestData) {
      let self = this
      let extendRequestData = utils.extendObj(self.baseRequsetData, requestData)
      if (!extendRequestData.cityCode) {
        extendRequestData.cityCode = localStorage.cityCode
      }
      extendRequestData.pageNo = 1
      self.baseRequsetData = extendRequestData
      console.log('setFirstData：')
      console.log(self.baseRequsetData)
      // 获取发型师列表
      this.loading.show = true
      document.querySelector('html').style.overflowY = 'hidden'
      self.$http.get(window.ctx + '/api/barber/list', extendRequestData).then((response) => {
        document.querySelector('html').style.overflowY = 'auto'
        self.loading.show = false
        let res = response.data
        if (res.code === 0) {
          document.querySelector('body').scrollTop = 0
          self.$set('items', res.result.result)
          if (!res.result.result || res.result.result.length === 0) {
            self.noresult = true
          }else if (res.result.result.length < self.baseRequsetData.pageSize) {
            self.noresult = false
            self.hasMoreData = false
          }else {
            self.noresult = false
            self.hasMoreData = true
          }
        }else {
          self.noresult = true
        }
      }, (response) => {
        self.noresult = true
        document.querySelector('html').style.overflowY = 'auto'
        self.loading.show = false
      })
    },
    setMoreData: function () {
      let self = this
      self.baseRequsetData.pageNo = self.baseRequsetData.pageNo + 1
      self.loading.show = true
      document.querySelector('html').style.overflowY = 'hidden'
      console.log('getmoredata：')
      console.log(self.baseRequsetData)
      self.$http.get(window.ctx + '/api/barber/list', self.baseRequsetData).then((response) => {
        self.loading.show = false
        document.querySelector('html').style.overflowY = 'auto'
        let res = response.data
        if (res.code === 0) {
          self.items = self.items.concat(res.result.result)
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
    getStoreList: function (citycode) {// 获取门店列表
      this.$http.get(window.ctx + '/api/shop/allList', {'cityCode': citycode}).then(function (response) {
        let res = response.data
        if (res.code === 0) {
          let tempFilter = {
            'name': '门店',
            'param': 'shopId',
            'values': res.result
          }
          this.searchItems.filters.$set(0, tempFilter)
        }else {
          toast('获取门店列表失败')
        }
      }, function (response) {
        toast('获取门店列表失败')
      })
    },
    getPositionList: function () {// 获取职位列表
      this.$http.get(window.ctx + '/api/position/list').then(function (response) {
        let res = response.data
        if (res.code === 0) {
          let tempFilter = {
            'name': '职位',
            'param': 'positionId',
            'values': res.result
          }
          this.searchItems.filters.$set(1, tempFilter)
        }else {
          toast('获取职位列表失败')
        }
      }, function (response) {
        toast('获取职位列表失败')
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
            this.searchItems.filters.$set(2, tempFilter)
            return false
          }
        }
      }
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
