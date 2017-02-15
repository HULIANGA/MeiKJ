import Vue from 'vue'
import exchangeCoupon from '../app/exchangeCoupon'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.timeout = 30000
Vue.http.options.emulateJSON = true
/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { exchangeCoupon }
})
