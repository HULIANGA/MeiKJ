<template>
  <div class="dialog">
    <div class="dialog-wrapper">
				<div class="dialog-content">
          <slot name="dialog-header">
            <div class="dialog-header">
  						<button type="button" class="close" v-on:click="close"><span>&times;</span><span class="sr-only">Close</span></button>
  						<h4 class="dialog-title" id="myModalLabel">
                <span id="prompt_title">
                  <slot name="title">
                    {{ title }}
                  </slot>
                </span>
              </h4>
  					</div>
          </slot>

					<div class="dialog-footer" :class="{ 'btn-close-hide': isB}">
						<button type="button" class="btn btn-ok" v-on:click="callback">{{ okText}}</button>
						<button type="button" class="btn btn-close" v-on:click="close">{{ cancelText}}</button>
					</div>
				</div>
			</div>
  </div>
</template>
<script>
export default {
  props: {
    isB: false,
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
      type: Boolean,
      twoWay: true
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
    },
    callback () {
      this.$emit('confirm-msg')
    }
  }
}
</script>
<style>
.dialog{
  position: fixed;
  display: none;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(0,0,0,0.3);
}
.dialog-wrapper{
	position: relative;
	z-index: 1050;
	width: 80%;
	margin: 30px auto;
}
.dialog-content{
	position: relative;
	background: #fff;
	border: 1px solid #999;
	border: 1px solid rgba(0,0,0,0.2);
  padding: 10px;
	border-radius: 6px;
  border: 0;
	outline: 0;
	-webkit-box-shadow: 0 3px 9px rgba(0,0,0,0.5);
	box-shadow: 0 3px 9px rgba(0,0,0,0.5);
	background-clip: padding-box;
	-webkit-box-shadow: 0 5px 15px rgba(0,0,0,0.5);
	box-shadow: 0 5px 15px rgba(0,0,0,0.5);
  margin-top: 50%;
}
.dialog-header{
	position: relative;
  min-height: 16.428571429px;
  padding: 15px;
  border-bottom: 1px solid #eaeaea;
}
.dialog-header .close{
  float: right;
  font-size: 21px;
  font-weight: bold;
  line-height: 1;
  color: #fff;
  text-shadow: 0 1px 0 #fff;
  opacity: .6;
  filter: alpha(opacity=20);
	padding: 0;
  background: transparent;
  border: 0;
  -webkit-appearance: none;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  border: 0;
}
.dialog-title {
  margin: 0;
  font-size: 17px;
  line-height: 1.428571429;
  color:#767676;
	text-align:center;
	margin-bottom:20px
}
.dialog-footer {
  text-align: center;
  border-top: 1px solid #e5e5e5;
	margin-top: 0px;
  border-top: 0px;
  padding: 15px 5px;
}
.dialog-footer:before, .dialog-footer:after {
  display: table;
  content: " ";
}
.dialog-footer .btn {
  display: inline-block;
  color: #fff;
  width: 48%;
  margin: 0px;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: normal;
  line-height: 1.428571429;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
  border-radius: 3px;
  box-sizing:border-box;
}
.btn-ok {
  background-color: #ff6251;
}
.dialog .btn-close {
  background-color:#fff;
  color: #333;
	border:1px solid #eaeaea;
}
.dialog-footer.btn-close-hide .btn-ok {
  display: none;
}
.dialog-footer.btn-close-hide .btn-close {
  background-color: #ff6251;
  color: white
}
</style>
