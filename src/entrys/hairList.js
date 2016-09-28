import Vue from 'vue'
import HairList from '../app/HairList'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.timeout = 30000
/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { HairList }
})
