<template>
  <div class="choose-time-container">
    <div class="choose-time">
      <header-date></header-date>
      <time-item :costhours="hours"></time-item>
    </div>
    <button class="btn btn-reserve" @click="next()">已选好</button>
  </div>
</template>
<script>
import HeaderDate from '../components/HeaderDate'
import TimeItem from '../components/TimeItem'
import utils from '../js/utils'

export default {
  data () {
    return {
    }
  },
  methods: {
    next: function () {
      this.$dispatch('next', {'fromStep': 'time'})
    }
  },
  events: {
    'select-date': function (date) {
      this.$broadcast('get-time-list', {
        shopId: this.shopid,
        barberId: utils.getUrlParam('personId') ? utils.getUrlParam('personId') : '',
        date: date
      })
    }
  },
  created () {

  },
  ready () {
  },
  components: {
    HeaderDate,
    TimeItem
  },
  props: {
    hours: Number,
    shopid: Number
  }
}
</script>
<style scoped>
  .choose-time-container {
    height: 100%;
    position: relative;
  }
  .choose-time {
    height: 100%;
    width: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling:touch;
    position: absolute;
    top: 0;
    padding-bottom: 50px;
    box-sizing: border-box;
  }
</style>
