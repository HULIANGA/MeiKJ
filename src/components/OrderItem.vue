<template>
  <div class="order-item" v-for="item in items">
    <p class="order-paytime" v-if="item.orderType == 1">剩余支付时间：</p>
    <p class="orderno">订单编号：B121211414112 <span>金额：99元</span></p>
    <p>预约门店：{{item.orderStore}}</p>
    <p>预约时间：{{item.reserveTime}}</p>
    <p class="clearfix"><span class="pull-l">预约项目：{{item.reserveItem}}</span><span class="pull-r">预约发型师：{{item.reservePerson}}</span></p>
    <div class="order-control">
      <div>
        <template v-if="item.orderType == 1 || item.orderType == 2">
          <button class="btn btn-default">取消订单</button>
        </template>
      </div>
      <div v-if="item.orderType == 1">
          <button class="btn btn-primary">去付款</button>
      </div>
      <div v-if="item.orderType == 2">
        <button class="btn btn-primary">确认服务</button>
      </div>
      <div class="control-right" v-if="item.orderType == 3">
        <button class="btn btn-primary">去评价</button>
      </div>
      <div class="control-right" v-if="item.orderType == 4">
        <span class="order-status">待退款</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
    cancelText: {
      type: String,
      default: ''
    },
    confirmText: {
      type: String,
      default: ''
    }
  }
}
</script>
<style>
.order-item {
  margin-top: 15px;
  background-color: #fff;
  font-size: 1.4rem;
  padding: 5px 10px;
  color: #8d8d8d;
}
.order-item>p {
  margin-top: 5px;
}
.order-item .orderno {
  font-size: 1.6rem;
  color: #333;
}
.orderno>span {
  color: #ff7162;
  float: right;
}
.order-item .order-control {
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
  margin-top: 10px;
  margin-bottom: 5px;
}
.order-control>div {
  -webkit-box-flex:1;
  flex:1;
  -webkit-flex:1;
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  -webkit-justify-content:center;
}
.order-control>div.control-right {
  justify-content: flex-end;
  -webkit-justify-content: flex-end;
}
.order-control button {
  font-size: 1.5rem;
  width: 50%;
}
.order-control .btn-default {
  background-color: #424241;
}
.order-control .btn-primary {
  background-color: #ff7162;
}
.order-control .order-status {
  display: block;
  width: 50%;
  font-size: 1.5rem;
  background-color: #c0c0bf;
  color: #fff;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border-radius: 3px;
}
</style>
