<template>
  <ul class="clearfix tab-list" role="tablist">
    <li v-for="r in renderData" v-bind:class="{ 'active' : ($index === active)}" @click.prevent = "handleTabListClick($index,r)">
      <a href="#">
        <slot name="header">
          {{ r.header}}
        </slot>
      </a>
    </li>
  </ul>
  <!--tab panes-->
  <div class="tab-content" v-el:tab-content>
    <slot></slot>
  </div>
</template>
<script>
  export default {
    props: {
      effect: {
        type: String,
        default: 'fadein'
      },
      active: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        renderData: []
      }
    },
    methods: {
      handleTabListClick (index, el) {
        this.active = index
        this.$dispatch('child-msg', this.active)
      }
    }
  }
</script>
<style scoped>
  .tab-list {
    display: flex;
    width:100%;
    height:40px;
    border-bottom: 1px solid #eaeaea;
    padding: 0 15px;
    box-sizing: border-box;
  }
  .tab-list>li {
    flex: 1;
    position: relative;
  }
  .tab-list>li>a {
    display: flex;
    color: #333;
    height: 40px;
    justify-content: center;
    align-items: center;
    font-size: 1.3rem;
  }
  .tab-list>li.active>a {
    color:#ff7162;
  }
  .tab-list>li::before {
    content:'';
    display:none;
    position:absolute;
    bottom:0;
    left:5px;
    right:5px;
    height:3px;
    background-color:#ff7162;
  }
  .tab-list>li.active::before {
    display:block;
  }
</style>
