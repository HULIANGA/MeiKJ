<style lang="sass">
@import '../assets/css/style.scss'
</style>
<template>
<div class="user-center">
  <div class="user-center-hd">
    <div class="user-center-avatar" v-bind:style="{backgroundImage: 'url('+imageDomain + userInfo.logo+')'}" v-if="userInfo.logo">
      <input type="file" name="file" @change="avaChange">
    </div>
    <div class="user-center-avatar" v-else>
      <input type="file" name="file" @change="avaChange">
      <img src="../assets/img/center-avatar.png">
    </div>
    <p>{{userInfo.nickName}}</p>
    <p>{{userInfo.mobile}}</p>
    <button class="btn btn-info" @click.prevent="changePhone">修改手机号</button>
  </div>
  <div class="user-center-bd">
    <div class="center-item">
      <a class="center-item-link" :href="userCenter.orderUrl">
        <div class="ct-link-hd">
          <img src="../assets/img/center-order.png">
        </div>
        <div class="ct-link-bd">
          我的订单
        </div>
      </a>
    </div>
    <div class="center-item">
      <a class="center-item-link" :href="userCenter.couponUrl">
        <div class="ct-link-hd">
          <img src="../assets/img/center-coupon.png">
        </div>
        <div class="ct-link-bd">
          我的优惠券
        </div>
      </a>
    </div>
    <div class="center-item">
      <a class="center-item-link" :href="userCenter.collectionUrl">
        <div class="ct-link-hd">
          <img src="../assets/img/center-favorite.png">
        </div>
        <div class="ct-link-bd">
          我的收藏
        </div>
      </a>
    </div>
    <div class="center-item">
      <a class="center-item-link" :href="userCenter.personalUrl">
        <div class="ct-link-hd">
          <img src="../assets/img/center.png">
        </div>
        <div class="ct-link-bd">
          个人资料
        </div>
      </a>
    </div>
    <div class="center-item">
      <a class="center-item-link" :href="userCenter.resetUrl">
        <div class="ct-link-hd">
          <img src="../assets/img/center-pwd.png">
        </div>
        <div class="ct-link-bd">
          重置密码
        </div>
      </a>
    </div>
    <div class="center-item">
      <a class="center-item-link" :href="userCenter.salesUrl">
        <div class="ct-link-hd">
          <img src="../assets/img/center-sale.png">
        </div>
        <div class="ct-link-bd">
          售后保障
        </div>
      </a>
    </div>
    <div class="center-item">
      <a class="center-item-link" :href="userCenter.aboutUrl">
        <div class="ct-link-hd">
          <img src="../assets/img/center-about.png">
        </div>
        <div class="ct-link-bd">
          关于我们
        </div>
      </a>
    </div>
  </div>
  <div class="user-center-ft">
    <button class="btn btn-logout" v-show="!isweixin" @click.prevent="logout">退出登录</button>
  </div>
</div>
<bottom-menu :active="'usercenter'"></bottom-menu>
<modal :show.sync="phoneModal" title="修改手机号">
  <div slot="modal-body" class="modal-body">
    <input type="input" maxlength="11" class="phone-num" v-model="phoneNum" placeholder="请填写手机号">
  </div>
  <div class="modal-footer" slot="modal-footer">
    <button class="btn btn-primary" @click.prevent="confirmPhone">确认</button>
  </div>
