import Vue from 'vue'
import OldRegist from '../app/OldRegist'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.emulateJSON = true
/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { OldRegist }
})
