<template>
  <div class="bottom-menu">
    <footer>
      <a class="current">首页</a>
      <a>商城</a>
      <a class="reserve"><span></span>预约</a>
      <a>订单</a>
      <a>我的</a>
    </footer>
  </div>
</template>
<style scoped>
  .bottom-menu {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    background-color: #3f3c39;
  }
  .bottom-menu footer {
    display: -webkit-box;
    display: flex;
    display: -webkit-flex;
    height: 100%;
  }
  footer>a {
    -webkit-box-flex:1;
    flex: 1;
    -webkit-flex:1;
    display: -webkit-box;
    display: flex;
    display: -webkit-flex;
    font-size: 1.3rem;
    color: #fff;
    justify-content: center;
    -webkit-justify-content:center;
    align-items: flex-end;
    -webkit-align-items:flex-end;
  }
  footer>a:nth-child(1) {
    background-image: url(../assets/img/index-icon.png);
    background-repeat: no-repeat;
    background-position: center 5px;
    background-size: 24px auto;
  }
  footer>a:nth-child(2) {
    background-image: url(../assets/img/mall-icon.png);
    background-repeat: no-repeat;
    background-position: center 5px;
    background-size: 28px auto;
  }
  footer>a.reserve>span{
    position: absolute;
    width: 64px;
    height: 64px;
    top: -32px;
    left: 50%;
    margin-left: -32px;
    background-image: url(../assets/img/reserve-icon.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 40px;
    background-color: #3f3c39;
    border-radius: 50%;
  }
  footer>a:nth-child(4) {
    background-image: url(../assets/img/order-icon.png);
    background-repeat: no-repeat;
    background-position: center 5px;
    background-size: 20px auto;
  }
  footer>a:nth-child(5) {
    background-image: url(../assets/img/center-icon.png);
    background-repeat: no-repeat;
    background-position: center 5px;
    background-size: 22px auto;
  }
  footer>a.current {
    background-color: #ff7162;
  }
</style>
