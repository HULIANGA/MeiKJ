import Vue from 'vue'

const Toast = Vue.extend(require('../components/toast'))
let toastPool = []

let getAnInstance = function () {
  if (toastPool.length > 0) {
    let instance = toastPool[0]
    toastPool.splice(0, 1)
    return instance
  }
  return new Toast({
    el: document.createElement('div')
  })
}
let returnAnInstance = function (instance) {
  if (instance) {
    toastPool.push(instance)
  }
}
export default function (options) {
  options = options || {}

  let message, position, duration, className, iconClass
  if (typeof options === 'string') {
    message = options
    duration = 1500
    position = 'middle'
    className = ''
    iconClass = ''
  } else {
    message = options.message
    duration = options.duration || 1500
    position = options.position || 'middle'
    className = options.className || ''
    iconClass = options.iconClass || ''
  }
  let instance = getAnInstance()
  instance.message = message
  instance.position = position
  instance.className = className
  instance.iconClass = iconClass

  Vue.nextTick(function () {
    instance.$appendTo(document.body)
    setTimeout(function () {
      instance.$remove()
      returnAnInstance(instance)
    }, duration)
  })
}
