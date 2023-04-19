/* eslint-disable no-bitwise */
/* eslint-disable no-param-reassign */
/*
 * @Author: jiangruohui
 * @Date: 2022-03-15 16:52:54
 * @LastEditors: huangjin
 * @LastEditTime: 2023-04-19 14:43:12
 * @Description:
 */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import md5 from 'js-md5'
import wx from 'weixin-js-sdk'
import { Toast } from 'vant'
import { useUserStore, useMainStore } from '@/store/index'
import { encrypt, decrypt } from '@/utils/aes'
import { removeUserInfo } from '@/utils/store'
import { baseURL, dataServiceUrl } from '@/config'

const needEncrypt = import.meta.env.PROD && import.meta.env?.VITE_APP_ENV === 'production'
const LOGIN_ERROR_CODE = 2
const codeMessage: any = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功。',

  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '客户端令牌 错误 或 过期 ，请重新登录。',
  403: '用户没有此 路由 或 操作 权限。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',

  500: '服务器发生错误，请检查服务器',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时'
}

export interface RequestConfigOptions {
  login?: boolean // 是否需要传用户token
  showSucMsg?: boolean // 是否提示请求成功，默认不显示
  sucMsg?: string // 请求成功提示文字，默认显示返回的message
  hideErrMsg?: boolean // 是否隐藏请求失败提示，默认不隐藏
  errMsg?: string // 请求失败提示文字，默认显示返回的message
  domain?: string // 域名
}

interface RequestConfig extends AxiosRequestConfig {
  options?: RequestConfigOptions
}

// create an axios instance
const service = axios.create({
  baseURL,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000
})

const genHeader = () => {
  const header = {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
    // 'access-control-allow-credentials': true,
    // 'access-control-allow-headers': '*',
    // 'access-control-allow-methods': '*',
    // 'access-control-allow-origin': '*'
  }
  return header
}

// request interceptor
service.interceptors.request.use(
  (config: RequestConfig) => {
    if (config.options && config.options.domain) {
      config.baseURL = `${baseURL}/${config.options.domain}`
    }
    const mainStore = useMainStore()
    const userStore = useUserStore()
    if (config.options && config.options.login && userStore.user && !config.data.userToken) {
      config.data = {
        ...config.data,
        userToken: userStore.user?.userToken
      }
    }
    // 重新定义headers
    config.headers = Object.assign(config.headers || {}, genHeader(), signPlusByMd5(config.data), {
      [`xt_request_uuid`]: mainStore.getUuid(),
      [`out_trace_no`]: getTraceNo()
    })

    /** ***** aes加密 ******* */
    if (needEncrypt) {
      config.headers = { ...config.headers, ck: 1 }
      config.data = encrypt(JSON.stringify(config.data))
    }
    /** ***** aes加密 ******* */

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response: AxiosResponse) => {
    let { data } = response
    try {
      /** ***** aes解密 ******* */
      if (needEncrypt) {
        const plaintext = decrypt(data)
        data = JSON.parse(plaintext)
        response.data = data
      }
      /** ***** aes解密 ******* */
    } catch (error) {}

    if (data.code === 1) {
      data.success = true
    }
    // {"resultCode":"login_error","resultMessage":"请登录","success":false}
    if (data.resultCode && data.resultCode === 'login_error') {
      data.code = LOGIN_ERROR_CODE
      data.message = data.message || '登录过期或者已在其他设备登录,请重新登录!'
      data.success = false
    }
    return data
  },
  (error) => {
    const { status = 500 } = error && error.response ? error.response : {}
    const resultMessage = codeMessage[status]

    //  Notify({ type: 'warning', title: '警告', message: `${status}:${resultMessage}` })
    return {
      success: false,
      resultMessage
    }
  }
)

/**
 * @method fetch 封装的请求体
 * @param {Object} config axios的配置
 */

const fetch = (config: RequestConfig) => {
  return new Promise((resolve, reject) => {
    service(config)
      .then((res: any) => {
        // { code: number, message: string, success: boolean }
        const { options } = config
        if (res.success) {
          // 成功提示
          if (options && options.showSucMsg) {
            const scuMsg = options.sucMsg || res.message
            Toast({
              message: scuMsg,
              duration: 2000
            })
          }
          resolve(res)
        } else {
          // 后续没有请求成功的状态码
          if (!options?.hideErrMsg) {
            Toast({
              message: options?.errMsg || res.message || res.resultMessage,
              duration: 2000
            })
          }
          handleResultCode(res)
          reject(res)
        }
      })
      .catch((res) => {
        reject(res)
      })
  })
}

// 返回状态码处理
function handleResultCode(res: { code: number }) {
  const { code } = res
  switch (code) {
    case LOGIN_ERROR_CODE:
      // 登录过期或者已在其他设备登录,请重新登录!
      handleLoginExpire()
      break
    default:
      break
  }
}
/**
 * @description 登录过期处理
 */
export function handleLoginExpire() {
  const mainStore = useMainStore()
  if (mainStore.uaEnv === 'minipro') {
    // wx.miniProgram.postMessage({ type: 'logout' }) // 无效，页面跳转不触发事件
    wx.miniProgram.navigateTo({ url: '/others/pages/login/login' })
  } else {
    removeUserInfo()
    // 缓冲cookie操作
    setTimeout(() => {
      window.location.href = `/xtm/login?redirect=${encodeURIComponent(window.location.href)}`
    }, 300)
  }
}

