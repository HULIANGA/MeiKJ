import Vue from 'vue'
import WriteComment from '../app/WriteComment'
import VueResource from 'vue-resource'
Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { WriteComment }
})
