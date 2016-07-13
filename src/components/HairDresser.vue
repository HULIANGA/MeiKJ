<template>
  <div class="hair-dresser-item" v-for="item in items" @click.prevent="detail(item)">
    <div >
      <div class="hair-dresser-img"><img :src="'http://meimeidou.qiniudn.com/'+item.logo"></div>
    </div>
    <div class="hair-dresser-text">
        <p class="hair-dresser-store">{{item.shopName}}</p>
        <p class="hair-dresser-name">{{ item.stageName }}<span class="hair-dresser-level">{{item.positionName}}</span></p>
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
    items: Array
  },
  methods: {
    detail (item) {
      let barberId = item.id
      window.location.href = location.origin + '/dist/html/barberDetail.html?id=' + barberId
    }
  }
}
</script>
<style>
.hair-dresser-item {
  position: relative;
  padding: 10px 5px;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  background: #ffffff;
}
.hair-dresser-item .hair-dresser-img {
  width: 90px;
  padding: 0 10px;
  border-radius: 50%;
  margin-right: 10px;
  overflow: hidden;
}
.hair-dresser-item .hair-dresser-text,.hair-dresser-item .hair-dresser-ft {
  position: relative;
  font-size: 1.4rem;
}
.hair-dresser-item .hair-dresser-text {
  flex-grow: 1;
}
.hair-dresser-item .hair-dresser-ft {
  padding-right: 10px;
  flex-shrink: 0;
}
.hair-dresser-text>p{
  line-height: 22px;
  padding: 3px 0;
}
.hair-dresser-text>p.hair-dresser-store {
  padding-left: 20px;
  background-image: url(../assets/img/order-store.png);
  background-repeat: no-repeat;
  background-position: left 7px;
  background-size: 14px;
}
.hair-dresser-star>img {
  height: 14px;
  width: auto;
  position: relative;
  top: -4px;
}
.hair-dresser-name .hair-dresser-level {
  font-size: 1.2rem;
  color: #ff6251;
  margin-left: 5px;
}
.hair-dresser-ft>p {
  text-align: right;
  line-height: 22px;
  padding: 3px 0;
  font-size: 1.2rem;
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
  width: 6px;
  height: 6px;
  border-width: 1px;
  border-style: solid;
  border-color: #333333 #333333 transparent transparent;
  transform: rotate(45deg);
  float: right;
  margin-top: 7px;
}
</style>
