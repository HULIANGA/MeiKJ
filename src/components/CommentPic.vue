<template>
  <div class="comment-pic" v-show="show" @click.prevent="close" transition="pic-fade">
    <div class="comment-content">
      <img :src="imagePath">
    </div>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      require: true,
      type: Boolean,
      twoWay: true
    },
    imagePath: {
      type: String,
      coerce: function (val) {
        if (val) {
          return 'http://meimeidou.qiniudn.com/' + val
        }
      }
    }
  },
  methods: {
    close (e) {
      if (e.target === e.currentTarget) {
        this.show = false
      }
    }
  }
}
</script>
<style>
.comment-pic {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background:rgba(0,0,0,.5);
  z-index: 1000;
  transition: opacity .5s ease;
}
.comment-content {
  position: relative;
  width: 80%;
  margin: 0 auto;
  top: 50%;
  transform: translateY(-50%);
  background-color: #fff;
  border-radius: 4px;
}
.pic-fade-enter,.pic-fade-leave {
  opacity: 0;
}
</style>
