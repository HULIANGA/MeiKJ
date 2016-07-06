import Vue from 'vue'
import Hair from '../app/Hair'
import VueResource from 'vue-resource'
Vue.use(VueResource)
/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { Hair }
})
