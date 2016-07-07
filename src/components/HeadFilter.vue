<template lang="html">
  <div class="head-filter flex">
    <div class="one-filter flex-grow">
      <div class="filter-content">
        <span>门店</span>
      </div>
    </div>
    <div class="one-filter flex-grow">
      <div class="filter-content">
        <span>职位</span>
      </div>
    </div>
    <div class="one-filter flex-grow">
      <div class="filter-content">
        <span>区域</span>
      </div>
    </div>
    <div class="filter-search flex-no-shrink">
      <img src="../assets/img/hearFilter/search.png" alt="搜索" />
    </div>
  </div>
  <div class="head-filter-back">

  </div>
</template>

<script>
export default {
  data: function () {
    return {
    }
  },
  computed: {},
  ready: function () {
    // this.$http.get('/json/swiper.json').then(function (response) {
    //   this.$set('items', response.data)
    // }).catch(function (response) {
    //   console.log(response.data)
    // })
  },
  attached: function () {},
  methods: {},
  components: {}
}
</script>

<style lang="sass">
@import "../assets/css/flex.scss"
</style>
<style scoped>
.head-filter{
  height: 38px;
  border-bottom: 1px solid #eaeaea;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #ffffff;
  z-index: 1;
}
.one-filter{
  text-align: center;
}
.filter-content{
  height: 20px;
  line-height: 20px;
  margin-top: 9px;
  border-left: 1px solid #eaeaea;
}
.filter-content span{
  display: inline-block;
  padding: 0 17px;
  background-image: url(../assets/img/hearFilter/arrow-normal.png);
  background-repeat: no-repeat;
  background-position: right center;
  background-size: 13px auto;
  font-size: 1.4rem;
}
.head-filter .one-filter:first-child .filter-content{
  border-left: 0;
}
.head-filter-back{
  height: 39px;
}
.filter-search{
  background: #ff6251;
  width: 39px;
}
.filter-search img{
  width: 22px;
  margin: 8px;
}
</style>
