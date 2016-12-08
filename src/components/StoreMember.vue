<template>
<div class="store-member">
  <h3 class="item-title"><i></i>发型师<span>({{storemembercount}})</span></h3>
  <div class="s-member-list">
    <div class="s-member-item" v-for="(index, item) in storemember | limitBy 4" @click.prevent="detail(item.id)">
      <div class="s-member-img" :style="{height: (screenWidth - 30) / 4 - 14 + 'px'}">
        <img v-if="item.logo" :src="imageDomain + item.logo">
        <img v-else src="../assets/img/dresser-default.png">
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
  <p class="s-member-more" v-if="storemembercount > 4">
    <a @click.prevent="showMore">查看更多</a>
  </p>
</div>
</template>
<script>
import utils from '../js/utils'
export default {
  data () {
    return {
      screenWidth: window.screen.width,
      imageDomain: window.imageDomain
    }
  },
  props: {
    storemember: Array,
    storemembercount: Number
  },
  methods: {
    showMore () {
      let storeId = utils.getUrlParam('id')
      window.goPage('shopDresser.html?id=' + storeId)
    },
    detail (id) {
      window.goPage('dresserDetail.html?id=' + id)
    }
  }
}
</script>
<style scoped>
.store-member {
  background-color: #fff;
  font-size: 1.6rem;
  margin-top: 15px;
  padding-top: 5px;
}
.store-member .item-title {
  font-size: 1.4rem;
  line-height: 26px;
}
.store-member .item-title i {
  float: left;
  width: 15px;
  height: 26px;
  background-color: #ff6251;
  margin-right: 15px;
}
.store-member .item-title span {
  margin-left: 10px;
}
.store-member .s-member-list  {
  display: flex;
  padding-top: 13px;
  margin: 0 15px;
}
.s-member-list .s-member-item {
  width: 25%;
  padding: 5px;
  font-size: 1.3rem;
  box-sizing: border-box;
}
.s-member-item .s-member-img {
  border-radius: 50%;
  overflow: hidden;
  margin: 0 2px 10px;
}
.s-member-item>p {
  text-align: center;
}
.s-member-star {
  margin-top: 5px;
}
.s-member-star>img {
  width: 60%;
  vertical-align: top;
}
.s-member-more {
  text-align: right;
  padding: 0 15px 10px 0;
  font-size: 1.3rem;
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
