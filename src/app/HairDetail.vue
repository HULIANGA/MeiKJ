<style lang="sass">
  @import '../assets/css/style.scss'
</style>
<template>
  <div class="hair-detail">
    <div class="swiper-photo">
      <swiper-hair :items="hairData.photoList"></swiper-hair>
    </div>
    <div v-if="hairData.introduction" class="hairstyle-intro">
      <span class="hairstyle-name">{{hairData.albumName}}</span>：{{hairData.introduction}}
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
import utils from '../js/utils'
import toast from '../js/toast'
import autoLogin from '../js/autoLogin'

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
    this.$http.post(window.ctx + '/api/customer/t/tokenState', {}, {headers: {token: localStorage.token}}).then(function (response) {
      let res = response.data
      if (res.code === 0) { // 已经登录
        this.setCollectAndPraise() // 设置点赞和收藏状态
      }else {
        autoLogin.login({ // 自动登录
          component: this,
          yCallback: function () { // 自动登录成功
            this.setCollectAndPraise() // 设置点赞和收藏状态
          },
          nCallback: function () {
            return
          }
        })
      }
    }, function () {
    })

    this.hairId = utils.getUrlParam('id')
    // 发型详情
    this.$http.post(window.ctx + '/api/hairstyle/detail', {hairstyleId: this.hairId}).then((response) => {
      let res = response.data
      this.loading.show = false
      if (res.code === 0) {
        this.$set('hairData', res.result)
        if (this.hairData.photoList && this.hairData.photoList.length > 1) {
          this.$broadcast('init-swiper')
        }
      }
    }, (response) => {
      this.loading.show = false
    })
  },
  methods: {
    setCollectAndPraise () {
      this.$http.post(window.ctx + '/api/hairstyle/t/collectAndPraise', {hairstyleId: this.hairId}, {headers: {token: localStorage.token}}).then((response) => {
        let res = response.data
        if (res.code === 0) {
          this.$set('isPraise', res.result.isPriase)
          this.$set('isCollect', res.result.isCollect)
        }
      })
    },
    goApointment () {
      this.loading.show = true
      this.$http.post(window.ctx + '/api/customer/t/tokenState', {}, {headers: {token: localStorage.token}}).then(function (response) {
        let res = response.data
        if (res.code === 0) {
          window.goPage('apointment.html')
        }else {
          autoLogin.login({
            component: this,
            yCallback: function () {
              window.goPage('apointment.html')
            },
            nCallback: null
          })
        }
      }, function () {
        toast('请先登录')
        setTimeout(function () {
          window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
        }, 1000)
      })
    },
    praise () {
      if (localStorage.token) {
        this.loading.show = true
        if (!this.isPraise) {
          this.$http.post(window.ctx + '/api/praise/t/praise', {hairstyleId: this.hairId}, {headers: {token: localStorage.token}}).then((response) => {
            let res = response.data
            if (res.code === 0) {
              this.$set('isPraise', true)
              this.loading.show = false
              toast('成功点赞')
            }else if (res.code === 10007) {
              toast('登录已过期，请重新登录')
              setTimeout(function () {
                window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
              }, 1000)
            }else {
              this.loading.show = false
              toast('请先登录')
              setTimeout(function () {
                window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
              }, 1000)
            }
          }, (response) => {
            this.loading.show = false
            toast('点赞失败')
          })
        } else {
          this.$http.post(window.ctx + '/api/praise/t/cancel', {hairstyleId: this.hairId}, {headers: {token: localStorage.token}}).then((response) => {
            let res = response.data
            if (res.code === 0) {
              this.$set('isPraise', false)
              this.loading.show = false
              toast('取消点赞成功')
            }else if (res.code === 10007) {
              toast('登录已过期，请重新登录')
              setTimeout(function () {
                window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
              }, 1000)
            }else {
              this.loading.show = false
              toast('取消点赞失败')
            }
          }, (response) => {
            this.loading.show = false
            toast('取消点赞失败')
          })
        }
      } else {
        toast('请先登录')
        setTimeout(function () {
          window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
        }, 1000)
      }
    },
    collect () {
      if (localStorage.token) {
        this.loading.show = true
        if (!this.isCollect) {
          this.$http.post(window.ctx + '/api/collect/t/collect', {hairstyleId: this.hairId}, {headers: {token: localStorage.token}}).then((response) => {
            let res = response.data
            if (res.code === 0) {
              this.$set('isCollect', true)
              this.loading.show = false
              toast('收藏成功')
            }else if (res.code === 10007) {
              toast('登录已过期，请重新登录')
              setTimeout(function () {
                window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
              }, 1000)
            }else {
              this.loading.show = false
              toast('请先登录')
              setTimeout(function () {
                window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
              }, 1000)
            }
          }, (response) => {
            this.loading.show = false
            toast('收藏失败')
          })
        } else {
          this.$http.post(window.ctx + '/api/collect/t/cancel', {hairstyleId: this.hairId}, {headers: {token: localStorage.token}}).then((response) => {
            let res = response.data
            if (res.code === 0) {
              this.$set('isCollect', false)
              this.loading.show = false
              toast('取消收藏成功')
            }else if (res.code === 10007) {
              toast('登录已过期，请重新登录')
              setTimeout(function () {
                window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
              }, 1000)
            }else {
              this.loading.show = false
              toast('取消收藏失败')
            }
          }, (response) => {
            this.loading.show = false
            toast('取消收藏失败')
          })
        }
      } else {
        toast('请先登录')
        setTimeout(function () {
          window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
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
.hairstyle-intro .hairstyle-name {
  color: #ff7162;
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
