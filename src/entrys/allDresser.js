import Vue from 'vue'
import AllDresser from '../app/AllDresser'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.timeout = 30000
/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { AllDresser }
})
