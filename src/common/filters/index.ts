/*
 * @Author: jiangruohui
 * @Date: 2022-04-08 19:25:07
 * @LastEditors: jiangruohui
 * @LastEditTime: 2022-04-20 15:24:17
 * @Description:
 */
import date from './date'
import time from './time'
import currency from './currency'
import num from './num'

export default {
  date,
  time,
  currency,
  num
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $filters: {
      date: (date: Date | number | string | undefined, fmtStr?: string) => string
      time: (val: number | null, mode?: 'EN' | 'CHS') => any
      currency: (val: number, type?: 'integer' | 'decimal' | null, symbol?: string, fixed?: number) => string | number
      num: (val: number, placehold?: string) => number | string
    }
  }
}
