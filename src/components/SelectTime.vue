<template>
  <div class="choose-time">
    <header-date></header-date>
    <time-item :costhours="hours"></time-item>
    <button class="btn btn-reserve" @click="next()">已选好</button>
  </div>
</template>
<script>
import HeaderDate from '../components/HeaderDate'
import TimeItem from '../components/TimeItem'

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
