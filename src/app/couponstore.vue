<style lang="sass">
@import '../assets/css/style.scss'
</style>
<template>
  <div class="coupon-store">
    <div class="coupon-list">
      <div class="coupon-item"  v-for="item in items">
        <div class="coupon-subitem">
          <div class="c-left">
              <p class="coupon-price">{{ item.couponPrice}}</p>
              <p class="coupon-limit">（满{{item.couponLimit}}可用）</p>
          </div>
          <div class="c-right">
            <h3>{{item.couponName}}</h3>
            <p class="coupon-time">{{item.couponStartTime}} - {{item.couponEndTime}}</p>
          </div>
        </div>
        <div class="coupon-control">
          <button class="btn btn-coupon">领取</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      items: window.couponStore
    }
  }
}
</script>
<style>
body {
  background-color: #eaeaea;
}
.coupon-store {
  background-color: #eaeaea;
}
.coupon-list {
  margin-left: 15px;
  margin-top: 10px;
}
.coupon-item {
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
  height: 100px;
  margin-bottom: 15px;
}
.coupon-subitem {
  -webkit-box-flex:4;
  flex: 4;
  -webkit-flex:4;
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
  padding: 10px 0;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  background-color: #fff;
}
.coupon-control {
  -webkit-box-flex:1;
  flex: 1;
  -webkit-flex:1;
  background-color: #ff6251;
  border-radius: 4px;
}
.coupon-control>button {
  background-color: #ff6251;
  width: 100%;
  height: 100px;
  line-height: 100px;
  background-image: url(../assets/img/coupon-edge.png);
  background-repeat: no-repeat;
  background-position: -5px center;
  background-size: 9px auto;
}
.coupon-subitem .c-left {
  -webkit-box-flex:1;
  flex: 1;
  -webkit-flex:1;
  position: relative;
  padding: 10px 0;
}
.c-left::after {
  content: '';
  position: absolute;
  bottom: -16px;
  right: -6px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #eaeaea;
}
.coupon-subitem .c-right {
  position: relative;
  -webkit-box-flex:2;
  flex: 2;
  -webkit-flex:2;
  padding: 10px 0;
  border-left: 1px dashed #a7a7a7;
}
.c-right::after {
  content: '';
  position: absolute;
  top: -16px;
  left: -6px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #eaeaea;
}
.coupon-price {
  font-size: 2rem;
  color: #ff6251;
  text-align: center;
}
.coupon-limit {
  font-size: 1.2rem;
  color: #ff6251;
  text-align: center;
}
.c-right>h3 {
  font-size: 1.8rem;
  text-align: center;
}
.c-right .coupon-time {
  font-size: 1.2rem;
  text-align: center;
  margin-top: 10px;
}
</style>
