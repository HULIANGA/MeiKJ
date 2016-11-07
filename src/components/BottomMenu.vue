<template>
  <div class="bottom-menu">
    <footer>
      <a :class="active === 'main' ? 'current' : ''" @click.prevent="goMain">首页</a>
      <a v-if="systemType === 'MKJ'" href="https://app.dymkj.net/page/main.do?id=4430&salesid=&storeid=2056">商城</a>
      <a v-if="systemType === 'DY'" @click.prevent="goCoupon">优惠</a>
      <a @click.prevent="goApointment" class="reserve"><span></span>预约</a>
      <a :class="active === 'order' ? 'current' : ''" @click.prevent="goOrder">订单</a>
      <a :class="active === 'usercenter' ? 'current' : ''" @click.prevent="goCenter">我的</a>
    </footer>
  </div>
</template>
<script>
import toast from '../js/toast'

export default {
  data () {
    return {
      systemType: window.systemType,
      token: localStorage.token
    }
  },
  props: {
    active: String
  },
  methods: {
    goCoupon: function () {
      window.goPage('couponStore.html')
    },
    goMain: function () {
      if (this.active !== 'main') {
        window.goPage('main.html')
      }
    },
    goCenter: function () {
      if (this.active !== 'usercenter') {
        this.autoLogin('userCenter.html')
      }
    },
    goOrder: function () {
      if (this.active !== 'order') {
        this.autoLogin('myOrder.html')
      }
    },
    goApointment: function () {
      if (this.active !== 'apointment') {
        this.autoLogin('apointment.html')
      }
    },
    autoLogin: function (url) {
      this.$http.post(window.ctx + '/api/customer/t/tokenState', {}, {headers: {token: this.token}}).then(function (response) {
        let res = response.data
        if (res.code === 0) {
          window.goPage(url)
        }else {
          this.$http.post(window.ctx + '/api/customer/loginState', {}).then((response) => {
            if (response.data.code === 0) {
              localStorage.loginid = response.data.result.id
              localStorage.loginname = response.data.result.nickName ? response.data.result.nickName : ''
              localStorage.token = response.data.result.token
              window.goPage(url)
            } else {
              toast('请先登录')
              setTimeout(function () {
                window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
              }, 1000)
            }
          }, (response) => {
            toast('请先登录')
            setTimeout(function () {
              window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
              // window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
            }, 1000)
          })
        }
      }, function () {
        toast('请先登录')
        setTimeout(function () {
          window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
          // window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
        }, 1000)
      })
    }
  }
}
</script>

<style scoped>
  .bottom-menu {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    background-color: #3f3c39;
    z-index: 999;
  }
  .bottom-menu footer {
    display: flex;
    height: 100%;
  }
  footer>a {
    flex-grow: 1;
    display: flex;
    font-size: 1.2rem;
    color: #fff;
    justify-content: center;
    align-items: flex-end;
    padding: 0;
  }
  footer>a:nth-child(1) {
    background-image: url(../assets/img/index-icon.png);
    background-repeat: no-repeat;
    background-position: center 6px;
    background-size: 24px auto;
  }
  footer>a:nth-child(2) {
    background-image: url(../assets/img/mall-icon.png);
    background-repeat: no-repeat;
    background-position: center 6px;
    background-size: 28px auto;
  }
  footer>a.reserve{
    font-size: 1.4rem;
    padding-bottom: 0;
  }
  footer>a.reserve>span{
    position: absolute;
    width: 56px;
    height: 56px;
    top: -28px;
    left: 50%;
    margin-left: -28px;
    background-image: url(../assets/img/reserve-icon.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 50px;
    background-color: #3f3c39;
    border-radius: 50%;
  }
  footer>a:nth-child(4) {
    background-image: url(../assets/img/order-icon.png);
    background-repeat: no-repeat;
    background-position: center 6px;
    background-size: 20px auto;
  }
  footer>a:nth-child(5) {
    background-image: url(../assets/img/center-icon.png);
    background-repeat: no-repeat;
    background-position: center 6px;
    background-size: 22px auto;
  }
  footer>a.current {
    background-color: #ff7162;
  }
</style>
