/*
 * @Author: jiangruohui
 * @Date: 2022-03-29 19:34:42
 * @LastEditors: 曹双双
 * @LastEditTime: 2023-03-16 14:19:51
 * @Description:
 */
import wx from 'weixin-js-sdk'
import { Base64 } from 'js-base64'
import { wxAppId, ANDROID_APP_DOWNLOAD_LINK, IOS_APP_DOWNLOAD_LINK } from '@/config/index'
import { getUserInfo } from '@/utils/store'
import { useMainStore } from '@/store'

/** ********** 微信相关 *************** */
export const wxLogin = (url = `${window.location.origin}/xtm/slogin`) => {
  // 抄知乎的设置
  // top=200,left=400,width=600,height=550,directories=no,menubar=no,toolbar=no
  const openUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wxAppId}&redirect_uri=${encodeURIComponent(
    url
  )}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
  window.open(openUrl, '_blank')
}

export const wxAuth = (redirectUrl: string) => {
  const openUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wxAppId}&redirect_uri=${encodeURIComponent(
    redirectUrl
  )}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
  window.location.href = openUrl
}
/** ********** 微信相关**************** */

// base64编码
export const encrypt64 = (obj: any): object | string => {
  // 判断参数是对象
  if (Object.prototype.toString.call(obj) !== '[object Object]') {
    return ''
  }
  return {
    data: encodeURIComponent(Base64.encode(JSON.stringify(obj)))
  }
}

// base64解码
export const decode64 = (arg: any): object | string => {
  if (Object.prototype.toString.call(arg) !== '[object Object]' || !arg.data) {
    return ''
  }
  return JSON.parse(Base64.decode(decodeURIComponent(arg.data)))
}

const makeNchar = (char: string, n: number) => {
  const str = []
  // eslint-disable-next-line no-plusplus
  while (n--) {
    str.push(char)
  }
  return str.join('')
}

/**
 * @Author: jiangruohui
 * @method: alignNumber
 * @description: 补齐字符串
 * @param {number} num 数值
 * @param {number} len 字符串长度
 * @param {string} char 占位符
 * @return {*}
 */
export const alignNumber = (num: number, len: number, char: string) => {
  const str = `${num}`
  if (str.length > len) {
    return str
  }
  return makeNchar(char, len - str.length) + num
}

/**
 * @method: loginLimit
 * @description:  登录限制，用户已登录返回true
 * @param {string} redirect 重定向地址
 * @return {*}
 */
export const loginLimit = (h5Redirect?: string, miniProRedirect?: string) => {
  const userInfo = getUserInfo()
  if (userInfo) {
    return true
  }
  enterLogin(h5Redirect, miniProRedirect)
}

export const enterLogin = (h5Redirect?: string, miniProRedirect?: string) => {
  const mainStore = useMainStore()
  if (mainStore.uaEnv === 'minipro') {
    const params = miniProRedirect ? `?redirect=${miniProRedirect}` : ''
    wx.miniProgram.navigateTo({ url: `/others/pages/login/login${params}` })
  } else {
    const query = encrypt64({ redirect: h5Redirect }) as { data: string }
    const params = query?.data ? `?data=${query.data}` : ''
    window.location.replace(`/xtm/login${params}`)
  }
}

// 判断ios
export const isIOS = () => {
  const u = navigator.userAgent
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}

// 判断是否在微信浏览器
export function envWeixinCheck() {
  const ua = navigator.userAgent.toLowerCase()
  return ua.includes('micromessenger')
}

// 判断是否在支付宝浏览器
export function envAliPayCheck() {
  const ua = navigator.userAgent.toLowerCase()
  return ua.includes('alipayclient')
}

/**
 * @method: enterApp
 * @description: 打开app下载链接
 */
export const enterApp = () => {
  const link = isIOS() ? IOS_APP_DOWNLOAD_LINK : ANDROID_APP_DOWNLOAD_LINK
  if (window.top) {
    window.top.location.href = link
  } else {
    window.location.href = link
  }
}
/**
 * @description: 复制文本
 * @param {*} text 需要复制的文本 String
 * @returns {status} 复制状态 Boolean
 */
export function copyText(text: string) {
  const input = document.createElement('input')
  let status = false
  input.setAttribute('readonly', 'readonly')
  input.setAttribute('value', text)
  document.body.appendChild(input)
  input.focus()
  input.setSelectionRange(0, text.length)
  status = document.execCommand('copy', true)
  document.body.removeChild(input)
  return status
}

/** ************* 路由 *********** */
export const getCurrentPath = () => {
  const { href } = window.location
  const index = href.indexOf('/xtm/')
  return index ? href.slice(index + 4) : ''
}

/**
 * 删除当前url中指定参数
 * @param names 数组或字符串
 * @returns {string}
 */
export const funcUrlParamsDel = (query: object, names: string | string[]) => {
  if (typeof names === 'string') {
    names = [names]
  }
  const queryObj = { ...query }
  // 删除指定参数
  for (let i = 0; i < names.length; i += 1) {
    delete queryObj[names[i]]
  }
  const keys = Object.keys(queryObj)
  const queryArr = keys.map((key) => {
    return `${key}=${queryObj[key]}`
  })
  return queryArr.join('&')
}

export const funcUrlDel = (query: object, names: string | string[]) => {
  const params = funcUrlParamsDel(query, names)
  // 重新拼接url
  const url = `${window.location.origin + window.location.pathname}?${params}`
  return url
}

// ---------------------构造url参数-----------------------
export const genUrlParams = (params: string | string[]) => {
  let str = ''
  Object.keys(params).forEach((key) => {
    params[key] = encodeURIComponent(params[key])
    str += `&${key}=${params[key]}`
  })
  return str.slice(1)
}

// 获取url字符串参数
export const getUrlParams = (url: string) => {
  const paramsStr = url.split('?')[1] || ''
  return decodeUrlParams(paramsStr)
}

const decodeUrlParams = (str: string) => {
  const paramsArray = str.split('&') || []
  const paramsObj = {}
  let pos
  paramsArray.forEach((item) => {
    pos = item.indexOf('=')
    paramsObj[item.slice(0, pos)] = item.slice(pos + 1)
  })
  return paramsObj
}

// 获取本周的时间范围
export const getWeekRange = () => {
  let start = 0
  let end = 0
  const now = new Date()
  const nowYear = now.getFullYear() // 当前年
  let nowDayOfWeek = now.getDay() // 今天本周的第几天，周日认为是最后一天
  nowDayOfWeek = nowDayOfWeek === 0 ? 7 : nowDayOfWeek
  const nowDay = now.getDate() // 当前日
  const nowMonth = now.getMonth() // 当前月

  start = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1).getTime()
  end = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek)).getTime() + (24 * 3600 - 1) * 1000

  return {
    start,
    end
  }
}
