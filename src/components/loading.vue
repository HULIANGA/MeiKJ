<template>
  <div v-show="show" id="wxloading" class="loading">
    <div class="loading-inner">
      <i class="loading-icon"></i>{{showText}}...
    </div>
  </div>
</template>
<script>
export default {
  props: {
    show: Boolean,
    showText: String
  }
}
</script>
<style>
.loading {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0);
  z-index: 9999;
}
.loading .loading-inner {
  text-align: center;
  background-color: rgba(0,0,0,.5);
  color: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -70px;
  margin-top: -40px;
  border-radius: 6px;
  font-size: 1.4rem;
  padding: 58px 0 10px 0;
}
.loading .loading-icon {
  position: absolute;
  top: 15px;
  left: 50%;
  margin-left: -16px;
  width: 24px;
  height: 24px;
  border: 2px solid #fff;
  border-radius: 50%;
  animation: gif 1s infinite linear;
  -webkit-animation: gif 1s infinite linear;
  clip: rect(0 auto 12px 0);
}
@keyframes gif {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes gif{
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>
