<style lang="sass">
  @import '../assets/css/style.scss'
</style>
<template>
  <div class="store-detail">
    <div v-if="storeDetail" class="store-info">
      <div class="store-info-img">
        <img :src="imageDomain + storeDetail.logo">
        <p class="store-info-name">{{storeDetail.name}}</p>
      </div>
      <div class="store-info-text">
        <p class="store-phone">
          <span>{{storeDetail.phone}}</span>
          <span class="get-order">已接单<strong>{{storeDetail.orderNum}}</strong></span>
        </p>
        <p class="store-address">{{storeDetail.address}}<span>{{storeDetail.storeDistance}}</span></p>
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

  export default {
    data () {
      return {
        imageDomain: window.imageDomain,
        loading: {
          show: true
        },
        storeDetail: null,
        serviceItem: [],
        storeMember: [],
        storeId: null
      }
    },
    created () {
      let self = this
      self.storeId = utils.getUrlParam('id')
      // 门店详情
      self.$http.post(window.ctx + '/api/shop/detail', {shopId: self.storeId}).then((response) => {
        self.loading.show = false
        let res = response.data
        if (res.code === 0) {
          self.$set('storeDetail', res.result)
        }
      }, (response) => {
        self.loading.show = false
      })
      // 门店项目
      self.$http.get(window.ctx + '/api/shop/productList', {shopId: self.storeId}).then((response) => {
        self.loading.show = false
        let res = response.data
        if (res.code === 0) {
          self.$set('serviceItem', res.result)
        }
      }, (response) => {
        self.loading.show = false
      })
      // 门店发型师
      self.$http.get(window.ctx + '/api/shop/barberList', {shopId: self.storeId, pageNo: 1, pageSize: 5}).then((response) => {
        self.loading.show = false
        let res = response.data
        if (res.code === 0) {
          self.$set('storeMember', res.result.result)
        }
      }, (response) => {
        self.loading.show = false
      })
    },
    methods: {
      goApointment: function () {
        window.location.href = 'apointment.html?shopId=' + this.storeDetail.id + '&shopName=' + this.storeDetail.name
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
