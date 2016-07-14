import Vue from 'vue'
import AllDresser from '../app/AllDresser'
import VueResource from 'vue-resource'
Vue.use(VueResource)
/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { AllDresser }
})