</modal>
</template>
<script>
  import BottomMenu from '../components/BottomMenu'
  import toast from '../js/toast'
  import Loading from '../components/Loading'
  import Modal from '../components/Modal'
  import {getCheck} from '../js/utils'
  export default {
    data () {
      return {
        userInfo: {},
        loading: {
          show: true
        },
        isweixin: /MicroMessenger/i.test(navigator.userAgent),
        imageDomain: 'http://meimeidou.qiniudn.com/',
        userCenter: {
          orderUrl: 'myOrder.html',
          personalUrl: 'personalData.html',
          collectionUrl: 'collection.html',
          resetUrl: 'resetPwd.html',
          couponUrl: 'myCoupon.html',
          aboutUrl: 'aboutUs.html',
          salesUrl: 'afterSale.html'
        },
        token: '',
        phoneModal: false,
        phoneNum: ''
      }
    },
    created () {
      let self = this
      self.token = localStorage.token
      if (!self.token) {
        toast('请先登录')
        window.location.href = 'login.html?fromUrl=' + encodeURIComponent(window.location.href)
      }else {
        self.$http.post(window.ctx + '/api/customer/t/detail', { }, {headers: {token: self.token}}).then((response) => {
          let res = response.data
          if (res.code === 0) {
            self.$set('userInfo', res.result)
          }else if (res.code === 10007) {
            toast('登录已过期，请重新登录')
            setTimeout(function () {
              window.location.href = 'login.html?fromUrl=' + encodeURIComponent(window.location.href)
            }, 1000)
          }
        })
      }
    },
    methods: {
      changePhone () {
        this.phoneModal = true
      },
      confirmPhone () {
        const phone = this.phoneNum.trim()
        if (!getCheck.checkPhone(phone)) {
          toast('请填写正确的手机号')
          return
        }
        this.$http.post(window.ctx + '/api/customer/t/changeMobile', {mobile: phone}, {headers: {token: this.token}}).then((response) => {
          let res = response.data
          if (res.code === 0) {
            toast('修改成功')
            this.userInfo.mobile = phone
            this.phoneNum = ''
            this.phoneModal = false
          } else if (res.code === 10007) {
            toast('登录已过期，请重新登录')
            setTimeout(function () {
              window.location.href = 'login.html?fromUrl=' + encodeURIComponent(window.location.href)
            }, 1000)
          }
        }, (response) => {
          toast('修改失败')
        })
      },
      logout () {
        localStorage.setItem('token', '')
        self.token = localStorage.getItem('token')
        window.location.href = 'main.html'
      },
      avaChange (e) {
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) {
          return
        }
        this._upload(files[0])
      },
      _upload (file) {
        let self = this
        let data = new FormData()
        data.append('file', file)
        self.loading.show = true
        self.$http.post(window.ctx + '/api/common/uploadW', data).then((response) => {
          let res = response.data
          self.loading.show = false
          if (res.code === 0) {
            self.$set('userInfo.logo', res.result.key)
            self.$http.post(window.ctx + '/api/customer/t/logo', {path: self.userInfo.logo}, {headers: {token: self.token}}).then((response) => {
              if (response.data.code === 0) {
                toast('上传成功')
              } else {
                toast('上传失败')
              }
            }, (response) => {
              toast('上传失败')
            })
          } else {
            toast('上传失败')
          }
        }, (response) => {
          toast('上传失败')
        })
      }
    },
    components: {
      BottomMenu,
      Loading,
      Modal
    }
  }
</script>
<style>
  body {
    background-image: url(../assets/img/center-back.jpg);
    background-repeat: no-repeat;
    background-size: cover;
  }
  .user-center {
    padding-bottom: 100px;
  }
  .user-center-hd {
    position: relative;
    padding: 15px 0;
    background-color: rgba(0,0,0,.5);
  }
  .user-center-hd .btn-info {
    position: absolute;
    bottom: 25px;
    right: 15px;
    font-size: 1.2rem;
    line-height: 24px;
    padding: 0 4px;
  }
  .user-center-hd .user-center-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #6d9fdb;
    border:2px solid #fff;
    overflow: hidden;
    margin: 10px auto;
    position: relative;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .user-center-avatar input[type=file] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 1;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
  .user-center-avatar>img {
    display: block;
    width: 50px;
    height: auto;
    margin: 15px auto;
  }
  .user-center-hd>p {
    color: #fff;
    font-size: 1.6rem;
    text-align: center;
    margin-bottom: 10px;
  }
  .user-center-bd {
    color: #fff;
    font-size: 1.6rem;
    background-color: rgba(0,0,0,.5);
  }
  .center-item-link {
    display: -webkit-box;
    display: flex;
    display: -webkit-flex;
    padding: 15px 15px;
    position: relative;
    color: #fff;
  }
  .center-item-link::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    border-top: 1px solid #fff;
    color: #fff;
    transform-origin: 0 0;
    -webkit-transform-origin:0 0;
    transform:scaleY(0.5);
    -webkit-transform: scaleY(0.5);
  }
  .ct-link-hd>img {
    width: 16px;
    height: auto;
    vertical-align: middle;
  }
  .center-item-link .ct-link-bd {
    -webkit-box-flex:1;
    flex:1;
    -webkit-flex:1;
    display: -webkit-box;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items:center;
    padding-left: 8px;
    position: relative;
  }
  .ct-link-bd::after {
    content: "";
    display: inline-block;
    height: 10px;
    width: 10px;
    border-width: 2px 2px 0 0;
    border-style: solid;
    border-color: #fff;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    position: absolute;
    right: 10px;
    top: 50%;
    margin-top: -6px;
  }
  .user-center-ft {
    padding: 20px 0;
    position: relative;
  }
  .user-center-ft::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    border-top: 1px solid #fff;
    color: #fff;
    transform-origin: 0 0;
    -webkit-transform-origin:0 0;
    transform:scaleY(0.5);
    -webkit-transform: scaleY(0.5);
  }
  .user-center-ft .btn-logout {
    display: block;
    width: 50%;
    margin: 0 auto;
    height: 40px;
    line-height: 40px;
    background-color: rgba(0,0,0,.5);
  }
  .phone-num {
    display: block;
    height: 36px;
    line-height: 36px;
    border-bottom: 1px solid #eaeaea;
    width: 80%;
    margin: 30px auto;
    text-align: center;
    -webkit-filter: blur(0);
  }
</style>
