<template>
<div class="store-member">
  <h3 class="item-title"><i></i>发型师<span>({{storemember.totalCount}})</span></h3>
  <div class="s-member-list">
    <div class="s-member-item" v-for="item in storemember.result" @click.prevent="detail(item.id)">
      <div class="s-member-img">
        <img :src="'http://meimeidou.qiniudn.com/'+item.logo">
      </div>
      <p class="s-member-name">{{item.stageName}}</p>
      <p class="s-member-level">{{item.positionName}}</p>
      <p class="s-member-star">
        <img src="../assets/img/five-star.png" v-if="item.star == 5">
        <img src="../assets/img/four-star.png" v-if="item.star == 4">
        <img src="../assets/img/three-star.png" v-if="item.star == 3">
        <img src="../assets/img/two-star.png" v-if="item.star == 2">
        <img src="../assets/img/one-star.png" v-if="item.star == 1">
        <img src="../assets/img/zero-star.png" v-if="item.star == 0">
      </p>
    </div>
  </div>
  <p class="s-member-more" v-if="storemember.totalCount > 4">
    <a @click.prevent="showMore">查看更多</a>
  </p>
</div>
</template>
<script>
import utils from '../libs/utils'
export default {
  props: {
    storemember: Object
  },
  methods: {
    showMore () {
      console.log('ooo')
      let storeId = utils.getUrlParam('id')
      window.location.href = location.origin + '/dist/html/shopbarber.html?id=' + storeId
    },
    detail (id) {
      window.location.href = location.origin + '/dist/html/barberDetail.html?id=' + id
    }
  }
}
</script>
<style>
.store-member {
  background-color: #fff;
  font-size: 1.6rem;
  margin-top: 15px;
}
.store-member .s-member-list  {
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
}
.s-member-list .s-member-item {
  width: 25%;
  padding: 5px;
}
.s-member-item .s-member-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
    margin: 0 auto;
}
.s-member-item>p {
  text-align: center;
  margin-top: 5px;
}
.s-member-star {
  height: 16px;
}
.s-member-star>img {
  width: 60%;
  vertical-align: top;
}
.s-member-more {
  text-align: right;
  padding: 0 15px 10px 0;
}
.s-member-more>a::after {
  content: '';
  display: inline-block;
  position: relative;
  width: 8px;
  height: 8px;
  border-width: 2px 2px 0 0;
  border-style: solid;
  border-color: #ff6251;
  transform: rotate(45deg);
  -webkit-transform:rotate(45deg);
}
</style>
