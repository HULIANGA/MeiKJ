<style lang="sass">
  @import '../assets/css/style.scss'
</style>
<template>
  <div class="store-detail">
    <div class="store-info">
      <div class="store-info-img">
        <img :src="storeDetail.storeUrl">
        <p class="store-info-name">{{ storeDetail.storeName}}</p>
      </div>
      <div class="store-info-text">
        <p class="store-phone">{{storeDetail.storePhone}} <span>已接单<strong>{{storeDetail.orderNum}}</strong></span></p>
        <p class="store-address">{{storeDetail.storeAddress}}<span>{{storeDetail.storeDistance}}</span></p>
      </div>
    </div>

    <service-item :serviceitem="serviceitem"></service-item>

    <store-member :storemember="storeMember"></store-member>

    <button class="btn btn-reserve">预约</button>
  </div>
</template>
<script>
  import ServiceItem from '../components/ServiceItem'
  import StoreMember from '../components/StoreMember'

  export default {
    data () {
      return {
        storeDetail: window.storeDetail,
        serviceitem: window.serviceItem,
        storeMember: window.storeMember
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
