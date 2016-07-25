<template>
  <div class="modal">
    <div class="modal-wrapper">
      <div class="modal-content">
        <slot name="modal-header">
          <div class="modal-header">
            <button class="close" @click.prevent="close"></button>
            <h4 class="modal-title">
              <slot name="title">
                {{title}}
              </slot>
            </h4>
          </div>
        </slot>
        <slot name="modal-body">
          <div class="modal-body"></div>
        </slot>
        <slot name="modal-footer">
          <div class="modal-footer">
            <button type="button" class="btn btn-ok" @click.prevent="callback">{{ okText}}</button>
            <button type="button" class="btn btn-close" @click.prevent="close">{{ cancelText}}</button>
          </div>
        </slot>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    okText: {
      type: String,
      default: ''
    },
    cancelText: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    show: {
      require: true,
      type: Boolean
    },
    callback: {
      type: Function,
      default () {}
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
.modal {
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
.modal-wrapper {
  position: relative;
  width: 90%;
  margin: auto;
  font-size: 1.6rem;
  top: 50%;
  transform: translate(0,-50%);
}
.modal-content {
  position: relative;
  background: #fff;
  border-radius: 3px;
  overflow: hidden;
}
.modal-header {
  position: relative;
  background: #ff6251;
  color: #fff;
  height: 36px;
  line-height: 36px;
  text-align: center;
}
.modal .close {
  position: absolute;
  right: 0;
  top: 2px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #ff6251;
}
.modal .close::before,.modal .close::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%) rotate(45deg);
  -webkit-transform: translate(-50%,-50%) rotate(45deg);
  background-color: #fff;
}
.modal .close::before {
  width: 3px;
  height: 18px;
}
.modal .close::after {
  height: 3px;
  width: 18px;
}
.modal .modal-footer button {
  min-width: 64px;
}
.btn-ok {
  background-color: #ff6251;
}
.modal-footer {
  text-align: center;
  padding: 10px;
}
.modal-transition {
  animation-duration: 1s;
  animation-fill-mode: both;
}
.modal-enter {
  animation-name: fadeInDown
}
.modal-leave {
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
