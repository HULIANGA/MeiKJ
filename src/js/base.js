/********************************* ajax路径 ***********************************/
window.ctx = '../..'
/********************************* 图片路径 ************************************/
window.imageDomain = 'http://meimeidou.qiniudn.com/'
/*************************** 页面跳转经过后台重定向 ******************************/
// 本地
var webOrigin = 'http://mkj001.bigaka.com/mkj'
var webPath = '/dist/html/'
// mkj001
// var webOrigin = 'http://mkj001.bigaka.com/mkj'
// var webPath = '/mkj/view/html/'
// 生产
// var webOrigin = 'https://app.dymkj.net/mkj'
// var webPath = '/mkj/dist/html/'
window.goPage = function (url) {
  window.location.href = webOrigin + '/main?param=' + encodeURIComponent(window.location.origin + webPath + url)
}
