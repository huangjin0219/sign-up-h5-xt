import { alignNumber } from '@/utils/index.js'

/**
 * @param type integer/decimal, 取整数部分或者小数部分
 * @param symbol 货币符号
 * @param fixed 保留小数位数
 */
const currency = (val, type, symbol, fixed) => {
  let res = val / 100
  switch (type) {
    case 'integer': // 整数部分
      res = parseInt(val / 100)
      break
    case 'decimal': // 小数部分
      res = alignNumber(val % 100, 2, '0')
      break
  }
  res = fixed ? res.toFixed(fixed) : res
  res = symbol ? symbol + res : res
  return res
}

export default currency
