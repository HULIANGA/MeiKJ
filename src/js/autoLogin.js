import toast from '../js/toast'
import utils from '../js/utils'

function autoLogin (options) {
  console.log('autoLogin options')
  console.log(options)
  options.component.$http.post(window.ctx + '/api/customer/loginState' + (utils.getUrlParam('session_key') ? ('?session_key=' + utils.getUrlParam('session_key')) : ''), {}).then((response) => {
    var res = response.data
    if (res.code === 0) {
      localStorage.loginid = response.data.result.id
      localStorage.loginname = response.data.result.nickName ? response.data.result.nickName : ''
      localStorage.token = response.data.result.token
      localStorage.loginphone = response.data.result.mobile
      if (options.yCallback) {
        options.yCallback()
      }
    } else {
      if (options.nCallback) {
        options.nCallback()
      }else {
        toast('请先登录')
        setTimeout(function () {
          window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
        }, 1000)
      }
    }
  }, (response) => {
    if (options.nCallback) {
      options.nCallback()
    }else {
      toast('请先登录')
      setTimeout(function () {
        window.goPage('login.html?fromUrl=' + encodeURIComponent(window.location.href))
      }, 1000)
    }
  })
}
exports.login = autoLogin
