import axios from 'axios'
import md5 from 'js-md5'
import { Toast } from 'vant'
import store from '@/store'
import { getBaseUrl } from '@/config/envUrl'
import { BIM_CUSTOMER_ERR_CODE_LIST } from '@/constant'
import router from '@/router'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.baseURL = getBaseUrl(config.options && config.options.domain)

    if (config.options && config.options.login && store.state.user) {
      config.data = Object.assign(
        {},
        {
          token: store.state.user.token
        },
        config.data
      )
    }

    if (config.options.toast) {
      Toast.loading({
        message: config.options.message || '加载中',
        forbidClick: true,
        duration: 0
      })
    }
    config.headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Credentials': 'true',
      Accept: 'application/json'
    }

    config.headers = Object.assign(config.headers, signPlusByMd5(config.data))
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data || {}
    res.message = res.message || res.resultMessage
    res.code = res.code || res.resultCode

    // 需要自定义处理的错误
    if (BIM_CUSTOMER_ERR_CODE_LIST.includes(res.resultCode)) {
      console.log('res.resultCode', res.resultCode)
      Toast.clear()
      router.push({
        path: '/enrollSystem/error',
        query: {
          code: res.resultCode
        }
      })
      return Promise.reject(new Error('链接有误'))
    }

    // BIM
    if (res.resultCode === 1) {
      res.message = res.resultMessage
      res.success = true
    }
    // 网校
    if (res.code === '1' || res.code === 1) {
      res.success = true
    }
    if (!res.success) {
      Toast({
        message: res.message || 'Error'
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      Toast.clear()
      return res && res.value ? res.value : res.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Toast({
      message: error.message || 'Error'
    })
    return Promise.reject(error)
  }
)

/**
 * 新签名规则
 * @deprecated 约定各个体系签名统一
 * @param {Object} dataBody
 */
const signPlusByMd5 = (dataBody = {}, options = {}) => {
  const {
    signKey = 'XTSIGNKEY', // 秘钥
    header = {}, // 自定义header
    signType = 'MD5' // 签名方式 默认md5
  } = options
  let xtapiValidateCdk = '' // 复杂对象属性
  let xtapiValidateCdkArr = '' // 复杂对象属性(数组)

  if (!dataBody) {
    return
  }

  var timeStamp = new Date().getTime()
  var dataTotal = {
    // 'xtapi-validate-channelNo': channelNo,
    // 'xtapi-validate-bizLine': bizLine,
    'xtapi-validate-timestamp': timeStamp,
    'xtapi-validate-nonce': Math.random()
      .toString(36)
      .substr(-10),
    ...header
  } // 签名数据

  for (var i in dataBody) {
    if ([null, undefined, ''].includes(dataBody[i])) {
      delete dataBody[i]
    }

    if (dataBody[i] instanceof Array) {
      dataBody[i] = JSON.stringify(dataBody[i])
      xtapiValidateCdkArr += `${i}|`
    } else if (typeof dataBody[i] === 'object') {
      dataBody[i] = JSON.stringify(dataBody[i])
      xtapiValidateCdk += `${i}|`
    }
  }

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

  function getSign (params) {
    const keys = Object.keys(params).sort()
    const arr = keys.map((key) => {
      return `${key}=${params[key]}`
    })
    return arr.join('&')
  }

  function paramsStrSort (paramsStr) {
    var newUrl = paramsStr + signKey
    // console.log('newUrl：' + newUrl)
    return md5(newUrl)
  }
}

// 上传图片
export const uploadImage = (file, options = { domain: 'ds' }) => {
// new 一个FormData格式的参数
  const params = new FormData()
  params.append('file', file)
  const config = {
    headers: { // 添加请求头
      'Content-Type': 'multipart/form-data'
    }
  }
  const uploadPath = getBaseUrl(options.domain) + '/data-service/file/upload'

  return new Promise((resolve, reject) => {
    // 把 uploadPath 换成自己的 上传路径
    axios.post(uploadPath, params, config).then(res => {
      console.log('uploadImage -> res', res)
      // 如果为真 resolve出去
      if (res && res.data && +res.data.resultCode === 1) {
        resolve(`https://umpfile.oss-cn-hangzhou.aliyuncs.com/${res.data.value}`)
      } else {
        // 否则 Toast 提示
        Toast.fail(res.data.resultMessage || '上传出错')
        reject(res.data)
      }
    }).catch(err => {
      Toast.fail('上传出错')
      reject(err)
    })
  })
}

export default service
