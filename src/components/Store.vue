<template>
  <div class="store-item" v-for="item in items">
    <div class="store-img">
      <span><img :src="item.storeUrl"></span>
    </div>
    <div class="store-text">
      <p class="store-name">{{ item.storeName}}</p>
      <p class="store-address">{{ item.storeAddress}}</p>
      <p class="store-phone">{{ item.storePhone}}</p>
      <span class="store-distance">{{ item.storeDistance}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    items: Array
  }
}
</script>
<style>
.store-item {
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
  padding: 12px 0;
  font-size: 1.4rem;
  border-bottom: 1px solid #eaeaea;
}
.store-item .store-img {
  -webkit-box-flex:1;
  flex: 1;
  -webkit-flex :1;
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  -webkit-justify-content:center;
  -webkit-align-items:center;
}
.store-item .store-text {
  position: relative;
  -webkit-box-flex:2;
  flex: 2;
  -webkit-flex:2;
  color: #a7a7a7;
  padding-right: 15px;
}
.store-img>span {
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius:4px;
}
.store-text>p {
  margin-bottom: 5px;
  line-height: 24px;
}
.store-text .store-name {
  font-size: 1.6rem;
  color: #333;
}
.store-text .store-address {
  background-image: url(../assets/img/address-icon.png);
  background-repeat: no-repeat;
  background-position: left 4px;
  background-size: 16px auto;
  padding-left: 20px;
}
.store-text .store-phone {
  background-image: url(../assets/img/phone-icon.png);
  background-repeat: no-repeat;
  background-position: left 4px;
  background-size: 16px auto;
  padding-left: 20px;
}
.store-distance {
  position: absolute;
  bottom: 7px;
  right: 15px;
  color: #ff6251;
}
</style>
