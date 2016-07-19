<style lang="sass">
@import '../assets/css/style.scss'
</style>
<template>
<div class="evaluation-list">
  <evaluation :evaluation ="evaluation" v-for="evaluation in evaluations"></evaluation>
</div>
</template>
<script>
import Evaluation from '../components/Evaluation'
import utils from '../js/utils'
export default {
  data () {
    return {
      evaluations: [],
      barberId: '',
      delCommentId: ''
    }
  },
  ready () {
    let self = this
    self.barberId = utils.getUrlParam('id')
    self.$http.get(window.ctx + '/api/comment/list', {barberId: self.barberId, pageNo: 1, pageSize: 8}).then((response) => {
      let res = response.data
      if (res.code === 0) {
        self.$set('evaluations', res.result.result)
      }
    })
  },
  components: {
    Evaluation
  }
}
</script>
<style>
.evaluation-list {
  font-size: 1.4rem;
}
</style>
