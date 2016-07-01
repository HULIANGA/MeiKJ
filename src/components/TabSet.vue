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
    display: -webkit-box;
    display: flex;
    display: -webkit-flex;
    width:100%;
    height:40px;
  }
  .tab-list>li {
    -webkit-box-flex:1;
    flex: 1;
    -webkit-flex:1;
    position: relative;
  }
  .tab-list>li>a {
    display: -webkit-box;
    display: flex;
    display: -webkit-flex;
    color: #333;
    height: 40px;
    justify-content: center;
    -webkit-justify-content:center;
    align-items: center;
    -webkit-align-items:center;
    font-size: 1.5rem;
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
