import utils from '../libs/utils'

/* 格式化时间 */
exports.evalTime = (time) {
  return utils.fmtDate(new Date(time), 'yyyy.MM.dd hh:mm')
}
