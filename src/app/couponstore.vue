<style lang="sass">
@import '../assets/css/style.scss'
</style>
<template>
  <div class="coupon-store">
    <head-filter :searchitems="searchItems"></head-filter>
    <div class="coupon-list">
      <div class="coupon-item"  v-for="item in items">
        <div class="coupon-subitem" @click.prevent="showCouponDetail(item.id)">
          <div class="c-left">
              <p class="coupon-price" v-if="item.type == 1">{{ item.discount / 10}}折</p>
              <p class="coupon-price" v-if="item.type == 2">&yen;{{ item.money}}</p>
              <p class="coupon-limit" v-if="item.type == 2">（满{{item.line}}可用）</p>
              <p class="coupon-price" v-if="item.type == 3">&yen;{{ item.quota}}</p>
          </div>
          <div class="c-right">
            <h3>{{item.name}}</h3>
            <p class="coupon-time">{{item.startTime}} - {{item.endTime}}</p>
          </div>
        </div>
        <div class="coupon-control">
          <button class="btn btn-coupon" @click.prevent="getCoupon(item.id)">领取</button>
        </div>
      </div>
    </div>
    <no-result v-show="noresult" :text=""></no-result>
    <loading :show="loading.show" :show-text=""></loading>
    <detail-modal :show.sync="showDetail">
      <div slot="detail-modal-header" class="detail-modal-header">
        <h4 class="detail-modal-title">
          {{couponDetail.name}}
        </h4>
      </div>
      <div slot="detail-modal-body" class="detail-modal-body">
        <div class="coupon-detail-list">
          <h5><i></i>适用门店</h5>
          <p><span>{{couponDetail.shopName}}</span></p>
          <h5><i></i>适用职位</h5>
          <p>{{couponDetail.positionName}}</p>
          <h5><i></i>适用项目</h5>
          <p><span>{{couponDetail.projectName}}</span></p>
          <h5><i></i>适用城市</h5>
          <p>{{couponDetail.cityName}}</p>
        </div>
      </div>
    </detail-modal>
    <dialog :show.sync="dialog.show" :title="dialog.title" :is-B.sync="dialog.isB" :ok-text="dialog.okText" :cancel-text="dialog.cancelText" :callback="dialog.callback"></dialog>
  </div>
