import Vue from 'vue'
import Regist from '../app/regist'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.emulateJSON = true
/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { Regist }
})
