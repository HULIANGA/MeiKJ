import Vue from 'vue'
import Regist from '../app/Regist'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.timeout = 30000
Vue.http.options.emulateJSON = true
/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { Regist }
})
