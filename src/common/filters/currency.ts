/*
 * @Author: jiangruohui
 * @Date: 2020-12-01 11:02:40
 * @LastEditors: jiangruohui
 * @LastEditTime: 2022-06-28 16:22:42
 * @Description:
 */
import { alignNumber } from '@/utils/index.js'

/**
 * @method currency
 * @param {number} val
 * @param type integer/decimal, 返回整数部分或者小数部分，默认返回全部
 * @param {string} symbol 货币符号 ¥ $
 * @param {number} fixed 保留小数位数
 */
const currency = (
  val: number,
  type?: 'integer' | 'decimal' | null,
  symbol?: string,
  fixed?: number
): string | number => {
  if (!val && val !== 0) return ''
  let res: number | string = val / 100
  switch (type) {
    case 'integer': // 整数部分
      res = parseInt(`${val / 100}`, 10)
      break
    case 'decimal': // 小数部分（0补全位数，返回的是字符串）
      res = alignNumber(val % 100, 2, '0')
      break
    default:
      break
  }
  if (symbol && val < 0) {
    res = fixed ? ((res as number) * -1).toFixed(fixed) : (res as number) * -1
    return `-${symbol}${res}`
  }
  res = fixed ? (res as number).toFixed(fixed) : res
  return symbol ? symbol + res : res
}

export default currency
