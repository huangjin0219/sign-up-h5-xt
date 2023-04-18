/*
 * @Author: jiangruohui
 * @Date: 2022-03-24 14:32:40
 * @LastEditors: jiangruohui
 * @LastEditTime: 2022-03-30 10:26:29
 * @Description:
 */
import Cookies from 'js-cookie'
import { storePrefix, cookiePrefix, cookieDomain } from '@/config/index'
import { User } from '@/store'
/**
 * @Author: jiangruohui
 * @method: setStore
 * @description: 存储localStorage/sessionStorage
 * @param {string} name 存储的key
 * @param {any} content 存储的内容
 * @param {string} type 本地存储类型，session | local, 默认localStorgae
 */
export const setStore = (name: string, content: any, type = '') => {
  if (!name) {
    return false
  }
  const data = [undefined].includes(content) ? '' : JSON.stringify(content)
  if (type === 'session') {
    window.sessionStorage.setItem(`${storePrefix}_${name}`, data)
  } else {
    window.localStorage.setItem(`${storePrefix}_${name}`, data)
  }
}

/**
 * @Author: jiangruohui
 * @method: setStore
 * @description: 获取localStorage/sessionStorage
 * @param {string} name 存储的key
 * @param {string} type 本地存储类型，session | local, 默认localStorgae
 */
export const getStore = (name: string, type = ''): any => {
  if (!name) {
    return
  }
  let content = null
  if (type === 'session') {
    content = window.sessionStorage.getItem(`${storePrefix}_${name}`)
  } else {
    content = window.localStorage.getItem(`${storePrefix}_${name}`)
  }
  return content ? JSON.parse(content) : ''
}

/**
 * @Author: jiangruohui
 * @method: removeStore
 * @description: 删除localStorage/sessionStorage
 * @param {string} name 存储的key
 * @param {string} type 本地存储类型，session | local, 默认localStorgae
 */
export const removeStore = (name: string, type = '') => {
  if (!name) {
    return
  }
  if (type === 'session') {
    window.sessionStorage.removeItem(`${storePrefix}_${name}`)
  } else {
    window.localStorage.removeItem(`${storePrefix}_${name}`)
  }
}

// 用户登录信息统一操作
export const setUserInfo = (data: any = {}) => {
  cookie.set('token', data.userToken)
  cookie.set('userInfo', data)

  // 设置埋点用户票据
  // process.client && window.XTAnalysis.setUser(data)
}

export const getUserInfo = (): User | undefined => {
  const data = cookie.get('userInfo', true)
  if (data instanceof Object) {
    return data as User
  }
  return undefined
}

export const removeUserInfo = () => {
  cookie.remove('userInfo')
  cookie.remove('token')

  // 销毁埋点用户票据
  // process.client && window.XTAnalysis.removeUser()
}

export const cookie = {
  expires: 7,
  path: '/',
  domain: cookieDomain,
  set(name: string, value: any, options: any = {}, customCookiePrefix = '') {
    if (name) {
      let val = value
      if (typeof value === 'object') {
        val = JSON.stringify(val)
      }
      val = encodeURIComponent(val)
      return Cookies.set(`${customCookiePrefix || cookiePrefix}${name}`, val, {
        expires: this.expires,
        path: this.path,
        domain: this.domain,
        ...options
      })
    }
  },
  /**
   *
   * @param {string} name key
   * @param {boolean} toJson 是否需要json转换
   */
  get(name: string, toJson = false): string | object | undefined {
    if (name) {
      let value = Cookies.get(cookiePrefix + name)
      if (!value) {
        return
      }
      value = decodeURIComponent(value)
      if (toJson) {
        value = JSON.parse(value)
        return value
      }
      return value
    }
  },
  remove(name: string, options: any = {}) {
    if (name) {
      return Cookies.remove(cookiePrefix + name, {
        path: this.path,
        domain: this.domain,
        ...options
      })
    }
  }
}
