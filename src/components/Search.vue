<template lang="html">
  <div class="searchPage" v-if="show">
    <div>
      <input id="searchValue" v-model="searchValue" @keyup.enter="search()" placeholder="请输入关键字">
      <button type="button" name="button" class="btn-primary" @click="search()">点击搜索</button>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      searchValue: ''
    }
  },
  computed: {},
  ready: function () {
    // 绑定hashchange事件
    var self = this
    if (window.location.hash === '#showSearch') {
      self.show = true
    }
    window.onhashchange = function () {
      var hash = window.location.hash
      if (hash === '') {
        self.show = false
      }else if (hash === '#showSearch') {
        self.show = true
      }
    }
  },
  props: {
    show: false
  },
  attached: function () {},
  methods: {
    search: function () {
      window.location.hash = ''
      this.$dispatch('get-search-value', this.searchValue)
    }
  },
  components: {}
}
</script>

<style scoped lang="css">
  .searchPage {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 999;
    background: #ffffff;
  }
  .searchPage>div {
    position: relative;
    padding: 10px 100px 10px 15px;
  }
  .searchPage>div>input {
    width: 100%;
    border: 1px solid #eaeaea;
    line-height: 24px;
    border-radius: 5px;
    font-size: 1.4rem;
    padding: 3px 10px;
    box-sizing: border-box;
  }
  .searchPage>div>button {
    font-size: 1.4rem;
    width: 80px;
    position: absolute;
    right: 10px;
    top: 10px;
  }
</style>
