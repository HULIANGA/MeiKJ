<style lang="sass">
@import '../assets/css/swiper.scss'
</style>
<template>
  <div class="swiper-container" id="swiperDate">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in items">
        <div class="date-item" v-bind:class="{'active': ($index === active)}" @click.prevent = "chooseDate($index, item)">
          <p>{{item.week}}</p>
          <p>{{item.date}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from 'swiper'
export default {
  props: {
    items: Array,
    active: {
      type: Number,
      default: 0
    }
  },
  ready () {
    /* eslint-disable no-new */
    new Swiper('#swiperDate', {
      freeMode: true,
      slidesPerView: 'auto'
    })
  },
  methods: {
    chooseDate (index, el) {
      this.active = index
    }
  }
}
</script>
<style>
.swiper-container {
  height: 50px;
  background-color: #fff;
  border-bottom: 1px solid #eaeaea;
  font-size: 1.5rem;
}
.swiper-slide {
  width: auto;
}
.date-item {
  padding: 9px 20px;
  height: 100%;
  box-sizing: border-box;
}
.date-item>p {
  line-height: 16px;
}
.date-item.active {
  background-color: #ff6251;
  color: #fff;
}
</style>
