<template lang="html">
  <select-item :items="serviceItem"></select-item>
</template>

<script>
import SelectItem from '../components/SelectItem'
export default {
  data: function () {
    return {
      serviceItem: null
    }
  },
  computed: {},
  ready: function () {
    this.$http.get('/api/order/selectProject').then(function (response) {
      var res = response.data
      if (res.code === 0) {
        this.serviceItem = res.result
      }
      console.log(this.serviceItem)
    })
  },
  attached: function () {},
  methods: {},
  components: {
    SelectItem
  }
}
</script>

<style lang="css">
</style>
