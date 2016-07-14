<style lang="sass">
@import '../assets/css/style.scss'
</style>
<template>
<div class="evaluation-list">
  <evaluation :evaluations="evaluations"></evaluation>
</div>
</template>
<script>
import Evaluation from '../components/Evaluation'
import utils from '../libs/utils'
export default {
  data () {
    return {
      evaluations: [],
      barberId: ''
    }
  },
  ready () {
    let self = this
    self.barberId = utils.getUrlParam('id')
    self.$http.get('/api/comment/list', {barberId: self.barberId, pageNo: 2, pageSize: 8}).then((response) => {
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
