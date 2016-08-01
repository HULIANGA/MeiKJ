<style lang="sass">
  @import '../assets/css/style.scss';
  @import '../assets/css/swiper.scss'
</style>
<template>
  <div class="store-detail">
    <div v-if="storeDetail" class="store-info">
      <div class="store-info-img">
        <div class="swiper-container swiper-box">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in storeDetail.photoList">
              <img :src="imageDomain + item">
            </div>
          </div>
        </div>
        <!-- <img :src="imageDomain + storeDetail.logo"> -->
        <p class="store-info-name">{{storeDetail.name}}</p>
      </div>
      <div class="store-info-text">
        <p class="store-phone">
          <span>{{storeDetail.phone}}</span>
          <span class="get-order">已接单<strong>{{storeDetail.orderNum}}</strong></span>
        </p>
        <p class="store-address">{{storeDetail.address}}<span>{{storeDetail.range}}米</span></p>
      </div>
    </div>
    <service-item :serviceitem="serviceItem"></service-item>
    <store-member :storemember="storeMember"></store-member>
    <button class="btn btn-reserve" @click.prevent="goApointment()">预约</button>
    <loading :show="loading.show" :show-text=""></loading>
  </div>
</template>
<script>
  import ServiceItem from '../components/ServiceItem'
  import StoreMember from '../components/StoreMember'
  import Loading from '../components/Loading'
  import utils from '../js/utils'
  import toast from '../js/toast'
  import Swiper from 'swiper'
  export default {
    data () {
      return {
        imageDomain: window.imageDomain,
        token: localStorage.token,
        loading: {
          show: true
        },
        storeDetail: null,
        serviceItem: [],
        storeMember: [],
        storeId: null,
        latitude: null,
        longitude: null
      }
    },
    created () {
      let self = this
      // 百度地图api放在最后加载，判断api加载完成后获取城市
      let getCityInterval = setInterval(() => {
        if (typeof (window.BMap) !== 'undefined') {
          this.getLocation()
          clearInterval(getCityInterval)
        }
      }, 500)
      self.storeId = utils.getUrlParam('id')
      // 门店项目
      self.$http.get(window.ctx + '/api/shop/productList', {shopId: self.storeId}).then((response) => {
        // self.loading.show = false
        let res = response.data
        if (res.code === 0) {
          self.$set('serviceItem', res.result)
        }
      }, (response) => {
        // self.loading.show = false
      })
      // 门店发型师
      self.$http.get(window.ctx + '/api/shop/barberList', {shopId: self.storeId, pageNo: 1, pageSize: 5}).then((response) => {
        // self.loading.show = false
        let res = response.data
        if (res.code === 0) {
          self.$set('storeMember', res.result.result)
        }
      }, (response) => {
        // self.loading.show = false
      })
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
            self.latitude = r.point.lat
            self.longitude = r.point.lng
          }
          self.getData()
          // }
        }, function () {// 不支持h5定位
          self.getData()
        }, {enableHighAccuracy: true})
      },
      goApointment: function () {
        this.loading.show = true
        this.$http.post(window.ctx + '/api/customer/t/tokenState', {}, {headers: {token: this.token}}).then(function (response) {
          let res = response.data
          if (res.code === 0) {
            window.location.href = 'apointment.html?shopId=' + this.storeDetail.id + '&shopName=' + this.storeDetail.name
          }else {
            toast('请先登录')
            setTimeout(function () {
              window.location.href = 'login.html?fromUrl=' + encodeURIComponent(window.location.href)
            }, 1000)
          }
        }, function () {
          toast('请先登录')
          setTimeout(function () {
            window.location.href = 'login.html?fromUrl=' + encodeURIComponent(window.location.href)
          }, 1000)
        })
      },
      getData: function () {
        // 门店详情
        this.$http.post(window.ctx + '/api/shop/detail', {shopId: this.storeId, longitude: this.longitude, latitude: this.latitude}).then((response) => {
          this.loading.show = false
          let res = response.data
          if (res.code === 0) {
            this.$set('storeDetail', res.result)
            this.$nextTick(function () {
              /* eslint-disable no-new */
              new Swiper('.swiper-box', {
                speed: 1000,
                autoplay: 2500,
                loop: true,
                autoplayDisableOnInteraction: false
              })
            })
          }
        }, (response) => {
          this.loading.show = false
        })
      }
    },
    components: {
      ServiceItem,
      StoreMember,
      Loading
    }
  }
</script>
<style>
body {
  background: #eaeaea;
}
.swiper-box {
  width: 100%;
  margin: 0;
  z-index: 2;
  top: 0;
}
.store-detail {
  padding-bottom: 50px;
}
.store-info-img {
  position: relative;
}
.store-info-name {
  position: absolute;
  left: 0;
  right: 0;
  bottom:0;
  line-height: 32px;
  font-size: 1.5rem;
  background-color: rgba(0,0,0,.5);
  color: #ffffff;
  padding-left: 15px;
}
.store-info-text {
  background-color: #fff;
  font-size: 1.3rem;
  padding: 10px 15px;
  color: #767676;
}
.store-info-text>p {
  line-height: 28px;
}
.store-address {
  background-image: url(../assets/img/address-icon.png);
  background-repeat: no-repeat;
  background-position: left center;
  background-size: 13px auto;
  padding-left: 20px;
}
.store-phone {
  background-image: url(../assets/img/phone-icon.png);
  background-repeat: no-repeat;
  background-position: left center;
  background-size: 14px auto;
  padding-left: 20px;
}
.store-phone .get-order {
  float: right;
}
.store-phone .get-order>strong {
  font-weight: normal;
  color: #ff6251;
}
.store-address>span{
  float: right;
  color: #ff6251;
}
</style>
