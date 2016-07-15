import Vue from 'vue'
import Regist from '../app/Regist'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.emulateJSON = true
Vue.directive('disable', function (value) {
  this.el.disabled = !!value
})
/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { Regist }
})
