import Vue from 'vue'
import PaySuccess from '../app/PaySuccess'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.timeout = 30000
/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { PaySuccess }
})
