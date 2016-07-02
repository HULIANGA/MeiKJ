/* Date format */
const fmtDate = function (date, fmt) {
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds()  // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return fmt
}
/* 判断周几 */
const convertToWeek = function (date) {
  let weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  return weeks[date]
}
/* check */
let getCheck = {
  checkPhone: function (val) {
    let filter = /^1\d{10}$/
    if (filter.test(val)) {
      return true
    } else {
      return false
    }
  }
}
exports.fmtDate = fmtDate
exports.convertToWeek = convertToWeek
exports.getCheck = getCheck
