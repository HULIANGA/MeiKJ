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
    padding-top: 2.5rem;
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
    top: 2px
  }
  .change-city img{
    position: absolute;
    width: 10px;
    bottom: 20px;
    right: 5px;
  }
</style>
<template>
  <div class="header-menu">
    <ul>
      <li>
        <a :href="storeUrl">门店</a>
      </li>
      <li>
        <a :href="barberUrl">发型师</a>
      </li>
      <li>
        <a :href="hairUrl">发型</a>
      </li>
      <li>
        <a :href="couponUrl">优惠专区</a>
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
      storeUrl: 'allstore.html',
      barberUrl: 'alldressers.html',
      hairUrl: 'hairlist.html',
      couponUrl: 'couponStore.html'
    }
  },
  methods: {
    showCity: function () {
      window.location.hash = 'showFirst'
    }
  },
  props: {
    localcity: String
  }
}
</script>
