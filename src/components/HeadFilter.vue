<template lang="html">
  <div class="head-filter">
    <div class="one-filter" @click="showSelect(filterIndex)" v-for="(filterIndex,searchItem) in searchitems.filters" track-by="$index" v-if="searchItem">
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
    <div v-if="searchitems.search" class="filter-search" @click="showSearchPage()">
      <img src="../assets/img/hearFilter/search.png" alt="搜索" />
    </div>
  </div>
  <div class="head-filter-back">

  </div>
  <search v-ref:search></search>
</template>

<script>
import Search from '../components/Search'

export default {
  data: function () {
    return {
      showIndex: null, // 显示第几个筛选条件
      selectIndex: []
    }
  },
  props: {
    searchitems: Object
  },
  computed: {
    searchParams: function () {
      var tempObj = {}
      for (var i = 0; i < this.searchitems.filters.length; i++) {
        tempObj[this.searchitems.filters[i].param] = ''
      }
      tempObj.keywords = ''
      return tempObj
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
      }else if (hash === '#showSearch') {
        self.$refs.search.show = true
      }
    }
  },
  attached: function () {},
  events: {
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
    showSearchPage: function () {
      window.location.hash = '#showSearch'
    }
  },
  components: {
    Search
  }
}
</script>

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
  display: flex;
}
.one-filter{
  text-align: center;
  position: relative;
  padding: 9px 0;
  flex-grow: 1;
}
.filter-content{
  height: 20px;
  line-height: 20px;
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
  max-height: 300px;
  overflow-y: auto;
  -webkit-overflow-scrolling:touch;
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
  flex-shrink: 0;
}
.filter-search img{
  width: 22px;
  margin: 8px;
}
</style>
