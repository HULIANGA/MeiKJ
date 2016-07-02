<style lang="sass">
@import '../assets/css/style.scss'
</style>
<template>
  <div class="hair-dresser-detail">
    <div class="detail-header clearfix">
      <div class="detail-header-item">
        <div class="detail-img"><img :src="'http://meimeidou.qiniudn.com/'+hairDresser.logo"></div>
      </div>
      <div class="detail-header-item">
        <p class="detail-header-name">{{ hairDresser.stageName}} <span>{{hairDresser.positionName}}</span></p>
        <p class="detail-header-order">订单数：{{ hairDresser.orderNum}}</p>
        <p class="detail-header-star" v-if="hairDresser.star == 5">
          <img src="../assets/img/five-star.png">
        </p>
        <p class="detail-header-star" v-if="hairDresser.star == 4">
          <img src="../assets/img/four-star.png">
        </p>
        <p class="detail-header-star" v-if="hairDresser.star == 3">
          <img src="../assets/img/three-star.png">
        </p>
        <p class="detail-header-star" v-if="hairDresser.star == 2">
          <img src="../assets/img/two-star.png">
        </p>
        <p class="detail-header-star" v-if="hairDresser.star == 1">
          <img src="../assets/img/one-star.png">
        </p>
        <p class="detail-header-star" v-if="hairDresser.star == 0">
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
        {{hairDresser.introduction}}
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
        serviceItem: window.serviceItem,
        barberId: ''
      }
    },
    ready () {
      let self = this
      let _barberId = window.location.search.substr(1).split('=')[1]
      self.barberId = _barberId
      self.$http.post('/api/barber/detail', {barberId: self.barberId}).then((response) => {
        let res = response.data
        if (res.code === 0) {
          self.$set('hairDresser', res.result)
        }
      })
      self.$http.get('/api/comment/list', {barberId: self.barberId, pageNo: 1, pageSize: 1}).then((response) => {
        let res = response.data
        if (res.code === 0) {
          console.log(res.result.result)
        }
      })
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
