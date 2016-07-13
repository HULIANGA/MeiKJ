<template>
  <div class="store-item" v-for="item in items" @click.prevent="viewDetail(item)">
    <div class="store-img">
      <span><img :src="'http://meimeidou.qiniudn.com/'+item.logo"></span>
    </div>
    <div class="store-text">
      <p class="store-name">{{ item.name}}</p>
      <p class="store-address">{{ item.address}}</p>
      <p class="store-phone">{{ item.phone}}</p>
      <span class="store-distance">{{ item.storeDistance}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    items: Array
  },
  methods: {
    viewDetail (item) {
      let storeId = item.id
      window.location.href = location.origin + '/dist/html/storedetail.html?id=' + storeId
    }
  }
}
</script>
<style scoped>
.store-item {
  display: flex;
  padding: 10px 2px;
  font-size: 1.4rem;
  border: 1px solid #ffffff;
  background-color: #ffffff;
  position: relative;
  border-bottom-color: #eaeaea
}
.store-item.active{
  border-color: #FF6251;
  border-width: 3px;
  padding: 8px 0;
  background-image: url(../assets/img/select-icon.png);
  background-repeat: no-repeat;
  background-size: 30px auto;
  background-position: right top;
}
.store-item .store-img {
  flex-grow: 0;
  flex-shrink: 0;
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.store-item .store-text {
  position: relative;
  flex-grow: 1;
  color: #a7a7a7;
  padding: 0 10px;
}
.store-img>span {
  display: flex;
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius:4px;
}
.store-text>p {
  margin-bottom: 5px;
  line-height: 22px;
}
.store-text .store-name {
  font-size: 1.6rem;
  color: #333333;
  margin-bottom: 10px;
}
.store-text .store-address {
  background-image: url(../assets/img/address-icon.png);
  background-repeat: no-repeat;
  background-position: left 2px;
  background-size: 15px auto;
  padding-left: 22px;
  font-size: 1.3rem;
}
.store-text .store-phone {
  background-image: url(../assets/img/phone-icon.png);
  background-repeat: no-repeat;
  background-position: left 3px;
  background-size: 16px auto;
  padding-left: 22px;
  font-size: 1.3rem;
}
.store-distance {
  position: absolute;
  bottom: 7px;
  right: 15px;
  color: #ff6251;
}
</style>
