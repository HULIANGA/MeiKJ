import Vue from 'vue'
import HairList from '../app/HairList'
import VueResource from 'vue-resource'
Vue.use(VueResource)
/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { HairList }
})
