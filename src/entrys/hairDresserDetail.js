import Vue from 'vue'
import HairDresserDetail from '../app/HairDresserDetail'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.emulateJSON = true
/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { HairDresserDetail }
})
