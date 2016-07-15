import Vue from 'vue'
import CouponStore from '../app/CouponStore'
import VueResource from 'vue-resource'
Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { CouponStore }
})
