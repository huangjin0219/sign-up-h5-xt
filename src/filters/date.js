import { alignNumber } from '@/utils/index.js'

const symbolMap = {
  YY: function (date) {
    if (typeof date === 'string' || typeof date === 'number') {
      const d = new Date(date)
      return d.getFullYear()
    }
    return date.getFullYear()
  },
  MM: function (date) {
    if (typeof date === 'string' || typeof date === 'number') {
      const d = new Date(date)
      return d.getMonth() + 1
    }
    return date.getMonth() + 1
  },
  dd: function (date) {
    if (typeof date === 'string' || typeof date === 'number') {
      const d = new Date(date)
      return d.getDate()
    }
    return date.getDate()
  },
  hh: function (date) {
    if (typeof date === 'string' || typeof date === 'number') {
      const d = new Date(date)
      return d.getHours()
    }
    return date.getHours()
  },
  mm: function (date) {
    if (typeof date === 'string' || typeof date === 'number') {
      const d = new Date(date)
      return d.getMinutes()
    }
    return date.getMinutes()
  },
  ss: function (date) {
    if (typeof date === 'string' || typeof date === 'number') {
      const d = new Date(date)
      return d.getSeconds()
    }
    return date.getSeconds()
  },
  week: function (date) {
    if (typeof date === 'string' || typeof date === 'number') {
      const d = new Date(date)
      return formatNum2CHN(d.getDay())
    }
    return formatNum2CHN(date.getDay())
  }
}

const formatNum2CHN = val => {
  const num = parseInt(val)
  const arr = ['', '一', '二', '三', '四', '五', '六']
  return arr[num]
}

const format = (date, fmtStr = 'YY-MM-dd') => {
  if (!date) {
    return '--'
  }
  if (typeof date === 'string') {
    // 解决IOS上无法从dateStr parse 到Date类型问题
    date = date.replace(/-/g, '/')
  }
  const regx = /(MM|mm|YY|ss|hh|dd|week)/g
  return fmtStr.replace(regx, function (s) {
    if (s === 'week') {
      return symbolMap[s](date)
    } else {
      return alignNumber(symbolMap[s](date), 2, '0')
    }
  })
}

export default format
