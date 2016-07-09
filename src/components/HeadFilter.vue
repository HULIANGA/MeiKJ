<template lang="html">
  <div class="head-filter flex">
    <div class="one-filter flex-grow" @click="showSelect(filterIndex)" v-for="(filterIndex,searchItem) in searchitems">
      <div :class="['filter-content', showIndex === filterIndex ? 'active' : '']">
        <span v-if="searchIndex === filterIndex">{{searchText}}</span>
        <span v-else>{{searchItem.filterType }}</span>
      </div>
      <div :class="['filter-select', showIndex === filterIndex ? 'active' : '']">
        <div class="select-item" @click="filterSearch(searchValue.name, searchValue.id, filterIndex)" v-for="searchValue in searchItem.filterValue">
          {{searchValue.name}}
        </div>
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
      showIndex: null, // 显示第几个筛选条件
      searchText: null,
      searchIndex: null
    }
  },
  computed: {},
  ready: function () {
  },
  attached: function () {},
  methods: {
    showSelect: function (selectIndex) {
      if (selectIndex === this.showIndex) {
        this.showIndex = null
      }else {
        this.showIndex = selectIndex
      }
    },
    filterSearch: function (searchName, searchId, selectIndex) {
      this.searchText = searchName
      this.searchIndex = selectIndex
      this.$dispatch('go-search')
    }
  },
  components: {},
  props: {
    searchitems: Array
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
