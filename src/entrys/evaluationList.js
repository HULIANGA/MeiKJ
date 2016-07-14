import Vue from 'vue'
import EvaluationList from '../app/EvaluationList'
import VueResource from 'vue-resource'
import utils from '../libs/utils'
Vue.use(VueResource)
Vue.http.options.emulateJSON = true
Vue.filter('datetime', function (value) {
  return utils.fmtDate(new Date(value), 'yyyy.MM.dd hh:mm')
})
/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { EvaluationList }
})
