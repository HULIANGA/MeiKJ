<style lang="sass">
  @import '../assets/css/style.scss'
</style>

<template lang="html">
  <p class="title">{{title}}</p>
  <p class="content" v-for="text in content" v-html="text"></p>
</template>

<script>
export default {
  data: function () {
    return {
    }
  },
  props: {
    title: String,
    content: Array
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  methods: {},
  components: {}
}
</script>

<style lang="css">
  body {
    background-image: url(../assets/img/staticback.png);
    background-repeat: no-repeat;
    background-size: cover;
    color: #ffffff;
  }
  .title {
    font-size: 14px;
    margin-top: 10px;
    line-height: 24px;
    padding: 0 25px;
    position: relative;
  }
  .title::before{
    content: '';
    display: block;
    background: #ff6251;
    width: 14px;
    height: 24px;
    position: absolute;
    left: 0;
    top: 0;
  }
  .content {
    font-size: 13px;
    padding: 6px 25px;
  }
</style>
