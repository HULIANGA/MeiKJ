import Vue from 'vue'
import StoreDetail from '../app/StoreDetail'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.emulateJSON = true
/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { StoreDetail }
})
