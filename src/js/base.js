/************** ajax路径 ***************/
window.ctx = '../..'
/************** 图片路径 ****************/
window.imageDomain = 'http://meimeidou.qiniudn.com/'
/************ 地址跳转经过后台 ***********/
window.goPage = function (url) {
  window.location.href = 'http://mkj001.bigaka.com/mkj/main?param=' + encodeURIComponent(window.location.origin + '/dist/html/' + url)
}
