<style scoped>
  .header-menu {
    height: 50px;
    padding: 0.5rem 1.5rem;
    background-color:#5a5b5d;
    color:#fff;
    font-size:1.4rem;
  }
  .header-menu>ul {
    display: -webkit-box;
    display: flex;
    display: -webkit-flex;
    height: 100%;
  }
  .header-menu>ul>li {
    -webkit-box-flex:1;
    flex: 1;
    -webkit-flex:1;
    width: 25%;
    height: 100%;
  }
  .header-menu>ul>li>a {
    display: block;
    height: 100%;
    padding-top: 3rem;
    text-align: center;
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
</style>
<template>
  <div class="header-menu">
    <ul>
      <li>
        <a>门店</a>
      </li>
      <li>
        <a>发型师</a>
      </li>
      <li>
        <a>发型</a>
      </li>
      <li>
        <a>优惠专区</a>
      </li>
    </ul>
  </div>
</template>
