/*
 * @Author: jiangruohui
 * @Date: 2022-04-08 19:25:07
 * @LastEditors: jiangruohui
 * @LastEditTime: 2022-04-09 11:52:20
 * @Description:
 */
import { alignNumber } from '@/utils/index.js'

type DateType = Date | number | string

const symbolMap = {
  YY(date: DateType): number {
    if (typeof date === 'string' || typeof date === 'number') {
      const d = new Date(date)
      return d.getFullYear()
    }
    return date.getFullYear()
  },
  MM(date: DateType): number {
    if (typeof date === 'string' || typeof date === 'number') {
      const d = new Date(date)
      return d.getMonth() + 1
    }
    return date.getMonth() + 1
  },
  dd(date: DateType): number {
    if (typeof date === 'string' || typeof date === 'number') {
      const d = new Date(date)
      return d.getDate()
    }
    return date.getDate()
  },
  hh(date: DateType): number {
    if (typeof date === 'string' || typeof date === 'number') {
      const d = new Date(date)
      return d.getHours()
    }
    return date.getHours()
  },
  mm(date: DateType): number {
    if (typeof date === 'string' || typeof date === 'number') {
      const d = new Date(date)
      return d.getMinutes()
    }
    return date.getMinutes()
  },
  ss(date: DateType): number {
    if (typeof date === 'string' || typeof date === 'number') {
      const d = new Date(date)
      return d.getSeconds()
    }
    return date.getSeconds()
  },
  week(date: DateType): string {
    if (typeof date === 'string' || typeof date === 'number') {
      const d = new Date(date)
      return formatNum2CHN(d.getDay())
    }
    return formatNum2CHN(date.getDay())
  }
}

const formatNum2CHN = (val: number) => {
  const num = parseInt(`${val}`, 10)
  const arr = ['日', '一', '二', '三', '四', '五', '六']
  return arr[num]
}

const format = (date: DateType | undefined, fmtStr = 'YY-MM-dd'): string => {
  if (!date) {
    return '--'
  }
  const regx = /(MM|mm|YY|ss|hh|dd|week)/g
  return fmtStr.replace(regx, function (s) {
    if (s === 'week') {
      return symbolMap[s](date)
    }

    return alignNumber(symbolMap[s](date), 2, '0')
  })
}

export default format
