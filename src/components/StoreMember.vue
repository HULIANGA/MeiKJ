<template>
<div class="store-member">
  <h3 class="item-title"><i></i>发型师<span>({{storemember.totalCount}})</span></h3>
  <div class="s-member-list">
    <div class="s-member-item" v-for="item in storemember.members">
      <div class="s-member-img">
        <img :src="item.mUrl">
      </div>
      <p class="s-member-name">{{item.mName}}</p>
      <p class="s-member-level">{{item.mLevel}}</p>
      <p class="s-member-star" v-if="item.mStar == 5">
        <img src="../assets/img/five-star.png">
      </p>
      <p class="s-member-star" v-if="item.mStar == 4">
        <img src="../assets/img/four-star.png">
      </p>
      <p class="s-member-star" v-if="item.mStar == 3">
        <img src="../assets/img/three-star.png">
      </p>
      <p class="s-member-star" v-if="item.mStar == 2">
        <img src="../assets/img/two-star.png">
      </p>
      <p class="s-member-star" v-if="item.mStar == 1">
        <img src="../assets/img/one-star.png">
      </p>
      <p class="s-member-star" v-if="item.mStar == 0">
        <img src="../assets/img/zero-star.png">
      </p>
    </div>
  </div>
  <p class="s-member-more">
    <a>查看更多</a>
  </p>
</div>
</template>
<script>
export default {
  props: {
    storemember: Object
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
  -webkit-box-flex:1;
  flex:1;
  -webkit-flex:1;
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
  padding-right: 15px;
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
