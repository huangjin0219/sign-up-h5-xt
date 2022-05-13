import { Base64 } from 'js-base64'
const makeNchar = (char, n) => {
  const str = []
  while (n--) {
    str.push(char)
  }
  return str.join('')
}

/**
 * @Author: jiangruohui
 * @method: alignNumber
 * @description: 补齐字符串
 * @param {String|Number} num 初始值
 * @param {Number} len  补齐后的字符串长度
 * @param {String} char 用来补全的字符
 */
export const alignNumber = (num, len, char) => {
  num = num + ''
  if (num.length > len) {
    return num
  } else {
    return makeNchar(char, len - num.length) + num
  }
}

// base64编码
export const encrypt64 = (obj) => {
  // 判断参数是对象
  if (Object.prototype.toString.call(obj) !== '[object Object]') {
    return ''
  }
  return {
    data: encodeURIComponent(Base64.encode(JSON.stringify(obj)))
  }
}

/**
 * @method: throttle
 * @description: 节流，控制点击事件频率
 */
export const throttle = (fn, gapTime) => {
  // 默认设置为网络超时时间
  gapTime = gapTime || 1500
  let _lastTime = null

  return function () {
    const _nowTime = new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments)
      _lastTime = _nowTime
    }
  }
}

// 以 image 为几位
export const isStrImageEnd = (str) => {
  if (!str) return false
  return /image$/.test(str.toLocaleLowerCase())
}

// 以 file 为几位
export const isStrFileEnd = (str) => {
  if (!str) return false
  return /file$/.test(str.toLocaleLowerCase())
}