</template>
<script>
import Loading from '../components/Loading'
import HeadFilter from '../components/HeadFilter'
import NoResult from '../components/NoResult'
import DetailModal from '../components/DetailModal'
import toast from '../js/toast'
import utils from '../js/utils'
import Dialog from '../components/Dialog'
export default {
  data () {
    return {
      loading: {
        show: true
      },
      dialog: {
        isB: false,
        show: false,
        title: '',
        cancelText: '关闭',
        okText: '立即使用',
        callback: null
      },
      searchItems: {
        filters: []
      },
      baseRequsetData: {
        pageNo: 1,
        pageSize: 10
      },
      hasMoreData: true,
      items: null,
      noresult: false,
      token: localStorage.getItem('token'),
      showDetail: false,
      couponDetail: {}
    }
  },
  created () {
    // 门店列表
    this.getStoreList(localStorage.cityCode)
    // 职位列表
    this.getPositionList()
    // 获取项目列表
    this.getProjectList()
    // 获取优惠券列表
    this.getCouponFirstList()
    // this.dialog.button.mystyle.display = 'none'
  },
  ready: function () {
    let self = this
    window.onscroll = function () {
      let container = document.querySelector('body')
      // let laschild = document.querySelectorAll('.store-item')[document.querySelectorAll('.store-item').length - 1]
      if (self.hasMoreData && (window.screen.height + window.scrollY) >= container.offsetHeight) {
        self.setMoreData()
      }
    }
  },
  events: {
    'go-search': function (searchData) {
      console.log(searchData)
      this.getCouponFirstList(searchData)
    }
  },
  methods: {
    getCouponFirstList: function (requestData) {
      let self = this
      let extendRequestData = utils.extendObj(self.baseRequsetData, requestData)
      if (!extendRequestData.cityCode) {
        extendRequestData.cityCode = localStorage.cityCode
      }
      extendRequestData.pageNo = 1
      self.baseRequsetData = extendRequestData
      console.log('setFirstData：')
      console.log(self.baseRequsetData)
      // 获取优惠券列表
      self.loading.show = true
      document.querySelector('html').style.overflowY = 'hidden'
      self.$http.get(window.ctx + '/api/coupon/allList', extendRequestData).then((response) => {
        document.querySelector('html').style.overflowY = 'auto'
        self.loading.show = false
        let res = response.data
        if (res.code === 0) {
          document.querySelector('body').scrollTop = 0
          self.$set('items', res.result.result)
          if (!res.result.result || res.result.result.length === 0) {
            self.noresult = true
            self.hasMoreData = false
          }else if (res.result.result.length < self.baseRequsetData.pageSize) {
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
        self.noresult = true
        document.querySelector('html').style.overflowY = 'auto'
        self.loading.show = false
      })
    },
    setMoreData: function () {
      let self = this
      self.baseRequsetData.pageNo = self.baseRequsetData.pageNo + 1
      self.loading.show = true
      document.querySelector('html').style.overflowY = 'hidden'
      console.log('getmoredata：')
      console.log(self.baseRequsetData)
      self.$http.get(window.ctx + '/api/coupon/allList', self.baseRequsetData).then((response) => {
        self.loading.show = false
        document.querySelector('html').style.overflowY = 'auto'
        let res = response.data
        if (res.code === 0) {
          self.items = self.items.concat(res.result.result)
          if (!res.result.result || res.result.result.length === 0) {
            toast('没有更多数据了')
            self.hasMoreData = false
          }else if (res.result.result.length < self.baseRequsetData.pageSize) {
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
    },
    getStoreList: function (citycode) {// 获取门店列表
      this.$http.get(window.ctx + '/api/shop/allList', {'cityCode': citycode}).then(function (response) {
        let res = response.data
        if (res.code === 0) {
          let tempFilter = {
            'name': '门店',
            'param': 'shopId',
            'values': res.result
          }
          this.searchItems.filters.$set(0, tempFilter)
        }else {
          toast('获取门店列表失败')
        }
      }, function (response) {
        toast('获取门店列表失败')
      })
    },
    getPositionList: function () {// 获取职位列表
      this.$http.get(window.ctx + '/api/position/list').then(function (response) {
        let res = response.data
        if (res.code === 0) {
          let tempFilter = {
            'name': '职位',
            'param': 'positionId',
            'values': res.result
          }
          this.searchItems.filters.$set(1, tempFilter)
        }else {
          toast('获取职位列表失败')
        }
      }, function (response) {
        toast('获取职位列表失败')
      })
    },
    getProjectList: function () {// 获取项目列表
      this.$http.get(window.ctx + '/api/order/selectProject').then(function (response) {
        let res = response.data
        if (res.code === 0) {
          let tempFilter = {
            'name': '项目',
            'param': 'projectId',
            'values': res.result
          }
          this.searchItems.filters.$set(2, tempFilter)
        }else {
          toast('获取项目列表失败')
        }
      }, function (response) {
        toast('获取项目列表失败')
      })
    },
    getCoupon (couponId) {
      let self = this
      if (self.token && self.token !== '') {
        self.loading.show = true
        self.$http.post(window.ctx + '/api/coupon/t/receive', {couponId: couponId}, {headers: {token: self.token}}).then((response) => {
          let res = response.data
          self.loading.show = false
          if (res.code === 10007) {
            toast('登录已过期，请重新登录')
            setTimeout(function () {
              window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
            }, 1000)
          }else if (res.code === 10008) {
            toast('请先登录')
            setTimeout(function () {
              window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
            }, 1000)
          }else {
            self.dialog.callback = function () {
              window.goPage('apointment.html?couponId=' + couponId)
            }
            self.dialog.show = true
            let messageArray = res.message.split('，')
            self.dialog.title = ''
            for (var i = 0; i < messageArray.length; i++) {
              if (i === messageArray.length - 1) {
                self.dialog.title += '<p>' + messageArray[i] + '</p>'
              }else {
                self.dialog.title += '<p>' + messageArray[i] + '，</p>'
              }
            }
          }
        }, (response) => {
          self.loading.show = false
          toast('领取失败')
        })
      } else {
        toast('登录已过期，请重新登录')
        setTimeout(function () {
          window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
        }, 1000)
      }
    },
    showCouponDetail (couponId) {
      let self = this
      self.$http.post(window.ctx + '/api/coupon/detail', {couponId: couponId}).then((response) => {
        let res = response.data
        if (res.code === 0) {
          self.$set('couponDetail', res.result)
          self.showDetail = true
        }
      })
    }
  },
  components: {
    Loading,
    NoResult,
    DetailModal,
    HeadFilter,
    Dialog
  }
}
</script>
<style>
body {
  background-color: #eaeaea;
}
.coupon-store {
  background-color: #eaeaea;
}
.coupon-list {
  margin-left: 15px;
  margin-top: 10px;
}
.coupon-item {
  display: flex;
  height: 100px;
  margin-bottom: 15px;
}
.coupon-subitem {
  flex: 4;
  display: flex;
  padding: 10px 0;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  background-color: #fff;
  width: 80%;
}
.coupon-control {
  flex: 1;
  width: 20%;
  background-color: #ff6251;
  border-radius: 4px;
}
.coupon-control>button {
  background-color: #ff6251;
  width: 100%;
  height: 100px;
  line-height: 100px;
  background-image: url(../assets/img/coupon-edge.png);
  background-repeat: no-repeat;
  background-position: -5px center;
  background-size: 9px auto;
}
.coupon-subitem .c-left {
  flex: 1;
  width: 33.3333%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  padding: 10px 0;
}
.c-left::after {
  content: '';
  position: absolute;
  bottom: -16px;
  right: -7px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #eaeaea;
}
.coupon-subitem .c-right {
  position: relative;
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 66.6666%;
  padding: 10px 0;
  border-left: 1px dashed #a7a7a7;
}
.c-right::after {
  content: '';
  position: absolute;
  top: -16px;
  left: -6px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #eaeaea;
}
.coupon-price {
  font-size: 2rem;
  color: #ff6251;
  text-align: center;
}
.coupon-limit {
  font-size: 1.2rem;
  color: #ff6251;
  text-align: center;
}
.c-right>h3 {
  font-size: 1.6rem;
  text-align: center;
}
.c-right .coupon-time {
  font-size: 1.2rem;
  text-align: center;
  margin-top: 10px;
}
.coupon-store .detail-modal h5 {
  font-weight: normal;
  font-size: 1.4rem;
  margin: 10px auto;
  display: flex;
  align-items: center;
}
.coupon-store .detail-modal h5 i {
  display: inline-block;
  width: 5px;
  height: 8px;
  background-color: #ff6251;
  margin-right: 10px;
}
.coupon-store .coupon-detail-list {
  padding: 0 15px;
}
.coupon-store .coupon-detail-list p {
  font-size: 1.3rem;
  padding-left: 11px;
  color: #8f8e8e;
}
</style>
