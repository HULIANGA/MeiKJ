import Vue from 'vue'
import ApointmentOffline from '../app/ApointmentOffline.vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.timeout = 30000
/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: {
    ApointmentOffline
  }
})
