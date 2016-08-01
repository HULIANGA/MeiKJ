<template>
<div class="my-coupon-list">
  <div class="coupon-item-wrap" v-for="(index,item) in items">
    <div class="coupon-item">
      <div class="coupon-subitem">
        <div class="c-left" v-bind:class="{'out-status': item.state == 4 || item.useState == 2}">
            <p class="coupon-price" v-if="item.type === 1">{{ item.discount / 10}}折</p>
            <p class="coupon-price" v-if="item.type === 2">&yen;{{item.money}}</p>
            <p class="coupon-limit" v-if="item.type === 2">（满{{item.line}}可用）</p>
            <p class="coupon-price" v-if="item.type === 3">&yen;{{item.quota}}</p>
        </div>
        <div class="c-right">
          <h3>{{item.name}}</h3>
          <p class="coupon-time">{{item.startTime}} - {{item.endTime}}</p>
        </div>
      </div>
      <div class="coupon-control">
        <button class="btn btn-coupon" @click.prevent="useCoupon(item)">使用</button>
      </div>
    </div>
  </div>
  <no-result v-show="items.length === 0" :text=""></no-result>
</div>
</template>
<script>
import NoResult from '../components/NoResult'
export default {
  data () {
    return {
    }
  },
  props: {
    items: Array
  },
  created () {
  },
  computed: {
  },
  methods: {
    useCoupon: function (item) {
      var money
      if (item.type === 1) { // 折扣
        money = item.discount / 10
      }else if (item.type === 2) {
        money = item.money
      }else if (item.type === 3) {
        money = item.quota
      }
      this.$dispatch('select-coupon', item.id, item.name, item.type, money)
    }
  },
  components: {
    NoResult
  }
}
</script>
<style>
body {
  background-color: #eaeaea;
}
.my-coupon-list {
  margin-left: 15px;
  margin-top: 10px;
}
.coupon-item-wrap {
  position: relative;
}
.coupon-item {
  display: flex;
  height: 100px;
  margin-bottom: 15px;
  position: relative;
  cursor: pointer;
  transition: all .3s linear;
}
.coupon-item-wrap .behind {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
}
.behind button {
  width: 20%;
  height: 100%;
  float: right;
  background: #b3b3b3;
}
.coupon-subitem {
  flex: 4;
  width: 80%;
  display: flex;
  padding: 10px 0;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  background-color: #fff;
}
.coupon-control {
  flex: 1;
  width: 20%;
  border-radius: 4px;
}
.coupon-control .btn-coupon {
  background-color: #ff6251;
  width: 100%;
  height: 100px;
  line-height: 100px;
  background-image: url(../assets/img/coupon-edge.png);
  background-repeat: no-repeat;
  background-position: -5px center;
  background-size: 9px auto;
}
.coupon-control .coupon-status {
  display: block;
  font-size: 1.6rem;
  color: #fff;
  background-color: #9a9a9a;
  text-align: center;
  border-radius: 3px;
}
.coupon-subitem .c-left {
  flex: 1;
  display: flex;
  width: 33.33333%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  padding: 10px 0;
}
.out-status>p {
  color: #9a9a9a;
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
  flex: 2;
  width: 66.66666%;
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
