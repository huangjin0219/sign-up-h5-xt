import Cookies from 'js-cookie'
import { cookiePrefix, cookieDomain } from '@/config/index'

export const cookie = {
  expires: 1,
  path: '/',
  domain: cookieDomain,
  set (name, value, options = {}, cPrefix) {
    if (name) {
      if (typeof (value) === 'object') {
        value = JSON.stringify(value)
      }
      value = encodeURIComponent(value)
      cPrefix = cPrefix || cookiePrefix
      return Cookies.set(cPrefix + name, value, { expires: this.expires, path: this.path, ...options })
    }
  },
  /**
   *
   * @param {String} name key
   * @param {Boolean} toJson 是否需要json转换
   */
  get (name, toJson = false, cPrefix) {
    if (name) {
      cPrefix = cPrefix || cookiePrefix
      let value = Cookies.get(cPrefix + name)
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
  remove (name, options = {}, cPrefix) {
    if (name) {
      cPrefix = cPrefix || cookiePrefix
      return Cookies.remove(cPrefix + name, { path: this.path, ...options })
    }
  }
}

/**
 * 存储localStorage
 */
export const setStore = (key, val) => {
  if (!key) return false
  if (typeof val !== 'string') {
    val = JSON.stringify(val)
  }
  window.localStorage.setItem(key, val)
}

/**
 * 获取localStorage
 */
export const getStore = key => {
  if (!key) return
  return window.localStorage.getItem(key)
}

/**
 * 删除localStorage
 */
export const removeStore = key => {
  if (!key) return
  window.localStorage.removeItem(key)
}
