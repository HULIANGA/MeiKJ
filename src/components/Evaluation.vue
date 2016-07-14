<template>
  <div class="evaluation-info" v-for="evaluation in evaluations">
    <div class="eva-header">
      <p class="eva-user-info">
        <span class="eva-img"><img src="../assets/img/avatar.png"></span>
        {{evaluation.customerName}}
        <span class="eva-time">{{evaluation.createTime | datetime}}</span>
      </p>
      <p class="eva-star">
        评分：<img src="../assets/img/five-star.png" v-if="evaluation.star == 5">
        <img src="../assets/img/four-star.png" v-if="evaluation.star == 4">
        <img src="../assets/img/three-star.png" v-if="evaluation.star == 3">
        <img src="../assets/img/two-star.png" v-if="evaluation.star == 2">
        <img src="../assets/img/one-star.png" v-if="evaluation.star == 1">
        <img src="../assets/img/zero-star.png" v-if="evaluation.star == 0">
        <button class="btn">删除</button>
      </p>
    </div>
    <div class="eva-body">
      {{evaluation.content}}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    evaluations: Array
  }
}
</script>
<style>
.evaluation-info {
  padding:10px 15px 10px 25px;
}
.eva-header .eva-img {
  float: left;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  vertical-align: middle;
  margin-right: 8px;
}
.eva-header>p {
  margin-bottom: 5px;
  height: 24px;
  line-height: 24px;
}
.eva-star {
  padding-left: 32px;
}
.eva-star button {
  float: right;
  background-color: #fff;
  border: 1px solid #ff6251;
  color: #ff6251;
  font-size: 1.3rem;
  padding: 2px 6px;
  box-sizing: border-box;
  height: 24px;
  line-height: 20px;
}
.eva-user-info .eva-time {
  float: right;
  color: #767676;
}
.eva-star>img {
  height: 16px;
  width: auto;
  margin-top: -5px;
  vertical-align: middle;
}
.eva-body {
  padding-left: 32px;
  line-height: 24px;
}
</style>
