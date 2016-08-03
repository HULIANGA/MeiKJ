<style lang="sass">
  @import '../assets/css/style.scss'
</style>
<template>
  <div class="hair-detail">
    <div class="swiper-photo">
      <swiper-hair :items="hairData.photoList"></swiper-hair>
    </div>
    <div v-if="hairData.introduction" class="hairstyle-intro">
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
      <button class="hairstyle-reserve" @click="goApointment()">立即预约</button>
    </div>
  </div>
  <loading :show="loading.show"></loading>
</template>
<script>
import SwiperHair from '../components/SwiperHair'
import Loading from '../components/Loading'
import toast from '../js/toast'

export default {
  data () {
    return {
      loading: {
        show: true
      },
      hairData: {},
      token: '',
      hairId: '',
      isPraise: false,
      isCollect: false
    }
  },
  created () {
    let self = this
    self.hairId = window.location.search.substr(1).split('=')[1]
    self.token = localStorage.token
    // 发型详情
    self.$http.post(window.ctx + '/api/hairstyle/detail', {hairstyleId: self.hairId}).then((response) => {
      let res = response.data
      self.loading.show = false
      if (res.code === 0) {
        self.$set('hairData', res.result)
        if (self.hairData.photoList && self.hairData.photoList.length > 1) {
          self.$broadcast('init-swiper')
        }
      }
    }, (response) => {
      self.loading.show = false
    })
    if (self.token) {
      self.$http.post(window.ctx + '/api/hairstyle/t/collectAndPraise', {hairstyleId: self.hairId}, {headers: {token: self.token}}).then((response) => {
        let res = response.data
        if (res.code === 0) {
          self.$set('isPraise', res.result.isPriase)
          self.$set('isCollect', res.result.isCollect)
        }else if (res.code === 10007) {
          toast('登录已过期')
          setTimeout(function () {
            window.location.href = 'login.html?fromUrl=' + encodeURIComponent(window.location.href)
          }, 1000)
        }
      })
    }
  },
  methods: {
    goApointment () {
      this.loading.show = true
      this.$http.post(window.ctx + '/api/customer/t/tokenState', {}, {headers: {token: this.token}}).then(function (response) {
        let res = response.data
        if (res.code === 0) {
          window.location.href = 'apointment.html'
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
    praise () {
      let self = this
      if (self.token) {
        self.loading.show = true
        if (!self.isPraise) {
          self.$http.post(window.ctx + '/api/praise/t/praise', {hairstyleId: self.hairId}, {headers: {token: self.token}}).then((response) => {
            let res = response.data
            if (res.code === 0) {
              self.$set('isPraise', true)
              self.loading.show = false
              toast('成功点赞')
            }else if (res.code === 10007) {
              toast('登录已过期，请重新登录')
              setTimeout(function () {
                window.location.href = 'login.html?fromUrl=' + encodeURIComponent(window.location.href)
              }, 1000)
            }else {
              self.loading.show = false
              toast('点赞失败')
            }
          }, (response) => {
            self.loading.show = false
            toast('点赞失败')
          })
        } else {
          self.$http.post(window.ctx + '/api/praise/t/cancel', {hairstyleId: self.hairId}, {headers: {token: self.token}}).then((response) => {
            let res = response.data
            if (res.code === 0) {
              self.$set('isPraise', false)
              self.loading.show = false
              toast('取消点赞成功')
            }else if (res.code === 10007) {
              toast('登录已过期，请重新登录')
              setTimeout(function () {
                window.location.href = 'login.html?fromUrl=' + encodeURIComponent(window.location.href)
              }, 1000)
            }else {
              self.loading.show = false
              toast('取消点赞失败')
            }
          }, (response) => {
            self.loading.show = false
            toast('取消点赞失败')
          })
        }
      } else {
        toast('请先登录')
        setTimeout(function () {
          window.location.href = 'login.html?fromUrl=' + encodeURIComponent(window.location.href)
        }, 1000)
      }
    },
    collect () {
      let self = this
      if (self.token) {
        self.loading.show = true
        if (!self.isCollect) {
          self.$http.post(window.ctx + '/api/collect/t/collect', {hairstyleId: self.hairId}, {headers: {token: self.token}}).then((response) => {
            let res = response.data
            if (res.code === 0) {
              self.$set('isCollect', true)
              self.loading.show = false
              toast('收藏成功')
            }else if (res.code === 10007) {
              toast('登录已过期，请重新登录')
              setTimeout(function () {
                window.location.href = 'login.html?fromUrl=' + encodeURIComponent(window.location.href)
              }, 1000)
            }else {
              self.loading.show = false
              toast('收藏失败')
            }
          }, (response) => {
            self.loading.show = false
            toast('收藏失败')
          })
        } else {
          self.$http.post(window.ctx + '/api/collect/t/cancel', {hairstyleId: self.hairId}, {headers: {token: self.token}}).then((response) => {
            let res = response.data
            if (res.code === 0) {
              self.$set('isCollect', false)
              self.loading.show = false
              toast('取消收藏成功')
            }else if (res.code === 10007) {
              toast('登录已过期，请重新登录')
              setTimeout(function () {
                window.location.href = 'login.html?fromUrl=' + encodeURIComponent(window.location.href)
              }, 1000)
            }else {
              self.loading.show = false
              toast('取消收藏失败')
            }
          }, (response) => {
            self.loading.show = false
            toast('取消收藏失败')
          })
        }
      } else {
        toast('请先登录')
        setTimeout(function () {
          window.location.href = 'login.html?fromUrl=' + encodeURIComponent(window.location.href)
        }, 1000)
      }
    }
  },
  components: {
    SwiperHair,
    Loading
  }
}
</script>
<style>
.hair-detail {
  padding:20px 15px 50px;
}
.hairstyle-intro {
  font-size: 1.4rem;
  line-height: 24px;
  margin-top: 15px;
  padding: 0 10px;
}
.hairstyle-control {
  display: flex;
  height: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 10;
}
.hairstyle-control .hairstyle-item {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-top: 1px solid #eaeaea;
}
.hairstyle-control .hairstyle-litem {
  flex-grow: 2;
}
.hairstyle-item:nth-child(2)::before {
  content: '';
  position: absolute;
  left: 0;
  top: 5px;
  width: 1px;
  height: 40px;
  background-color: #eaeaea;
}
.praise {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #adadad;
  background-image: url(../assets/img/praise-default.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 16px;
}
.praise.active {
  background-image: url(../assets/img/praise.png);
}
.collect{
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #adadad;
  background-image: url(../assets/img/heart-default.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 18px;
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
