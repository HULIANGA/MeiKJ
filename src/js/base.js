/********************************* ajax路径 ***********************************/
window.ctx = '../..'
/********************************* 图片路径 ************************************/
window.imageDomain = 'http://meimeidou.qiniudn.com/'
/*************************** 区分东瀛和美空间 ***********************************/
// 美空间
window.systemType = 'MKJ'
// 东瀛
window.systemType = 'DY'
/*************************** 页面跳转经过后台重定向 ******************************/
// 本地
var webOrigin = 'http://mkj001.bigaka.com/mkj'
var webPath = '/dist/html/'
// mkj001
// var webOrigin = 'http://mkj001.bigaka.com/mkj'
// var webPath = '/mkj/view/html/'
// 生产
// var webOrigin = 'https://app.dymkj.net/mkj'
// var webPath = '/mkj/view/html/'
// 生产东瀛
// var webOrigin = 'https://dy.dymkj.net/dyzx'
// var webPath = '/dyzx/view/html/'
window.goPage = function (url) {
  window.location.href = webOrigin + '/main?param=' + encodeURIComponent(window.location.origin + webPath + url) +  (getUrlParam('session_key') ? ('&session_key=' + getUrlParam('session_key')) : '')
}
/**************************** GrowingIO统计代码 ********************************/
var head = document.head || document.getElementsByTagName('head')[0];
var script = document.createElement('script');
script.innerHTML =
  "var _vds = _vds || [];"+
      "window._vds = _vds;"+
      "(function(){"+
        "_vds.push(['setAccountId', '8f07dd4da9e64e3d']);"+
        "(function() {"+
          "var vds = document.createElement('script');"+
          "vds.type='text/javascript';"+
          "vds.async = true;"+
          "vds.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'dn-growing.qbox.me/vds.js';"+
          "var s = document.getElementsByTagName('script')[0];"+
          "s.parentNode.insertBefore(vds, s);"+
        "})();"+
      "})();";
head.appendChild(script);

function getUrlParam (param) {
  var query = window.location.search.substr(1)
  var vars = query.split('&')
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=')
    if (pair[0] === param) {
      return pair[1]
    }
  }
  return false
}
