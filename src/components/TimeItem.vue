<template>
  <div class="c-time-bd clearfix">
    <div class="time-item" v-for="item in timelist" v-bind:class="{'active': ($index === active)}" @click.prevent="chooseTime($index,item)">
      <p>{{item.hour}}</p>
      <p v-if="item.status == 0">
        可预约
      </p>
      <p v-if="item.status == 1">
        已预约
      </p>
      <p v-if="item.status == 2">
        不可预约
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    timelist: Array,
    active: {
      type: Number,
      default: 0
    }
  },
  methods: {
    chooseTime (index, el) {
      this.active = index
    }
  }
}
</script>
<style>
.c-time-bd {
  padding: 10px;
  background-color: #fff;
}
.time-item {
  float: left;
  width: 76px;
  height: 76px;
  border: 1px solid #333;
  margin:10px 5px;
  text-align: center;
  font-size: 1.5rem;
  padding-top: 14px;
  box-sizing: border-box;
  position: relative;
}
.time-item>p {
  line-height: 24px;
}
.time-item.active {
  border-color: #ff6251;
  border-width: 2px;
  background-image: url(../assets/img/select-icon.png);
  background-repeat: no-repeat;
  background-position: right -1px;
  background-size: 24px;
}
</style>
