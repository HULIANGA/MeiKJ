<style lang="sass">
@import '../assets/css/style.scss'
</style>

<template lang="html">
  <div class="pay-success">
    <img src="../assets/img/pay-success.jpg" alt="支付成功">
    <template v-if="token">
      <p class="success-text">支付成功</p>
      <a href="userCenter.html">返回个人中心</a>
    </template>
    <template v-else>
      <p class="success-text">支付成功，请到微信客户端查看您的订单信息</p>
    </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      token: localStorage.token
    }
  },
  computed: {},
  ready () {},
  attached () {},
  methods: {},
  components: {}
}
</script>

<style lang="css">
  body {
    background: #efefef;
  }
  .pay-success {
    border-radius: 5px;
    background: #fff;
    border: 1px solid #ff6251;
    margin: 20px;
    overflow: hidden;
    padding: 30px;
  }
  .pay-success img {
    width: 50px;
    display: block;
    margin: 0 auto 20px;
  }
  .pay-success p {
    text-align: center;
  }
  .pay-success a {
    text-align: center;
    color: #ff6251;
    display: block;
    font-size: 14px;
    margin-top: 10px;
  }
</style>
