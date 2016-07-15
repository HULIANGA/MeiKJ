<style lang="sass">
@import '../assets/css/style.scss'
</style>

<template>
  <div class="hair-filter">
    <a :class="currentClassId === 1 ? 'active' : ''" @click="getHairData(1)">男士</a>
    <a :class="currentClassId === 2 ? 'active' : ''" @click="getHairData(2)">女士</a>
    <a :class="currentClassId === 3 ? 'active' : ''" @click="getHairData(3)">儿童</a>
    <a :class="currentClassId === 4 ? 'active' : ''" @click="getHairData(4)">明星</a>
  </div>
  <div class="all-hair">
    <fashion-hair :hairitems="hairItems"></fashion-hair>
  </div>
  <loading :show="loading.show"></loading>
  <no-result v-show="noresult" :text=""></no-result>
</template>
<script>
import FashionHair from '../components/FashionHair'
import Loading from '../components/Loading'
import NoResult from '../components/NoResult'

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
        pageSize: 16,
        hairstyleClassId: 1
      },
      currentClassId: null
    }
  },
  created () {
    this.getHairData(1)
  },
  methods: {
    getHairData: function (id, getMoreData) {
      let self = this
      self.loading.show = true
      self.noresult = false
      if (id === self.currentClassId) {
        return false
      }else {
        self.currentClassId = id
      }
      self.searchPageParam.hairstyleClassId = self.currentClassId
      self.$http.get(window.ctx + '/api/hairstyle/list', self.searchPageParam).then((response) => {
        self.loading.show = false
        let res = response.data
        if (res.code === 0) {
          self.$set('hairItems', res.result.result)
          if (!res.result.result || res.result.result.length === 0) {
            self.noresult = true
          }
        }else {
          self.noresult = true
        }
      }, (response) => {
        self.loading.show = false
        self.noresult = true
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
