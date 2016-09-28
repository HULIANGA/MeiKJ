import Vue from 'vue'
import ShopBarbers from '../app/ShopBarbers'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.timeout = 30000
/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { ShopBarbers }
})
