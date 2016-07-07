import Vue from 'vue'
import Index from '../app/Index'
import VueResource from 'vue-resource'
Vue.use(VueResource)
/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { Index }
})
