<style lang="sass">
@import '../assets/css/swiper.scss'
</style>
<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <div :class="['date-item', index === currentIndex ? 'active' : '']" :data-time="dateItem.time" @click="selectDay(index, dateItem.time)" v-for="(index, dateItem) in dateItems | limitBy 5">
          <p>{{dateItem.dayStr}}</p>
          <p>{{dateItem.dateStr}}</p>
        </div>
      </div>
      <div class="swiper-slide">
        <div :class="['date-item', (index + 5) === currentIndex ? 'active' : '']" :data-time="dateItem.time" @click="selectDay((index + 5), dateItem.time)" v-for="(index, dateItem) in dateItems | limitBy 5 5">
          <p>{{dateItem.dayStr}}</p>
          <p>{{dateItem.dateStr}}</p>
        </div>
      </div>
    </div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>
<script>
import Swiper from 'swiper'

export default {
  data () {
    return {
      currentIndex: 0
    }
  },
  computed: {
    dateItems: function () {
      return this.dateSet()
    }
  },
  events: {
    'time-show': function () {
      /* eslint-disable no-new */
      this.$nextTick(function () {
        new Swiper('.swiper-container', {
          prevButton: '.swiper-button-prev',
          nextButton: '.swiper-button-next'
        })
      })
    },
    'date-set': function () {
      this.currentIndex = 0
      this.dateItems = this.dateSet()
    }
  },
  ready () {

  },
  methods: {
    selectDay: function (index, time) {
      if (this.currentIndex !== index) {
        this.currentIndex = index
        this.$dispatch('select-date', time)
      }
    },
    dateSet: function () {
      let dateItems = []
      let weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      let nowDate = new Date()
      nowDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate())
      let nowTime = nowDate.getTime()
      for (let i = 0; i < 10; i++) {
        let dayItem = {}
        dayItem.time = nowTime + i * 24 * 60 * 60 * 1000
        let dateItem = new Date(dayItem.time)
        dayItem.dateStr = dateItem.getMonth() + 1 + '.' + dateItem.getDate()
        if (i === 0) {
          dayItem.dayStr = '今天'
        }else if (i === 1) {
          dayItem.dayStr = '明天'
        }else {
          dayItem.dayStr = weeks[dateItem.getDay()]
        }
        dateItems.push(dayItem)
      }
      return dateItems
    }
  }
}
</script>
<style scoped>
.swiper-button-prev {
  width: 15px;
  left: 0;
  background-size: 8px;
}
.swiper-button-next.swiper-button-disabled, .swiper-button-prev.swiper-button-disabled {
  display: none;
}
.swiper-button-next {
  background-size: 8px auto;
  width: 15px;
  right: 0;
}
.swiper-container {
  height: 50px;
  background-color: #fff;
  border-bottom: 1px solid #eaeaea;
  font-size: 1.5rem;
}
.swiper-slide {
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
}
.date-item {
  padding: 5px 0;
  height: 100%;
  width: 20%;
  box-sizing: border-box;
  display: inline-block;
  text-align: center;
}
.date-item>p {
  line-height: 20px;
}
.date-item.active {
  background-color: #ff6251;
  color: #fff;
}
</style>
