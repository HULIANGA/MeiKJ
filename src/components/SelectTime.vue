<template>
  <div class="choose-time">
    <div class="c-time-header">
      <header-date></header-date>
    </div>
    <time-item :timelist="timeList"></time-item>
    <button class="btn btn-reserve" @click="next()">已选好</button>
  </div>
</template>
<script>
import HeaderDate from '../components/HeaderDate'
import TimeItem from '../components/TimeItem'

export default {
  data () {
    return {
      items: null,
      timeList: window.timeList
    }
  },
  methods: {
    next: function () {
      this.$dispatch('next', {'fromStep': 'time'})
    }
  },
  created () {

  },
  ready () {
  },
  components: {
    HeaderDate,
    TimeItem
  }
}
</script>
