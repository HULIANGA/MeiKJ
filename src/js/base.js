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
// javascript.js
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
