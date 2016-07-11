<template>
<div class="order">
  <div class="order-reserve-detail">
    <div class="reserve-detail-item">
      <img src="../assets/img/order-store.png">
      预约门店：<span>{{order.shopName}}</span>
    </div>
    <div class="reserve-detail-item">
      <img src="../assets/img/order-hair.png">
      预约发型师：<span>{{order.barberName}}</span>
    </div>
    <div class="reserve-detail-item">
      <img src="../assets/img/order-project.png">
      预约项目：<span>{{order.productNames}}</span>
    </div>
    <div class="reserve-detail-item">
      <img src="../assets/img/order-time.png">
      预约时间：<span>{{order.timeString}}</span>
    </div>
  </div>
  <div class="user-info">
    <div class="user-info-item">
      <div class="user-info-hd">
        <label>真实姓名：</label>
      </div>
      <div class="user-info-bd">
        <input type="text" placeholder="请输入您的真实姓名">
      </div>
    </div>
    <div class="user-info-item">
      <div class="user-info-hd">
        <label>手机号码：</label>
      </div>
      <div class="user-info-bd">
        <input type="tel" placeholder="请输入您的手机号码">
      </div>
    </div>
  </div>
  <div class="user-coupon">
    <a class="user-info-item">
      <div class="user-info-hd">
        <label>优惠券</label>
      </div>
      <div class="user-info-bd">
        <p class="u-info-text">0张可用</p>
      </div>
    </a>
  </div>
  <!-- pay  -->
  <div class="order-pay">
    <div class="order-pay-title">付款方式</div>
    <label class="o-pay-item">
      <div class="o-pay-hd">
        <img src="../assets/img/wechat-pay.png">
      </div>
      <div class="o-pay-bd">
        <p>微信支付</p>
      </div>
      <div class="o-pay-ft">
        <input type="radio" name="pay">
      </div>
    </label>
    <label class="o-pay-item">
      <div class="o-pay-hd">
        <img src="../assets/img/alipay.png">
      </div>
      <div class="o-pay-bd">
        <p>支付宝</p>
      </div>
      <div class="o-pay-ft">
        <input type="radio" name="pay">
      </div>
    </label>
  </div>
  <!-- remark -->
  <div class="order-remark">
    <div class="order-remark-item">
      <div class="o-remark-bd">
        <textarea rows="3" placeholder="在这里填上您的备注说明"></textarea>
      </div>
    </div>
  </div>
  <div class="order-submit">
    <div class="o-submit-left">
      <p>实付金额：99元<span>(优惠：0元)</span></p>
    </div>
    <div class="o-submit-right">
      <button class="btn btn-submit" @click.prevent.stop="submit()">提交</button>
    </div>
  </div>
</div>
</template>
<script>
  export default {
    data () {
      return {
        isWeixin: /MicroMessenger/i.test(navigator.userAgent)
      }
    },
    methods: {
      submit: function () {
        this.order.orderSubmit.payType = 1
        this.order.orderSubmit.customerName = '胡靓'
        this.order.orderSubmit.customerPhone = '15800985626'
        this.order.orderSubmit.price = 20.00
        this.order.orderSubmit.realPrice = 19.00
        this.order.orderSubmit.memo = '我是备注'
        console.log(this.order.orderSubmit)
        this.$http.post('/api/order/t/save', this.order.orderSubmit, {headers: {token: '1e1ce7b155d900beaa8000'}}).then(function (response) {

        })
      }
    },
    props: {
      order: Object
    }
  }
</script>
<style scoped>
.order{
  padding-bottom: 50px;
}
.order-reserve-detail {
  background-image: url(../assets/img/order-back.png);
  background-repeat: no-repeat;
  background-position: left bottom;
  background-size: contain;
  background-color: #fff;
  padding: 15px 0;
}
.reserve-detail-item {
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items:center;
  font-size: 1.5rem;
  height: 36px;
  padding-left: 20px;
}
.reserve-detail-item img {
  width: 20px;
  height: auto;
  margin-right: 8px;
}
.reserve-detail-item>span {
  color: #fd6f60;
}
.user-info {
  background-color: #fff;
  margin-top: 15px;
  font-size: 1.5rem;
}
.user-info-item {
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
  padding: 10px 15px;
  border-bottom: 1px solid #eaeaea;
  align-items: center;
}
.user-info-item .user-info-bd {
  -webkit-box-flex:1;
  flex: 1;
  -webkit-flex:1;
}
.user-info-hd>label{
  display: block;
  width: 105px;
  word-wrap: break-word;
  word-break: break-all;
}
.user-info-bd>input {
  height: 24px;
  line-height: 24px;
  width: 100%;
}
.user-coupon {
  background-color: #fff;
  margin-top: 15px;
  font-size: 1.5rem;
}
.u-info-text {
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
  justify-content: flex-end;
  align-items: center;
  color: #8d8d8d;
}
.u-info-text::after {
  content: '';
  display: inline-block;
  width: 10px;
  height: 10px;
  border-width: 2px 2px 0 0;
  border-style: solid;
  border-color: #8d8d8d;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}
.order-pay {
  margin-top: 15px;
  background-color: #fff;
}
.order-pay-title {
  font-size: 1.5rem;
  border-bottom: 1px solid #eaeaea;
  padding: 10px 15px;
}
.o-pay-item {
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
  padding: 10px 20px;
  font-size: 1.5rem;
  align-items: center;
  position: relative;
}
.o-pay-item::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  border-top: 1px solid #eaeaea;
  color: #eaeaea;
  transform-origin: 0 0;
  -webkit-transform-origin:0 0;
  transform: scaleY(0.5);
  -webkit-transform: scaleY(0.5);
}
.o-pay-hd>img {
  width: 24px;
  height: auto;
  margin-right: 8px;
}
.o-pay-bd {
  -webkit-box-flex:1;
  flex: 1;
  -webkit-flex:1;
}
.o-pay-ft {
  text-align: right;
}
.o-pay-ft input[type=radio] {
  -webkit-appearance:none;
  appearance:none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-image:url(../assets/img/not-check.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
.o-pay-ft input[type=radio]:checked {
  -webkit-appearance:none;
  appearance:none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-image:url(../assets/img/checked.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
.order-remark {
  margin-top: 15px;
  background-color: #fff;
}
.order-remark-item {
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
  padding: 10px 15px;
}
.o-remark-bd {
  -webkit-box-flex:1;
  flex: 1;
  -webkit-flex:1;
}
.o-remark-bd textarea {
  display: block;
  border: 1px solid #eaeaea;
  border-radius: 3px;
  resize: none;
  font-size: 1.5rem;
  width: 100%;
  line-height: 24px;
}
.order-submit {
  position: fixed;
  bottom:0;
  left: 0;
  width: 100%;
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
  height: 50px;
  box-sizing: border-box;
}
.o-submit-left {
  -webkit-box-flex:3;
  flex: 3;
  -webkit-flex:3;
  background-color: #40403f;
  color: #fff;
  font-size: 1.6rem;
  height: 100%;
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  padding-left: 10px;
}
.o-submit-left span {
  color: #fd6f60;
}
.o-submit-right {
  -webkit-box-flex:1;
  flex: 1;
  -webkit-flex:1;
  height: 100%;
}
.btn-submit {
  height: 50px;
  line-height: 50px;
  width: 100%;
  background-color: #fd6f60;
  border-radius: 0;
}
</style>
