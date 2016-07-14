<style lang="sass">
  @import '../assets/css/style.scss'
</style>
<template>
  <div v-show="hairData" class="hair-detail">
    <div class="swiper-photo">
      <swiper-hair :items="hairData.photoList"></swiper-hair>
    </div>
    <div class="hairstyle-intro">
      发型简介：{{hairData.introduction}}
    </div>
  </div>
  <div class="hairstyle-control">
    <div class="hairstyle-item">
      <button class="praise" v-bind:class="{'active':isPraise}" @click.prevent="praise()"></button>
    </div>
    <div class="hairstyle-item">
      <button class="collect" v-bind:class="{'active':isCollect}" @click.prevent="collect()"></button>
    </div>
    <div class="hairstyle-litem">
      <button class="hairstyle-reserve">立即预约</button>
    </div>
  </div>
</template>
<script>
import SwiperHair from '../components/SwiperHair'
import toast from '../libs/toast'

export default {
  data () {
    return {
      hairData: {},
      token: '',
      hairId: '',
      isPraise: false,
      isCollect: false
    }
  },
  ready () {
    let self = this
    self.hairId = window.location.search.substr(1).split('=')[1]
    self.token = localStorage.token
    // 发型详情
    self.$http.post('/api/hairstyle/detail', {hairstyleId: self.hairId}).then((response) => {
      let res = response.data
      if (res.code === 0) {
        self.$set('hairData', res.result)
        self.$broadcast('init-swiper')
      }
    })
    // self.$http.post('/api/hairstyle/t/collectAndPraise', {hairstyleId: self.hairId}, {headers: {token: self.token}}).then((response) => {
    //   let res = response.data
    //   if (res.code === 0) {
    //     self.$set('isPraise', res.result.isPriase)
    //     self.$set('isCollect', res.result.isCollect)
    //   }
    // })
  },
  methods: {
    praise () {
      let self = this
      if (self.token) {
        if (!self.isPraise) {
          self.$http.post('/api/praise/t/praise', {hairstyleId: self.hairId}, {headers: {token: self.token}}).then((response) => {
            let res = response.data
            if (res.code === 0) {
              self.$set('isPraise', true)
              toast('成功点赞')
            }
          })
        } else {
          self.$http.post('/api/praise/t/cancel', {hairstyleId: self.hairId}, {headers: {token: self.token}}).then((response) => {
            let res = response.data
            if (res.code === 0) {
              self.$set('isPraise', false)
              toast('取消点赞')
            }
          })
        }
      } else {
        window.location.href = location.origin + '/dist/html/login.html'
      }
    },
    collect () {
      let self = this
      if (self.token) {
        if (!self.isCollect) {
          self.$http.post('/api/collect/t/collect', {hairstyleId: self.hairId}, {headers: {token: self.token}}).then((response) => {
            let res = response.data
            if (res.code === 0) {
              self.$set('isCollect', true)
              toast('收藏成功')
            }
          })
        } else {
          self.$http.post('/api/collect/t/cancel', {hairstyleId: self.hairId}, {headers: {token: self.token}}).then((response) => {
            let res = response.data
            if (res.code === 0) {
              self.$set('isCollect', false)
              toast('取消收藏')
            }
          })
        }
      } else {
        window.location.href = location.origin + '/dist/html/login.html'
      }
    }
  },
  components: {
    SwiperHair
  }
}
</script>
<style>
.hair-detail {
  padding:20px 10px 0;
}
.hairstyle-intro {
  font-size: 1.4rem;
  line-height: 24px;
  margin-top: 15px;
}
.hairstyle-control {
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
  height: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 0 1px #eaeaea;
  background-color: #fff;
}
.hairstyle-control .hairstyle-item {
  -webkit-box-flex:1;
  flex: 1;
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.hairstyle-control .hairstyle-litem {
  -webkit-box-flex:2;
  flex: 2;
}
.hairstyle-item:first-child::after {
  content: '';
  position: absolute;
  right: 0;
  top: 5px;
  width: 2px;
  height: 40px;
  background-color: #eaeaea;
}
.praise {
  width: 36px;
  height: 36px;
  line-height: 36px;
  border-radius: 50%;
  background-color: #adadad;
  background-image: url(../assets/img/praise-default.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 20px;
}
.praise.active {
  background-image: url(../assets/img/praise.png);
}
.collect{
  width: 36px;
  height: 36px;
  line-height: 36px;
  border-radius: 50%;
  background-color: #adadad;
  background-image: url(../assets/img/heart-default.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 20px;
}
.collect.active {
  background-image: url(../assets/img/heart.png);
}
.hairstyle-reserve {
  height: 50px;
  width: 100%;
  background-color: #ff7162;
  font-size: 1.5rem;
  line-height: 50px;
  border-radius: 0;
}
</style>
