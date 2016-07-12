<style lang="sass">
  @import '../assets/css/style.scss'
</style>
<template>
  <div class="store-detail">
    <div class="store-info">
      <div class="store-info-img">
        <img :src="'http://meimeidou.qiniudn.com/'+storeDetail.logo">
        <p class="store-info-name">{{ storeDetail.name}}</p>
      </div>
      <div class="store-info-text">
        <p class="store-phone">{{storeDetail.phone}} <span>已接单<strong>{{storeDetail.orderNum}}</strong></span></p>
        <p class="store-address">{{storeDetail.address}}<span>{{storeDetail.storeDistance}}</span></p>
      </div>
    </div>

    <service-item :serviceitem="serviceitem"></service-item>

    <store-member :storemember="storeMember"></store-member>

    <button class="btn btn-reserve" @click.prevent="goApointment()">预约</button>
  </div>
</template>
<script>
  import ServiceItem from '../components/ServiceItem'
  import StoreMember from '../components/StoreMember'
  import utils from '../libs/utils'
  export default {
    data () {
      return {
        storeDetail: {},
        serviceitem: window.serviceItem,
        storeMember: {},
        storeId: ''
      }
    },
    ready () {
      let self = this
      let _storeId = utils.getUrlParam('id')
      self.storeId = _storeId
      self.$http.post('/api/shop/detail', {shopId: self.storeId}).then((response) => {
        let res = response.data
        if (res.code === 0) {
          self.$set('storeDetail', res.result)
        }
      }, (response) => {
        console.log(response.data)
      })
      self.$http.get('/api/shop/barberList', {shopId: self.storeId, pageNo: 1, pageSize: 4}).then((response) => {
        let res = response.data
        if (res.code === 0) {
          self.$set('storeMember', res.result)
        }
      })
    },
    methods: {
      goApointment: function () {
        window.location.href = 'apointment.html?shopId=' + this.storeDetail.id + '&shopName=' + this.storeDetail.name
      }
    },
    components: {
      ServiceItem,
      StoreMember
    }
  }
</script>
<style>
.store-detail {
  background-color: #eaeaea;
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
  height: 36px;
  line-height: 36px;
  font-size: 1.8rem;
  background-color: rgba(0,0,0,.5);
  color: #fff;
  padding-left: 15px;
}
.store-info-text {
  background-color: #fff;
  font-size: 1.6rem;
  padding: 10px;
  color: #767676;
}
.store-info-text>p {
  line-height: 30px;
}
.store-address {
  background-image: url(../assets/img/address-icon.png);
  background-repeat: no-repeat;
  background-position: left center;
  background-size: 16px auto;
  padding-left: 20px;
}
.store-phone {
  background-image: url(../assets/img/phone-icon.png);
  background-repeat: no-repeat;
  background-position: left center;
  background-size: 16px auto;
  padding-left: 20px;
}
.store-phone>span {
  float: right;
}
.store-phone>span>strong {
  font-weight: normal;
  color: #ff6251;
}
.store-address>span{
  float: right;
  color: #ff6251;
}
</style>
