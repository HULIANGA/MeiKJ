<template lang="html">
  <div class="noresult">
    <img src="../assets/img/no-result.png" alt="no-result" />
    <p v-if="text">
      {{text}}
    </p>
    <p v-else>
      暂时没有数据哦
    </p>
  </div>
</template>

<script>
export default {
  data: function () {
    return {

    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  methods: {},
  components: {},
  props: {
    text: String
  }
}
</script>

<style scoped lang="css">
  .noresult {
    margin-top: 150px;
    text-align: center;
  }
  .noresult img {
    width: 15%;
  }
  .noresult p {
    margin-top: 10px;
    font-size: 1.4rem;
    color: #828282;
  }
</style>
