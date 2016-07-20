<template lang="html">
  <div class="head-filter flex">
    <div class="one-filter flex-grow" @click="showSelect(filterIndex)" v-for="(filterIndex,searchItem) in searchitems.filters">
      <div :class="['filter-content', showIndex === filterIndex ? 'active' : '']">
        <span>{{searchItem.name }}</span>
      </div>
      <div :class="['filter-select', showIndex === filterIndex ? 'active' : '']">
        <div :class="['select-item', selectIndex[filterIndex] === '' ? 'active' : '']" @click="filterSearch(searchItem.name, '', searchItem.param, filterIndex, '')">全部</div>
        <div :class="['select-item', valueIndex === selectIndex[filterIndex] ? 'active' : '']" @click="filterSearch(searchValue.name, searchValue.id, searchItem.param, filterIndex, valueIndex)" v-for="(valueIndex, searchValue) in searchItem.values">
          {{searchValue.name}}
        </div>
      </div>
    </div>
    <!-- <div class="one-filter flex-grow" v-if="searchitems.areas" @click="showAreas()">
      <div class="filter-content">
        <span v-if="localCity">{{localCity}}</span>
        <span v-else>区域</span>
      </div>
    </div> -->
    <div v-if="searchitems.search" class="filter-search flex-no-shrink" @click="showSearchPage()">
      <img src="../assets/img/hearFilter/search.png" alt="搜索" />
    </div>
  </div>
  <div class="head-filter-back">

  </div>
  <!-- <city-select v-ref:city :localcity="localCity"></city-select> -->
  <search v-ref:search></search>
</template>

<script>
// import CitySelect from '../components/CitySelect'
import Search from '../components/Search'
import cityJson from '../libs/area.js'

export default {
  data: function () {
    return {
      showIndex: null, // 显示第几个筛选条件
      selectIndex: []
    }
  },
  props: {
    searchitems: Object,
    locacitycode: Number
  },
  computed: {
    searchParams: function () {
      var tempObj = {}
      for (var i = 0; i < this.searchitems.filters.length; i++) {
        tempObj[this.searchitems.filters[i].param] = ''
      }
      tempObj.keywords = ''
      return tempObj
    },
    localCity: function () {
      for (let i = 0; i < cityJson.data.row.length; i++) {
        if (parseInt(cityJson.data.row[i].area_id, 10) === this.locacitycode) {
          return cityJson.data.row[i].area_name
        }
      }
    }
  },
  created: function () {
    for (let i = 0; i < this.searchitems.filters.length; i++) {
      this.selectIndex.push('')
    }
  },
  ready: function () {
    // 绑定hashchange事件
    var self = this
    window.onhashchange = function () {
      var hash = window.location.hash
      if (hash === '') {
        self.$refs.search.show = false
        // self.$refs.city.showFirst = false
        // self.$refs.city.showSecond = false
      }else if (hash === '#showSearch') {
        self.$refs.search.show = true
      }
      // else if (hash === '#showSecond') {
      //   self.$refs.city.showFirst = false
      //   self.$refs.city.showSecond = true
      // }else if (hash === '#showFirst') {
      //   self.$refs.city.showFirst = true
      //   self.$refs.city.showSecond = false
      // }
    }
  },
  attached: function () {},
  events: {
    'select-city': function (area) {
      this.localCity = area.name
      this.searchParams.cityCode = parseInt(area.id, 10)
      this.$dispatch('go-search', this.searchParams)
    },
    'get-search-value': function (value) {
      this.searchParams.keywords = value
      this.$dispatch('go-search', this.searchParams)
    }
  },
  methods: {
    showSelect: function (filterIndex) {
      if (filterIndex === this.showIndex) {
        this.showIndex = null
      }else {
        this.showIndex = filterIndex
      }
    },
    filterSearch: function (searchName, searchId, param, filterIndex, valueIndex) {
      document.querySelectorAll('.one-filter .filter-content span')[filterIndex].textContent = searchName
      this.searchParams[param] = searchId
      this.selectIndex.$set(filterIndex, valueIndex)
      this.$dispatch('go-search', this.searchParams)
    },
    // showAreas: function () {
    //   window.location.hash = 'showFirst'
    // },
    showSearchPage: function () {
      window.location.hash = '#showSearch'
    }
  },
  components: {
    // CitySelect,
    Search
  }
}
</script>

<style>
@import "../assets/css/flex.scss";
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
  position: relative;
}
.filter-content{
  height: 20px;
  line-height: 20px;
  margin-top: 9px;
  border-left: 1px solid #eaeaea;
}
.filter-content.active span{
  background-image: url(../assets/img/hearFilter/arrow-active.png);
  color: #FF7B6D;
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
.filter-select{
  display: none;
  position: absolute;
  top: 39px;
  background: #ffffff;
  min-width: 100%;
  padding: 0 5px;
  box-sizing: border-box;
  border-bottom: 1px solid #eaeaea;
  border-right: 1px solid #eaeaea;
  border-left: 1px solid #eaeaea;
}
.filter-select.active{
  display: block;
}
.select-item{
  line-height: 30px;
  border-bottom: 1px solid #eaeaea;
  font-size: 1.2rem;
}
.select-item.active{
  color: #FF7B6D;
}
.filter-select .select-item:last-child{
  border-bottom: 0;
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
