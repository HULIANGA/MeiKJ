<template>
  <div v-show="show" id="wxloading" class="loading">
    <div class="loading-inner">
      <i class="loading-icon"></i>
      <span v-if="showText">{{showText}}</span>
      <span v-else>加载中</span>
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
<style scoped>
.loading {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loading .loading-inner {
  background-color: rgba(0,0,0,.5);
  color: #fff;
  border-radius: 6px;
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 46px 13px 5px;
  position: relative;
}
.loading .loading-icon {
  width: 24px;
  height: 24px;
  border: 2px solid #fff;
  border-radius: 50%;
  animation: gif 1s infinite linear;
  position: absolute;
  left: 50%;
  margin-left: -13px;
  top: 10px;
  border-right-color: transparent;
  border-bottom-color: transparent;
}
@keyframes gif {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
