<style lang="sass">
@import '../assets/css/style.scss'
</style>

<template>
  <div class="hair-filter">
    <a :class="currentClassId === 2 ? 'active' : ''" @click="setHairFirstData(2)">女士</a>
    <a :class="currentClassId === 1 ? 'active' : ''" @click="setHairFirstData(1)">男士</a>
    <a :class="currentClassId === 3 ? 'active' : ''" @click="setHairFirstData(3)">儿童</a>
    <a :class="currentClassId === 4 ? 'active' : ''" @click="setHairFirstData(4)">明星</a>
  </div>
  <div class="hair-filter-back"></div>
  <div class="all-hair">
    <fashion-hair :hairitems="hairItems"></fashion-hair>
  </div>
  <no-result v-show="noresult" :text=""></no-result>
  <loading :show="loading.show"></loading>
</template>
<script>
import FashionHair from '../components/FashionHair'
import Loading from '../components/Loading'
import NoResult from '../components/NoResult'
import toast from '../js/toast.js'

export default {
  data () {
    return {
      loading: {
        show: true
      },
      noresult: false,
      hairItems: [],
      searchPageParam: {
        pageNo: 1,
        pageSize: 20,
        hairstyleClassId: 1
      },
      currentClassId: null,
      hasMoreData: true
    }
  },
  created () {
    this.setHairFirstData(2)
  },
  ready: function () {
    let self = this
    window.onscroll = function () {
      let container = document.querySelector('body')
      // let laschild = document.querySelectorAll('.store-item')[document.querySelectorAll('.store-item').length - 1]
      if (self.hasMoreData && (window.screen.height + window.scrollY) >= container.offsetHeight
    ) {
        self.setMoreData()
      }
    }
  },
  methods: {
    setHairFirstData: function (id, getMoreData) {
      let self = this
      self.loading.show = true
      self.noresult = false
      self.hasMoreData = true
      if (id === self.currentClassId) {
        self.loading.show = false
        return false
      }else {
        self.currentClassId = id
      }
      self.searchPageParam.hairstyleClassId = self.currentClassId
      self.searchPageParam.pageNo = 1
      document.querySelector('html').style.overflowY = 'hidden'
      self.$http.get(window.ctx + '/api/hairstyle/list', self.searchPageParam).then((response) => {
        document.querySelector('html').style.overflowY = 'auto'
        self.loading.show = false
        let res = response.data
        if (res.code === 0) {
          document.querySelector('body').scrollTop = 0
          self.$set('hairItems', res.result.result)
          if (!res.result.result || res.result.result.length === 0) {
            self.noresult = true
            self.hasMoreData = false
          }else if (res.result.result.length < self.searchPageParam.pageSize) {
            self.noresult = false
            self.hasMoreData = false
          }else {
            self.noresult = false
            self.hasMoreData = true
          }
        }else {
          self.noresult = true
        }
      }, (response) => {
        self.loading.show = false
        document.querySelector('html').style.overflowY = 'auto'
        self.noresult = true
      })
    },
    setMoreData: function () {
      let self = this
      self.searchPageParam.pageNo = self.searchPageParam.pageNo + 1
      self.loading.show = true
      document.querySelector('html').style.overflowY = 'hidden'
      self.$http.get(window.ctx + '/api/hairstyle/list', self.searchPageParam).then((response) => {
        self.loading.show = false
        document.querySelector('html').style.overflowY = 'auto'
        let res = response.data
        if (res.code === 0) {
          self.hairItems = self.hairItems.concat(res.result.result)
          if (!res.result.result || res.result.result.length === 0) {
            toast('没有更多数据了')
            self.hasMoreData = false
          }else if (res.result.result.length < self.searchPageParam.pageSize) {
            self.hasMoreData = false
          }
        }else {
          toast('加载失败')
        }
      }, (response) => {
        self.loading.show = false
        document.querySelector('html').style.overflowY = 'auto'
        toast('加载失败')
      })
    }
  },
  components: {
    FashionHair,
    Loading,
    NoResult
  }
}
</script>
<style>
.hair-filter {
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  border-bottom: 1px solid #dbdbdb;
  background: #ffffff;
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  z-index: 999;
}
.hair-filter-back {
  height: 50px;
}
.hair-filter>a {
  position: relative;
  float: left;
  width: 25%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 1.4rem;
}
.hair-filter>a::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  display: none;
  height: 3px;
  background-color: #ff7162;
}
.hair-filter>a.active::after {
  display: block;
}
.hair-filter>a.active {
  color:#ff7162;
}
.all-hair {
  padding: 7px 10px;
}
.all-hair .hair-item {
  padding:5px;
}
.all-hair .hair-like {
  position: absolute;
  right: 5px;
  bottom: 5px;
  background-color: rgba(0,0,0,.4);
  color: #fff;
  background-image: url(../assets/img/good-white.png);
}
</style>
