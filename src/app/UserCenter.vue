<style lang="sass">
@import '../assets/css/style.scss'
</style>
<template>
<div class="user-center">
  <div class="user-center-hd">
    <div class="user-center-avatar">
      <img src="../assets/img/center-avatar.png">
    </div>
    <p>{{userInfo.nickName}}</p>
    <p>{{userInfo.mobile}}</p>
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
    <button class="btn btn-logout" @click.prevent="logout">退出登录</button>
  </div>
</div>
<bottom-menu :active="'usercenter'"></bottom-menu>
</template>
<script>
  import BottomMenu from '../components/BottomMenu'
  import toast from '../js/toast'

  export default {
    data () {
      return {
        userInfo: {},
        userCenter: {
          orderUrl: 'myOrder.html',
          personalUrl: 'personalData.html',
          collectionUrl: 'collection.html',
          resetUrl: 'resetPwd.html',
          couponUrl: 'myCoupon.html',
          aboutUrl: 'aboutUs.html',
          salesUrl: 'afterSale.html'
        },
        token: ''
      }
    },
    ready () {
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
      logout () {
        localStorage.setItem('token', '')
        self.token = localStorage.getItem('token')
        window.location.href = 'main.html'
      }
    },
    components: {
      BottomMenu
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
    padding: 15px 0;
    background-color: rgba(0,0,0,.5);
  }
  .user-center-hd .user-center-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #6d9fdb;
    border:2px solid #fff;
    overflow: hidden;
    margin: 10px auto;
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
</style>
