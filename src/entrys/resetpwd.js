import Vue from 'vue'
import ResetPwd from '../app/ResetPwd'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.emulateJSON = true
/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { ResetPwd }
})
