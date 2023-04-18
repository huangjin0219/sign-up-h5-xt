/*
 * @Author: jiangruohui
 * @Date: 2020-07-09 14:31:57
 * @LastEditors: 曹双双
 * @LastEditTime: 2023-03-21 11:18:27
 * @Description:
 */
import wx from 'weixin-js-sdk' // SDK依赖
import { getJsSdkSignature } from '@/common/api/index'

export default {
  init: (apiList = [], url, tagList = []) => {
    // 需要使用的api列表
    // const u = navigator.userAgent.toLowerCase()
    // const isIOS = u.indexOf('iphone') > -1 // 判断是否是ios微信
    return new Promise((resolve, reject) => {
      getJsSdkSignature({
        // 从后台获取签名相关的接口
        // url: url || (isIOS ? window.jsUrl : window.location.href) // 配置签名的URL
        url: url || window.location.href // 配置签名的URL
      }).then(
        (res) => {
          // console.log('init -> url==========', url || window.location.href)
          // console.log('init -> res================', res)
          const { appId, timestamp, nonceStr, signature } = res.data
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId, // 必填，企业号的唯一标识，此处填写企业号corpid
            timestamp, // 必填，生成签名的时间戳
            nonceStr, // 必填，生成签名的随机串
            signature, // 必填，签名，见附录1
            jsApiList: apiList, // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            openTagList: tagList // 可选，需要使用的开放标签列表
          })
          wx.ready((res) => {
            // 微信SDK准备就绪后执行的回调。
            // console.log('init -> 微信SDK准备就绪后执行的回调', res)
            resolve(wx, res)
          })
        },
        (err) => {
          reject(err)
        }
      )
    })
  }
}
