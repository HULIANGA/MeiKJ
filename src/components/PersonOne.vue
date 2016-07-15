<template>
  <div class="hair-dresser-item">
    <div class="hair-dresser-img">
      <div><img :src="imageDomain + item.logo"></div>
    </div>
    <div class="hair-dresser-text">
        <p class="hair-dresser-name">{{item.stageName }}</p>
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
      <p class="hair-dresser-order">已接单{{item.orderNum}}</p>
    </div>
    <div class="hair-dresser-level"><p>{{item.positionName}}</p></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      imageDomain: window.imageDomain
    }
  },
  props: {
    item: Object
  }
}
</script>
<style scoped>
.hair-dresser-item {
  position: relative;
  padding: 10px 5px;
  border: 1px solid #ffffff;
  border-bottom-color: #eaeaea;
  display: flex;
  background-color: #ffffff;
  box-sizing: border-box;
}
.hair-dresser-item.active{
  border: 3px solid #FF6251;
  padding: 8px 3px;
}
.hair-dresser-item.active .hair-dresser-level {
  right: -2px;
  top: 8px;
}
.hair-dresser-item .hair-dresser-img {
  width: 100px;
  display: flex;
  justify-content: center;
}
.hair-dresser-item .hair-dresser-img>div {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
}
.hair-dresser-item .hair-dresser-text {
  flex-grow: 1;
  padding-left: 20px;
}
.hair-dresser-item .hair-dresser-text,.hair-dresser-item .hair-dresser-ft {
  position: relative;
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.hair-dresser-item .hair-dresser-ft {
  justify-content: flex-end;
}
.hair-dresser-level {
  position: absolute;
  right: 0px;
  top: 10px;
  height: 26px;
  background-color: #FF6251;
  color: #ffffff;
  line-height: 26px;
  font-size: 1.2rem;
  width: 60px;
  text-align: right;
  padding-right: 8px;
  padding-left: 15px;
  box-sizing: border-box;
  border-top-left-radius: 13px;
  border-bottom-left-radius: 13px;
}
.hair-dresser-level>p {
  background-image: url(../assets/img/position-icon.png);
  background-repeat: no-repeat;
  background-size: auto 14px;
  background-position: left center;
}
.hair-dresser-text>p {
  line-height: 24px;
  font-size: 1.6rem;
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
  vertical-align: top;
  margin-top: 4px;
}
.hair-dresser-ft>p {
  text-align: center;
  line-height: 24px;
}
.hair-dresser-ft .hair-dresser-project {
  color: #ff6251;
}
.hair-dresser-ft .hair-dresser-order {
  color:#a7a7a7;
  font-size: 1.2rem;
  padding-right: 10px;
}
</style>
