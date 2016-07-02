<template>
  <div role="tabpanel" class="tab-pane" v-bind:class="{hide:!show}" v-show="show" :transition="transition">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    props: {
      header: {
        type: String
      }
    },
    data () {
      return {
        index: 0,
        show: false
      }
    },
    computed: {
      show () {
        /*eslint-disable eqeqeq */
        return (this.$parent.active == this.index)
      },
      transition () {
        return this.$parent.effect
      }
    },
    created () {
      this.$parent.renderData.push({
        header: this.header
      })
    },
    ready () {
      for (var c in this.$parent.$children) {
        if (this.$parent.$children[c].$el === this.$el) {
          this.index = c
          break
        }
      }
    },
    beforeDestroy () {
      this.$parent.renderData.splice(this.index, 1)
    }
  }
</script>
