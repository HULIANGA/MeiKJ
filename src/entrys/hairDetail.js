import Vue from 'vue'
import HairDetail from '../app/HairDetail'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.emulateJSON = true
/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { HairDetail }
})
