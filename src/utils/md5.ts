/* eslint-disable no-bitwise */
import { hex } from 'js-md5'

/**
 * 新签名规则
 * @deprecated 约定各个体系签名统一
 * @param {Object} dataBody
 */
export const signPlusByMd5 = (dataBody: any = {}, options: any = {}) => {
  const {
    signKey, // 秘钥
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

  // for (const i in dataBody) {
  //   // 空传 传入
  //   if ([null, undefined].includes(dataBody[i])) {
  //     delete dataBody[i]
  //   }
  //   if (Object.prototype.toString.call(dataBody[i]) === '[object Date]') {
  //     delete dataBody[i]
  //   }

  //   if (Array.isArray(dataBody[i])) {
  //     dataBody[i] = JSON.stringify(dataBody[i])
  //     xtapiValidateCdkArr += `${i}|`
  //   } else if (typeof dataBody[i] === 'object') {
  //     dataBody[i] = JSON.stringify(dataBody[i])
  //     xtapiValidateCdk += `${i}|`
  //   }
  // }
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

  // dataTotal['xtapi-validate-body'] = getSign(dataBody)

  // 复杂对象header添加字段
  if (xtapiValidateCdk.length) {
    xtapiValidateCdk = xtapiValidateCdk.substr(0, xtapiValidateCdk.length - 1)
    // dataTotal['xtapi-validate-cdk'] = xtapiValidateCdk
    dataTotal['xtapi-validate-complex-params'] = xtapiValidateCdk
  }
  if (xtapiValidateCdkArr.length) {
    xtapiValidateCdkArr = xtapiValidateCdkArr.substr(0, xtapiValidateCdkArr.length - 1)
    // dataTotal['xtapi-validate-cdk'] = xtapiValidateCdk
    dataTotal['xtapi-validate-complex-array-params'] = xtapiValidateCdkArr
  }

  // const signStr =
  //   Object.keys(dataBody).length === 0
  //     ? getSign(dataTotal)
  //     : `${getSign(dataBody)}&${getSign(dataTotal)}`
  // console.info("加签Body", dataBody)
  // console.info("加签xtapi-xxx参数", dataTotal)
  // console.info("加签整体", { ...dataBody, ...dataTotal })
  const signStr = getSign({ ...dataBody, ...dataTotal })
  // console.info("加签排序后", signStr)

  const sign = paramsStrSort(signStr) // 获取签名sign
  // var sign = paramsStrSort(`${getSign(dataBody)}&${getSign(dataTotal)}`) // 获取签名sign

  // delete dataTotal['xtapi-validate-body']
  dataTotal['xtapi-validate-signature'] = sign
  dataTotal['xtapi-validate-signtype'] = signType
  return dataTotal

  function getSign(params: any) {
    const keys = Object.keys(params).sort()
    const arr = keys.map((key) => {
      return `${key}=${params[key]}`
    })
    return arr.join('&')
  }

  function paramsStrSort(paramsStr: any) {
    const newUrl = paramsStr + signKey
    //  console.log('newUrl：' + newUrl)
    return hex(newUrl)
  }
}

/**
 * @description 获取请求的唯一uuid
 * @param {Number} len 长度
 * @param {String} radix 基数
 */
export function generateUUid(len?: any, radix?: any) {
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
    uuid[8] = '-'
    uuid[13] = '-'
    uuid[18] = '-'
    uuid[23] = '-'
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
