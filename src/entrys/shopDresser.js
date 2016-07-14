import Vue from 'vue'
import ShopBarbers from '../app/ShopBarbers'
import VueResource from 'vue-resource'
Vue.use(VueResource)
/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { ShopBarbers }
})
