<template>
  <div class="time-list clearfix">
    <div :data-time="timeItem.hour" :class="['time-item', timeItem.status !== 0 ? 'disable' : '', currentIndex.indexOf(index) !== -1 ? 'active' : '']" v-for="(index, timeItem) in timelist" @click.prevent="chooseTime(index, timeItem.status)">
      <div>
        <img src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==" style="width: 100%;" />
        <div>
          <p>{{timeItem.hour}}</p>
          <p v-if="timeItem.status == 0">
            可预约
          </p>
          <p v-if="timeItem.status == 1">
            已被预约
          </p>
          <p v-if="timeItem.status == 2">
            不可预约
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      currentIndex: [],
      timelist: null
    }
  },
  events: {
    'get-time-list': function (requestData) {
      this.$parent.$parent.loading.show = true
      this.$http.get(window.ctx + '/api/order/selectAppointment', requestData).then(function (response) {
        this.$parent.$parent.loading.show = false
        var res = response.data
        if (res.code === 0) {
          let tempList = res.result
          let startTime = tempList.startTime
          let startHour = parseInt(startTime.split(':')[0], 10)
          let startMinute = parseInt(startTime.split(':')[1], 10)
          let endTime = tempList.endTime
          let endHour = parseInt(endTime.split(':')[0], 10)
          let endMinute = parseInt(endTime.split(':')[1], 10)
          let startHalfHourCount = startHour * 2 + startMinute / 30 // 开始时间是第几个半小时
          let endHalfHourCount = endHour * 2 + endMinute / 30 // 结束时间是第几个半小时

          this.timelist = []
          let nowDate = new Date()
          nowDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate())
          let nowTime = nowDate.getTime() // 当前日期的时间戳
          let tempHalfHourCount = startHalfHourCount
          for (let i = 0; i <= (endHalfHourCount - startHalfHourCount); i++) {
            let tempItem = {}
            tempItem.status = tempList['time' + (i + 1)]
            let curHour = parseInt(tempHalfHourCount / 2, 10)
            let curMinute = tempHalfHourCount % 2 === 1 ? '30' : '00'
            if (curHour < 10) {
              tempItem.hour = '0' + curHour.toString() + ':' + curMinute
            }else {
              tempItem.hour = curHour.toString() + ':' + curMinute
            }
            let curHalfHourCount = new Date().getHours() * 2
            if (new Date().getMinutes() % 30 > 0) {
              curHalfHourCount++
            }
            if (nowTime === requestData.date && tempHalfHourCount <= curHalfHourCount) {
              tempItem.status = 2
            }
            this.timelist.push(tempItem)
            tempHalfHourCount++
          }
          this.resetList()
        }
      }, function (response) {
        this.$parent.$parent.loading.show = true
      })
    },
    'reset-select-time': function () {
      this.currentIndex = []
    }
  },
  computed: {

  },
  created: function () {

  },
  methods: {
    chooseTime: function (index, status) {
      if (status === 0) {
        if (this.currentIndex.indexOf(index) === -1) {
          this.currentIndex = []
          for (var i = 0; i < (this.costhours * 2); i++) {
            this.currentIndex.push(index + i)
          }
        }else {
          this.currentIndex = []
        }
      }
    },
    resetList: function () {
      for (let i = 0; i < this.timelist.length; i++) {
        if (i > (this.timelist.length - (this.costhours * 2))) { // 加上消耗的时间超过了结束时间，不可预约
          // this.timelist[i].status = 2
        }else {
          for (let j = 0; j < (this.costhours * 2); j++) { // 预约时间起之后costhour个小时有不可预约的时间，不可预约
            if (this.timelist[i].status === 0 && this.timelist[i + j].status !== 0) {
              this.timelist[i].status = 2
            }
          }
        }
      }
    }
  },
  props: {
    costhours: Number
  }
}
</script>
<style>
.time-list {
  padding: 5px 10px;
  background-color: #fff;
}
.time-item {
  display: inline-block;
  width: 25%;
  box-sizing: border-box;
  padding: 10px 5px;
  font-size: 1.3rem;
}
.time-item>div {
  border: 1px solid #333333;
  position: relative;
}
.time-item>div>div{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
.time-item.disable {
  color: #a6a6a6;
}
.time-item.disable>div {
  border-color: #a6a6a6;
}
.time-item.active {
  padding: 9px 4px;
  color: #ff6251;
}
.time-item.active>div {
  border-color: #ff6251;
  border-width: 2px;
  background-image: url(../assets/img/select-icon.png);
  background-repeat: no-repeat;
  background-position: right -1px;
  background-size: 24px;
}
</style>
