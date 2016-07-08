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
    padding: 3px 0;
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
    padding-bottom: 2px;
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