/**
 * 新签名规则
 * @deprecated 约定各个体系签名统一
 * @param {Object} dataBody
 */
const signPlusByMd5 = (dataBody: any = {}, options: any = {}) => {
  const {
    signKey = ['X', 'T', 'S', 'I', 'G', 'N', 'K', 'E', 'Y'].join(''), // 秘钥
    header = {}, // 自定义header
    signType = 'MD5' // 签名方式 默认md5
  } = options
  let xtapiValidateCdk = '' // 复杂对象属性
  let xtapiValidateCdkArr = '' // 复杂对象属性(数组)

  if (!dataBody) {
    return
  }

  const timeStamp = new Date().getTime()
  const dataTotal = {
    // 'xtapi-validate-channelNo': channelNo,
    // 'xtapi-validate-bizLine': bizLine,
    'xtapi-validate-timestamp': timeStamp,
    'xtapi-validate-nonce': Math.random().toString(36).substr(-10),
    ...header
  } // 签名数据

  // const objData = {}
  Object.entries(dataBody).forEach(([key, value]: [key: string, value: any]) => {
    if ([null, undefined, ''].includes(value)) {
      delete dataBody[key]
    } else if (value instanceof Array) {
      dataBody[key] = JSON.stringify(dataBody[key])
      xtapiValidateCdkArr += `${key}|`
    } else if (typeof dataBody[key] === 'object') {
      dataBody[key] = JSON.stringify(dataBody[key])
      xtapiValidateCdk += `${key}|`
    }
  })

  // 复杂对象header添加字段
  if (xtapiValidateCdk.length) {
    xtapiValidateCdk = xtapiValidateCdk.substr(0, xtapiValidateCdk.length - 1)
    // dataTotal['xtapi-validate-cdk'] = xtapiValidateCdk
    dataTotal['xtapi-validate-complex-params'] = xtapiValidateCdk
  }
  if (xtapiValidateCdkArr.length) {
    xtapiValidateCdkArr = xtapiValidateCdkArr.substr(0, xtapiValidateCdkArr.length - 1)
    dataTotal['xtapi-validate-complex-array-params'] = xtapiValidateCdkArr
  }

  const signStr = Object.keys(dataBody).length === 0 ? getSign(dataTotal) : `${getSign(dataBody)}&${getSign(dataTotal)}`
  const sign = paramsStrSort(signStr) // 获取签名sign
  // var sign = paramsStrSort(`${getSign(dataBody)}&${getSign(dataTotal)}`) // 获取签名sign

  // delete dataTotal['xtapi-validate-body']
  dataTotal['xtapi-validate-signature'] = sign
  dataTotal['xtapi-validate-signtype'] = signType

  return dataTotal

  function getSign(params: any) {
    const arr: Array<string> = []
    Object.entries(params).forEach(([key, value]) => {
      arr.push(`${key}=${value}`)
    })
    return arr.sort().join('&')
  }

  function paramsStrSort(paramsStr: any) {
    const newUrl = paramsStr + signKey
    // console.log('newUrl：' + newUrl)
    return md5(newUrl)
  }
}

/**
 * @description 获取请求的唯一uuid
 * @param {Number} len 长度
 * @param {String} radix 基数
 */
const getTraceNo = (len?: number, radix?: number) => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  const uuid = []
  let i
  radix = radix || chars.length

  if (len) {
    // Compact form
    for (i = 0; i < len; i += 1) {
      uuid[i] = chars[0 | (Math.random() * radix)]
    }
  } else {
    // rfc4122, version 4 form
    let r

    // rfc4122 requires these characters
    // eslint-disable-next-line no-multi-assign
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i += 1) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16)
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }

  return uuid.join('')
}

/**
 * 上传图片
 */
export const uploader = (file: any) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData()
    const userStore = useUserStore()
    formData.append('userToken', userStore.user?.userToken as string)
    formData.append('resource', file)
    axios
      .post(`${baseURL}/zeus/multimedia/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// 上传图片
export const uploadImage = (file: any, options = {}) => {
  // new 一个FormData格式的参数
  const params = new FormData()
  params.append('file', file)
  const config = {
    headers: {
      // 添加请求头
      'Content-Type': 'multipart/form-data'
    }
  }
  const uploadPath = `${dataServiceUrl}/data-service/file/upload`

  return new Promise((resolve, reject) => {
    // 把 uploadPath 换成自己的 上传路径
    axios
      .post(uploadPath, params, config)
      .then((res) => {
        console.log('uploadImage -> res', res)
        // 如果为真 resolve出去
        if (res && res.data && +res.data.resultCode === 1) {
          resolve(`https://umpfile.oss-cn-hangzhou.aliyuncs.com/${res.data.value}`)
        } else {
          // 否则 Toast 提示
          Toast.fail(res.data.resultMessage || '上传出错')
          reject(res.data)
        }
      })
      .catch((err) => {
        Toast.fail('上传出错')
        reject(err)
      })
  })
}

export default fetch
