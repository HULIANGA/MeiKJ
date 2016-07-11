<template>
  <div class="hair-dresser-item">
    <div >
      <div class="hair-dresser-img"><img :src="'http://meimeidou.qiniudn.com/'+item.logo"></div>
    </div>
    <div class="hair-dresser-text">
        <p class="hair-dresser-store">{{item.shopName}}</p>
        <p class="hair-dresser-name">{{item.stageName }}<span class="hair-dresser-level">{{item.positionName}}</span></p>
        <p class="hair-dresser-star" >
          <img src="../assets/img/five-star.png" v-if="item.star == 5">
          <img src="../assets/img/four-star.png" v-if="item.star == 4">
          <img src="../assets/img/three-star.png" v-if="item.star == 3">
          <img src="../assets/img/two-star.png" v-if="item.star == 2">
          <img src="../assets/img/one-star.png" v-if="item.star == 1">
          <img src="../assets/img/zero-star.png" v-if="item.star == 0">
        </p>
    </div>
    <div class="hair-dresser-ft">
      <p class="hair-dresser-project">洗剪吹<span>&yen;{{item.basePrice}}</span></p>
      <p class="hair-dresser-order">已接单{{item.orderNum}}</p>
      <p class="hair-dresser-comment"><a>点评({{item.commentNum}})</a></p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: Object
  }
}
</script>
<style scoped>
.hair-dresser-item {
  position: relative;
  padding: 10px 5px;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  background-color: #ffffff;
}
.hair-dresser-item.active{
  border: 1px solid red;
}
.hair-dresser-item>div {
  flex: 1;
}
.hair-dresser-item .hair-dresser-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
}
.hair-dresser-item .hair-dresser-text,.hair-dresser-ft {
  position: relative;
  font-size: 1.4rem;
}
.hair-dresser-text>p{
  margin-bottom: 5px;
  line-height: 24px;
}
.hair-dresser-store {
  padding-left: 24px;
  background-image: url(../assets/img/order-store.png);
  background-repeat: no-repeat;
  background-position: left center;
  background-size: 18px;
}
.hair-dresser-star>img {
  height: 16px;
  width: auto;
  position: relative;
  top: -4px;
}
.hair-dresser-name .hair-dresser-level {
  font-size: 1.3rem;
  color: #a7a7a7;
  margin-left: 5px;
}
.hair-dresser-ft>p {
  margin-bottom: 5px;
  text-align: center;
  line-height: 24px;
}
.hair-dresser-ft .hair-dresser-project {
  color: #ff6251;
}
.hair-dresser-ft .hair-dresser-order {
  color:#a7a7a7;
}
.hair-dresser-comment>a {
  display: block;
}
.hair-dresser-comment>a::after {
  content: '';
  display: inline-block;
  width: 8px;
  height: 8px;
  border-width: 1px 1px 0 0;
  border-style: solid;
  border-color: #333;
  transform: rotate(45deg);
}
</style>
