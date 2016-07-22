import Vue from 'vue'
import MyOrder from '../app/MyOrder'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.emulateJSON = true
Vue.filter('dtime', function (val) {
  if (val < 10) {
    val = '0' + val
  }
  return val
})
/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { MyOrder }
})
