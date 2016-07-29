<style lang="sass">
@import '../assets/css/style.scss'
</style>
<template>
<div class="evaluation-list">
  <evaluation :evaluation ="evaluation" v-for="evaluation in evaluations"></evaluation>
</div>
<loading :show="loading.show" :show-text=""></loading>
</template>
<script>
import Evaluation from '../components/Evaluation'
import Loading from '../components/Loading'
import utils from '../js/utils'

export default {
  data () {
    return {
      loading: {
        show: true
      },
      evaluations: [],
      barberId: '',
      delCommentId: '',
      currentPage: 1,
      pageSize: 10,
      hasMoreData: true
    }
  },
  created () {
    this.barberId = utils.getUrlParam('id')
    this.getEvaluation(1, 10)
  },
  ready () {
    let self = this
    window.onscroll = function () {
      let container = document.querySelector('body')
      // let laschild = document.querySelectorAll('.store-item')[document.querySelectorAll('.store-item').length - 1]
      if (self.hasMoreData && (window.screen.height + window.scrollY) >= container.offsetHeight) {
        self.getEvaluation(self.currentPage + 1, self.pageSize)
      }
    }
  },
  methods: {
    getEvaluation: function (pageNo, pageSize) {
      let self = this
      self.loading.show = true
      self.currentPage = pageNo
      self.$http.get(window.ctx + '/api/comment/list', {barberId: self.barberId, pageNo: pageNo, pageSize: pageSize}).then((response) => {
        self.loading.show = false
        let res = response.data
        if (res.code === 0) {
          if (pageNo === 1) {
            self.$set('evaluations', res.result.result)
          }else {
            self.evaluations = self.evaluations.concat(res.result.result)
          }
          if (!res.result.result || res.result.result.length === 0) {
            self.hasMoreData = false
          }else if (res.result.result.length < self.pageSize) {
            self.hasMoreData = false
          }else {
            self.hasMoreData = true
          }
        }
      })
    }
  },
  components: {
    Evaluation,
    Loading
  }
}
</script>
<style>
.evaluation-list {
  font-size: 1.4rem;
}
</style>
