<template lang="html">
  <div class="first-city-list" v-show="showFirst">
    <div class="local-city">
      当前城市：{{localcity}}
    </div>
    <div class="list-title">
      热门城市
    </div>
    <div class="city-list">
      <div @click="setCity(hotCity.area_id, cityData.secData[hotCity.area_id] ? true : false, hotCity.area_name)" :class="['list-item', cityData.secData[hotCity.area_id] ? 'has-sec' : '']" v-for="hotCity in cityData.hotData">
        {{hotCity.area_name}}
      </div>
    </div>
    <div class="list-title">
      全国各地
    </div>
    <div class="city-list">
      <div @click="setCity(firCity.area_id, cityData.secData[firCity.area_id] ? true : false, firCity.area_name)" :class="['list-item', cityData.secData[firCity.area_id] ? 'has-sec' : '']" v-for="firCity in cityData.firData">
        {{firCity.area_name}}
      </div>
    </div>
  </div>
  <div class="second-city-list" v-show="showSecond">
    <div class="city-list">
      <div @click="setCity(secCity.area_id, false, secCity.area_name)" class="list-item" v-for="secCity in cityData.secData[curFirstId]">
        {{secCity.area_name}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      showFirst: false, // 显示一级城市列表
      showSecond: false, // 显示二级城市列表
      curFirstId: '', // 当前一级城市id
      cityData: {
        hotData: [],
        firData: [],
        secData: {}
      }
    }
  },
  created: function () {
    this.$http.get(window.ctx + '/api/area/list').then(function (response) {
      if (response.data.code === 0) {
        var citys = response.data.result
        var tempCityData = {
          hotData: [],
          firData: [],
          secData: {}
        }
        for (var i = 0; i < citys.length; i++) {
          var city = citys[i]
          if (typeof (city.parent_id) !== 'undefined' && city.parent_id.toString() === '0') {// 一级城市，Array
            tempCityData.firData.push(city)
            if (city.area_id.toString() === '310000' || city.area_id.toString() === '110000' || city.area_id.toString() === '440000') {
              tempCityData.hotData.push(city)
            }
          }else if (city.parent_id && city.parent_id.toString().slice(2, 6) === '0000' && city.area_id.toString().slice(4, 6) === '00') {// 二级城市，JSON，key是parentid，value为parentid相同的city
            if (tempCityData.secData[city.parent_id.toString()]) {
              tempCityData.secData[city.parent_id.toString()].push(city)
            }else {
              tempCityData.secData[city.parent_id.toString()] = [city]
            }
          }
        }
        this.cityData = tempCityData
      }
    })
  },
  ready: function () {
    this.hashChange()
    // 绑定hashchange事件
    var self = this
    window.onhashchange = function () {
      self.hashChange()
    }
  },
  attached: function () {},
  methods: {
    hashChange: function () {
      var hash = window.location.hash
      if (hash === '') {
        this.showFirst = false
        this.showSecond = false
      }else if (hash === '#showSecond') {
        this.showFirst = false
        this.showSecond = true
      }else if (hash === '#showFirst') {
        this.showFirst = true
        this.showSecond = false
      }
    },
    setCity: function (areaId, hasSec, areaName) {
      if (hasSec) {
        window.location.hash = 'showSecond'
        this.curFirstId = areaId
      }else {
        window.location.hash = ''
        localStorage.cityName = areaName
        localStorage.cityCode = areaId
        this.$dispatch('select-city', {'name': areaName, 'id': areaId})
      }
    }
  },
  components: {},
  props: {
    localcity: String
  }
}
</script>

<style lang="css" scoped>
.first-city-list,.second-city-list{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling:touch;
  z-index: 999;
  background: #ffffff;
  font-size: 1.2rem;
}
.list-title{
  background: #eaeaea;
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  line-height: 30px;
  padding: 0 15px;
}
.city-list{
  padding-left: 15px;
}
.list-item{
  border-bottom: 1px solid #dddddd;
  line-height: 30px;
}
.first-city-list .city-list .list-item:last-child{
  border-bottom: 0;
}
.list-item.has-sec{
  background-image: url(../assets/img/arrow-right.png);
  background-size: 5px;
  background-repeat: no-repeat;
  background-position: right 10px center;
}
.local-city{
  line-height: 32px;
  padding: 0 10px;
  color: #FF8A90;
}
</style>
