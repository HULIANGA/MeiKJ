<template>
  <div class="toast placemiddle" transition="toast">
    <span class="toast-text">{{message}}</span>
  </div>
</template>
<script>
export default {
  props: {
    message: String
  }
}
</script>
<style>
.toast {
  position: fixed;
  max-width: 80%;
  color: #fff;
  max-width: 80%;
  border-radius: 5px;
  background: rgba(0,0,0,.7);
  box-sizing: border-box;
  text-align: center;
  padding: 10px;
  z-index: 1000;
}
.toast .toast-text {
  font-size: 14px;
  display: block;
  text-align: center;
}
.placemiddle {
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.toast-transition {
  transition: opacity .3s linear;
}
.toast-enter,.toast-leave {
  opacity: 0;
}
</style>
