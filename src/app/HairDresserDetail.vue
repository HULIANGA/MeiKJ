<style lang="sass">
@import '../assets/css/style.scss'
</style>
<template>
  <div class="hair-dresser-detail">
    <div class="detail-header clearfix">
      <div class="detail-header-item">
        <div class="detail-img"><img :src="hairDresser.dresserUrl"></div>
      </div>
      <div class="detail-header-item">
        <p class="detail-header-name">{{ hairDresser.dresserName}} <span>{{hairDresser.level}}</span></p>
        <p class="detail-header-order">订单数：{{ hairDresser.orderNum}}</p>
        <p class="detail-header-star" v-if="hairDresser.starNum == 5">
          <img src="../assets/img/five-star.png">
        </p>
        <p class="detail-header-star" v-if="hairDresser.starNum == 4">
          <img src="../assets/img/four-star.png">
        </p>
        <p class="detail-header-star" v-if="hairDresser.starNum == 3">
          <img src="../assets/img/three-star.png">
        </p>
        <p class="detail-header-star" v-if="hairDresser.starNum == 2">
          <img src="../assets/img/two-star.png">
        </p>
        <p class="detail-header-star" v-if="hairDresser.starNum == 1">
          <img src="../assets/img/one-star.png">
        </p>
        <p class="detail-header-star" v-if="hairDresser.starNum == 0">
          <img src="../assets/img/zero-star.png">
        </p>
      </div>
    </div>
    <!-- service item -->
    <service-item :serviceitem="serviceItem"></service-item>
    <!--introduction-->
    <div class="introduction">
      <h3 class="item-title"><i></i>个人简介</h3>
      <div class="intro-info">
        徐凯，法国HCF高级发型师协会中国区主席，荣获中国
        巴黎欧莱雅色彩成就奖，并加入巴黎欧莱雅专业美发创
        艺小组，国内顶尖创意造型师。
      </div>
    </div>
    <!-- evaluation -->
    <div class="evaluation">
      <h3 class="item-title"><i></i>相关评价</h3>
      <evaluation :evaluation="evaluation"></evaluation>
    </div>
    <button class="btn btn-reserve">预约</button>
  </div>
</template>
<script>
  import Evaluation from '../components/Evaluation'
  import ServiceItem from '../components/ServiceItem'
  export default {
    data () {
      return {
        hairDresser: window.hairDresser,
        evaluation: window.evaluation,
        serviceItem: window.serviceItem
      }
    },
    components: {
      Evaluation,
      ServiceItem
    }
  }
</script>
<style>
.hair-dresser-detail {
  background-color: #eaeaea;
  padding-bottom: 42px;
}
.detail-header {
  background-image: url(../assets/img/detail-back.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 15px 0;
}
.detail-header>div {
  float: left;
  width: 50%;
}
.detail-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
}
.detail-header-item {
  color: #fff;
  font-size: 1.6rem;
  padding: 10px 0;
}
.detail-header-item>p {
  margin-top: 5px;
}
.detail-header-name>span,.detail-header-order {
  font-size: 1.2rem;
}
.detail-header-star {
  height: 24px;
}
.detail-header-star>img {
  height: 16px;
  width: auto;
}
.introduction {
  background-color: #fff;
  margin-top: 15px;
  font-size: 1.4rem;
  border-bottom: 1px solid #eaeaea;
  padding-top: 5px;
  padding-bottom: 15px;
}
.introduction .intro-info {
  color: #777;
  padding: 0 15px 0 25px;
  line-height: 24px;
}
.evaluation {
  background-color: #fff;
  margin-top: 15px;
  font-size: 1.4rem;
  padding-top: 5px;
}
</style>
