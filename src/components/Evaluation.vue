<template>
  <div class="evaluation-info" v-for="evaluation in evaluations">
    <div class="eva-header">
      <p class="eva-user-info">
<<<<<<< HEAD
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
=======
        <span class="eva-img"><img :src="evaluation.userImg"></span>
        {{evaluation.customerName}}
        <span class="eva-time">{{evaluation.createTime}}</span>
      </p>
      <p class="eva-star" v-if="evaluation.starNum == 5">
        评分：<img src="../assets/img/five-star.png">
      </p>
      <p class="eva-star" v-if="evaluation.star == 4">
        评分：<img src="../assets/img/four-star.png">
      </p>
      <p class="eva-star" v-if="evaluation.star == 3">
        评分：<img src="../assets/img/three-star.png">
      </p>
      <p class="eva-star" v-if="evaluation.star == 2">
        评分：<img src="../assets/img/two-star.png">
      </p>
      <p class="eva-star" v-if="evaluation.star == 1">
        评分：<img src="../assets/img/one-star.png">
      </p>
      <p class="eva-star" v-if="evaluation.star == 0">
        评分：<img src="../assets/img/zero-star.png">
>>>>>>> f4b8702124b9bc345223232fee617221eb180ad0
      </p>
    </div>
    <div class="eva-body">
      {{evaluation.content}}
<<<<<<< HEAD
=======
    </div>
    <div class="eva-footer">
      <a>查看更多</a>
>>>>>>> f4b8702124b9bc345223232fee617221eb180ad0
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
<style scoped>
.evaluation-info {
  padding:10px 15px 10px 25px;
  font-size: 1.2rem;
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
  line-height: 20px;
}
<<<<<<< HEAD
=======
.eva-footer {
  text-align: right;
  margin-top: 15px;
}
.eva-footer>a::after{
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
  margin-left: 3px;
}
>>>>>>> f4b8702124b9bc345223232fee617221eb180ad0
</style>
