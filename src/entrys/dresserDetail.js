import Vue from 'vue'
import DresserDetail from '../app/DresserDetail'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.emulateJSON = true
/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { DresserDetail }
})
