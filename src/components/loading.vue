<template>
  <div v-show="show" id="wxloading" class="loading">
    <div class="loading-inner">
      <i class="loading-icon"></i>{{text}}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    show: Boolean,
    showText: String
  },
  computed: {
    text: function () {
      if (this.showText) {
        return this.showText
      }else {
        return 'loading'
      }
    }
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
  z-index: 99999;
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
  padding: 46px 13px 10px;
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
  top: 15px;
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
</style>
