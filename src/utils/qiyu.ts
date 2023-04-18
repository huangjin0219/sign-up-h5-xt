/* eslint-disable */
/*
 * @Author: jiangruohui
 * @Date: 2022-04-11 11:08:27
 * @LastEditors: jiangruohui
 * @LastEditTime: 2022-04-11 14:21:41
 * @Description:
 */
declare global {
  interface Window {
    ysf: any
  }
}

export default class QiYu {
  constructor() {
    this.init()
  }

  init() {
    return (function (w, d, n) {
      w[n] =
        w[n] ||
        function () {
          ;(w[n].a = w[n].a || []).push(arguments)
        }
      const j = d.createElement('script')
      j.async = true
      j.src = 'https://qiyukf.com/script/0b0e6d3d58782fcb124053154dc76e19.js'
      d.body.appendChild(j)
    })(window, document, 'ysf')
  }

  open() {
    if (!window.ysf) {
      throw new Error('未执行qiyukf.init()方法')
    }
    typeof window.ysf.open === 'function' && window.ysf.open()
  }

  product(params:any) {
    return window.ysf('product', params)
  }
}
