/*
 * @Author: jiangruohui
 * @Date: 2022-04-08 19:25:07
 * @LastEditors: liushuainan
 * @LastEditTime: 2022-04-19 16:44:57
 * @Description:
 */
import { alignNumber } from '@/utils/index.js'

/**
 * 数字转化成时间
 * 两种模式mode 1.CHS: d天h时m分s秒, 2.EN: d天h:m:s
 * @param {} val
 * @param {*} mode
 */

const time = (val: number | null, mode = 'EN'): any => {
  if (!val) {
    return val
  }

  val = parseInt(`${val}`, 10)
  const days = parseInt(`${val / (3600 * 24)}`, 10)
  const h = parseInt(`${(val / 3600) % 24}`, 10)
  const m = parseInt(`${(val % 3600) / 60}`, 10)
  const s = parseInt(`${val % 60}`, 10)

  let time = ''
  if (mode === 'CHS') {
    if (days) {
      time = `${days}天`
    }
    if (days || h) {
      time += `${h}时`
    }
    if (days || h || m) {
      time += `${m}分`
    }
    if (days || h || m || s) {
      time += `${s}秒`
    }
  } else {
    if (days) {
      time = `${days}天`
    }
    if (days || h) {
      time += `${alignNumber(h, 2, '0')}:`
    }
    time += `${alignNumber(m, 2, '0')}:`
    time += alignNumber(s, 2, '0')
  }

  return time
}

export default time
