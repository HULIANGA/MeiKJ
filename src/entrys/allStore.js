import Vue from 'vue'
import AllStore from '../app/AllStore'
import VueResource from 'vue-resource'
Vue.use(VueResource)
/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { AllStore }
})
