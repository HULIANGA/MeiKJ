<style lang="sass">
  @import '../assets/css/style.scss'
</style>
<template>
<div class="choose-time">
  <div class="c-time-header">
    <header-date :items="items"></header-date>
  </div>

  <time-item :timelist="timeList"></time-item>
</div>
</template>
<script>
import HeaderDate from '../components/HeaderDate'
import TimeItem from '../components/TimeItem'
import utils from '../libs/utils'
export default {
  data () {
    return {
      items: null,
      timeList: window.timeList
    }
  },
  created () {
    let date = new Date()
    let curDate = date.getDate()
    const reserveDays = 10
    date.setFullYear(date.getFullYear(), date.getMonth() + 1, 1, 0, 0, 0)
    date.setDate(0)
    let allday = date.getDate()
    let nDate = new Date()
    let dateArr = []
    if (curDate + reserveDays > allday) {
      for (let i = curDate;i <= allday; i++) {
        let item = nDate.setFullYear(date.getFullYear(), date.getMonth(), i, 0, 0, 0)
        let week = ''
        if (i === curDate) {
          week = '今天'
          dateArr.push({ 'week': week, 'date': utils.fmtDate(new Date(item), 'M.dd')})
        } else if (i === (curDate + 1)) {
          week = '明天'
          dateArr.push({ 'week': week, 'date': utils.fmtDate(new Date(item), 'M.dd')})
        } else {
          week = utils.convertToWeek(new Date(item).getDay())
          dateArr.push({ 'week': week, 'date': utils.fmtDate(new Date(item), 'M.dd')})
        }
      }
      for (let i = 1;i < (curDate + 10 - allday);i++) {
        let item = nDate.setFullYear(date.getFullYear(), date.getMonth() + 1, i, 0, 0, 0)
        let week = utils.convertToWeek(new Date(item).getDay())
        dateArr.push({ 'week': week, 'date': utils.fmtDate(new Date(item), 'M.dd')})
      }
    } else {
      for (let i = curDate;i <= allday; i++) {
        let item = nDate.setFullYear(date.getFullYear(), date.getMonth(), i, 0, 0, 0)
        let week = ''
        if (i === curDate) {
          week = '今天'
          dateArr.push({ 'week': week, 'date': utils.fmtDate(new Date(item), 'M.dd')})
        } else if (i === (curDate + 1)) {
          week = '明天'
          dateArr.push({ 'week': week, 'date': utils.fmtDate(new Date(item), 'M.dd')})
        } else {
          week = utils.convertToWeek(new Date(item).getDay())
          dateArr.push({ 'week': week, 'date': utils.fmtDate(new Date(item), 'M.dd')})
        }
      }
    }
    let self = this
    self.items = dateArr
  },
  ready () {
  },
  components: {
    HeaderDate,
    TimeItem
  }
}
</script>
<style>
body {
  background-color: #eaeaea;
}
</style>
