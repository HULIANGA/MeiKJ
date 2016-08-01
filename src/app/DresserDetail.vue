<style lang="sass">
@import '../assets/css/style.scss'
</style>
<template>
  <div class="hair-dresser-detail">
    <div class="detail-header clearfix">
      <div class="detail-header-item">
        <div class="detail-img"><img v-if="hairDresser.logo" :src="imageDomain + hairDresser.logo"></div>
      </div>
      <div class="detail-header-item">
        <p class="detail-header-name">{{hairDresser.stageName}} <span>{{hairDresser.positionName}}</span></p>
        <p class="detail-header-order" v-if="hairDresser.orderNum">订单数：{{hairDresser.orderNum}}</p>
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
    <div v-if="hairDresser.introduction" class="introduction">
      <h3 class="item-title"><i></i>个人简介</h3>
      <div class="intro-info">
        {{hairDresser.introduction}}
      </div>
    </div>
    <!-- evaluation -->
    <div v-if="evaluations && evaluations.length > 0" class="evaluation">
      <h3 class="item-title"><i></i>相关评价</h3>
      <evaluation :evaluation ="evaluations[0]"></evaluation>
      <div class="eva-footer">
        <a @click.prevent="goEvaList">查看更多</a>
      </div>
    </div>
    <button class="btn btn-reserve" @click.prevent="goApointment()">预约</button>
    <loading :show="loading.show" :show-text=""></loading>
  </div>
</template>
<script>
  import Evaluation from '../components/Evaluation'
  import ServiceItem from '../components/ServiceItem'
  import Loading from '../components/Loading'
  import utils from '../js/utils'
  import toast from '../js/toast'

  export default {
    data () {
      return {
        imageDomain: window.imageDomain,
        loading: {
          show: true
        },
        hairDresser: {},
        evaluations: null,
        serviceItem: [],
        barberId: null,
        token: ''
      }
    },
    created () {
      let self = this
      let _barberId = utils.getUrlParam('id')
      self.barberId = _barberId
      self.token = localStorage.getItem('token')
      // 发型师信息
      self.$http.post(window.ctx + '/api/barber/detail', {barberId: self.barberId}).then((response) => {
        self.loading.show = false
        let res = response.data
        if (res.code === 0) {
          self.$set('hairDresser', res.result)
        }
      }, (response) => {
        self.loading.show = false
      })
      // 发型师项目
      self.$http.get(window.ctx + '/api/barber/productList', {barberId: self.barberId}).then((response) => {
        self.loading.show = false
        let res = response.data
        if (res.code === 0) {
          self.$set('serviceItem', res.result)
        }
      }, (response) => {
        self.loading.show = false
      })
      // 评论列表
      self.$http.get(window.ctx + '/api/comment/list', {barberId: self.barberId, pageNo: 1, pageSize: 1}).then((response) => {
        self.loading.show = false
        let res = response.data
        if (res.code === 0) {
          self.$set('evaluations', res.result.result)
        }
      }, (response) => {
        self.loading.show = false
      })
    },
    methods: {
      goApointment: function () {
        this.loading.show = true
        this.$http.post(window.ctx + '/api/customer/t/tokenState', {}, {headers: {token: this.token}}).then(function (response) {
          let res = response.data
          if (res.code === 0) {
            window.location.href =
            'apointment.html?personId=' + this.hairDresser.id +
            '&personName=' + this.hairDresser.stageName +
            '&shopId=' + this.hairDresser.shopId +
            '&shopName=' + this.hairDresser.shopName
          }else {
            toast('请先登录')
            setTimeout(function () {
              window.location.href = 'login.html?fromUrl=' + encodeURIComponent(window.location.href)
            }, 1000)
          }
        }, function () {
          toast('请先登录')
          setTimeout(function () {
            window.location.href = 'login.html?fromUrl=' + encodeURIComponent(window.location.href)
          }, 1000)
        })
      },
      goEvaList () {
        window.location.href = 'evaluationList.html?id=' + this.barberId
      }
    },
    components: {
      Evaluation,
      ServiceItem,
      Loading,
      toast
    }
  }
</script>
<style>
body {
  background: #eaeaea;
}
.hair-dresser-detail {
  background-color: #eaeaea;
  padding-bottom: 50px;
}
.detail-header {
  background-image: url(../assets/img/detail-back.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 15px 0;
  text-align: center;
}
.detail-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;
}
.detail-header-item {
  display: inline-block;
  color: #fff;
  font-size: 1.6rem;
  padding: 10px 0;
  vertical-align: middle;
}
.detail-header-item>p {
  line-height: 24px;
  text-align: left;
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
  vertical-align: middle;
}
.introduction {
  background-color: #fff;
  margin-top: 15px;
  font-size: 1.2rem;
  border-bottom: 1px solid #eaeaea;
  padding-top: 5px;
  padding-bottom: 5px;
}
.introduction .intro-info {
  color: #777;
  padding: 5px 15px 0 25px;
  line-height: 20px;
}
.evaluation {
  background-color: #fff;
  margin-top: 15px;
  font-size: 1.4rem;
  padding-top: 5px;
}
.eva-footer {
  text-align: right;
  padding: 0 15px 10px;
  font-size: 1.2rem;
}
.eva-footer>a::after{
  content: '';
  display: inline-block;
  position: relative;
  width: 6px;
  height: 6px;
  border-width: 2px 2px 0 0;
  border-style: solid;
  border-color: #ff6251;
  transform: rotate(45deg);
  margin-left: 3px;
}
.item-title {
  font-size: 1.4rem;
  line-height: 26px;
}
.item-title i {
  float: left;
  width: 15px;
  height: 26px;
  background-color: #ff6251;
  margin-right: 15px;
}
.item-title span {
  margin-left: 10px;
}
</style>
