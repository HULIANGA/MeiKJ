<template>
  <div class="detail-modal">
    <div class="detail-modal-wrapper">
      <div class="detail-modal-content">
        <slot name="detail-modal-header">
          <div class="detail-modal-header">
            <h4 class="detail-modal-title">
              <slot name="title">
                {{title}}
              </slot>
            </h4>
          </div>
        </slot>
        <slot name="detail-modal-body">
          <div class="detail-modal-body"></div>
        </slot>
        <button class="close" @click.prevent="close"></button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    show: {
      require: true,
      type: Boolean
    }
  },
  ready () {
    this.$watch('show', function (val) {
      const el = this.$el
      if (val) {
        el.style.display = 'block'
      } else {
        el.style.display = 'none'
      }
    })
  },
  methods: {
    close () {
      this.show = false
    }
  }
}
</script>
<style>
.detail-modal {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: none;
  width: 100%;
  height: 100%;
  background:rgba(0,0,0,.5);
  z-index: 1000;
}
.detail-modal-wrapper {
  position: relative;
  width: 90%;
  margin: 0 auto;
  font-size: 1.6rem;
  top: 50%;
  transform: translateY(-50%);
}
.detail-modal-content {
  position: relative;
  background: #fff;
  border-radius: 3px;
  overflow: hidden;
}
.detail-modal-header {
  position: relative;
  background: #ff6251;
  color: #fff;
  height: 36px;
  line-height: 36px;
  text-align: center;
}
.detail-modal .close {
  display: block;
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #ff6251;
  margin: 10px auto;
}
.detail-modal .close::before,.detail-modal .close::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%) rotate(45deg);
  -webkit-transform: translate(-50%,-50%) rotate(45deg);
  background-color: #fff;
}
.detail-modal .close::before {
  width: 3px;
  height: 18px;
}
.detail-modal .close::after {
  height: 3px;
  width: 18px;
}
.detail-modal-transition {
  animation-duration: 1s;
  animation-fill-mode: both;
}
.detail-modal-enter {
  animation-name: fadeInDown
}
.detail-modal-leave {
  animation-name: fadeOutUp
}
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translate3d(0,-100%, 0);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes fadeOutUp {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translate3d(0,-100%,0);
  }
}
</style>
