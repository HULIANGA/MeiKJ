<template>
  <div class="evaluation-info">
    <div class="eva-header">
      <p class="eva-user-info">
        <span class="eva-img"><img :src="evaluation.userImg"></span>
        {{evaluation.userName}}
        <span class="eva-time">{{evaluation.evalTime}}</span>
      </p>
      <p class="eva-star" v-if="evaluation.starNum == 5">
        评分：<img src="../assets/img/five-star.png">
      </p>
      <p class="eva-star" v-if="evaluation.starNum == 4">
        评分：<img src="../assets/img/four-star.png">
      </p>
      <p class="eva-star" v-if="evaluation.starNum == 3">
        评分：<img src="../assets/img/three-star.png">
      </p>
      <p class="eva-star" v-if="evaluation.starNum == 2">
        评分：<img src="../assets/img/two-star.png">
      </p>
      <p class="eva-star" v-if="evaluation.starNum == 1">
        评分：<img src="../assets/img/one-star.png">
      </p>
      <p class="eva-star" v-if="evaluation.starNum == 0">
        评分：<img src="../assets/img/zero-star.png">
      </p>
    </div>
    <div class="eva-body">
      {{evaluation.info}}
    </div>
    <div class="eva-footer">
      <a>查看更多</a>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    evaluation: Object
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
.eva-footer {
  text-align: right;
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
</style>
