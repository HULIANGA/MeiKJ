<style scoped>
  .header-menu {
    padding: 0.7rem 2rem;
    background-color:#696c6d;
    color:#fff;
    font-size:1.2rem;
    position: relative;
  }
  .header-menu>ul {
    display: flex;
  }
  .header-menu>ul>li {
    flex-grow: 1;
    width: 25%;
  }
  .header-menu>ul>li>a {
    display: block;
    padding-top: 2.7rem;
    text-align: center;
    color: #fff;
    box-sizing: border-box;
  }
  .header-menu>ul>li:nth-child(1)>a {
    background-image: url(../assets/img/store.png);
    background-repeat: no-repeat;
    background-size: auto 24px;
    background-position: center 3px;
  }
  .header-menu>ul>li:nth-child(2)>a {
    background-image: url(../assets/img/hairdresser.png);
    background-repeat: no-repeat;
    background-size: auto 24px;
    background-position: center 3px;
  }
  .header-menu>ul>li:nth-child(3)>a {
    background-image: url(../assets/img/hair.png);
    background-repeat: no-repeat;
    background-size: auto 24px;
    background-position: center 3px;
  }
  .header-menu>ul>li:nth-child(4)>a {
    background-image: url(../assets/img/coupon-store.png);
    background-repeat: no-repeat;
    background-size: auto 24px;
    background-position: center 3px;
  }
  .change-city{
    position: absolute;
    right: 0;
    top: 0;
    width: 4rem;
    text-align: center;
    height: 4rem;
  }
  .change-city:before{
    content: '';
    display: block;
    position: absolute;
    border-width: 2rem;
    border-color: #3e4040 #3e4040 transparent transparent;
    border-style: solid;
  }
  .change-city span{
    position: absolute;
    right: 2px;
    top: 2px;
    font-size: 1rem;
  }
  .change-city img{
    position: absolute;
    width: 8px;
    top: 20px;
    right: 3px;
  }
</style>
<template>
  <div class="header-menu">
    <ul>
      <li>
        <a @click="goPage('allStore.html')">门店</a>
      </li>
      <li>
        <a @click="goPage('allDresser.html')">发型师</a>
      </li>
      <li>
        <a @click="goPage('hairList.html')">发型</a>
      </li>
      <li>
        <!-- <a v-if="systemType === 'MKJ'" @click="goPage('couponStore.html')">优惠专区</a> -->
        <!-- <a v-if="systemType === 'DY'" href="http://dy.dymkj.net/html/20161214141035728.html">价目表</a> -->
        <a href="http://dy.dymkj.net/html/20161214141035728.html">价目表</a>
      </li>
    </ul>
    <div class="change-city" @click="showCity">
      <span>{{localcity}}</span>
      <img src="../assets/img/arrow-down-white.png" alt="arrow" />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      systemType: window.systemType
    }
  },
  methods: {
    showCity: function () {
      window.location.hash = 'showFirst'
    },
    goPage: function (url) {
      window.goPage(url)
    }
  },
  props: {
    localcity: String
  }
}
</script>
