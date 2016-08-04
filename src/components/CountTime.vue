<template>
  <span>00</span>:<span>{{minute | dtime}}</span>:<span>{{second | dtime}}</span>
</template>
<script>
  export default {
    props: {
      ctime: Number
    },
    data () {
      return {
        paytime: 900000,
        nowtime: new Date().getTime(),
        minute: null,
        second: null
      }
    },
    created () {
      this.minute = Math.floor((this.ctime + this.paytime - this.nowtime) / 1000 / 60)
      this.minute = this.minute > 0 ? this.minute : 0
      this.second = Math.floor((this.ctime + this.paytime - this.nowtime) / 1000) % 60
      this.second = this.second > 0 ? this.second : 0
      let self = this
      if (this.minute > 0) {
        const countTime = setInterval(function () {
          self.second = self.second - 1
          if (self.second === 0) {
            if (self.minute !== 0) {
              self.second = 59
              self.minute = self.minute - 1
            } else {
              clearInterval(countTime)
            }
          }
        }, 1000)
      }
    }
  }
</script>
