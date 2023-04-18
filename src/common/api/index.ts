/*
 * @Author: jiangruohui
 * @Date: 2022-07-12 14:49:44
 * @LastEditors: jiangruohui
 * @LastEditTime: 2023-03-15 13:01:17
 * @Description:
 */

import request, { RequestConfigOptions } from '@/utils/request'
import { APP_TYPE_CODE } from '@/config'
import { AdvJumpType } from '@/utils/enum'
import { Advert } from '@/typings/advert'

/**
 * @method: getJsSdkSignature
 * @description: 获取微信jsApi签名信息
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function getJsSdkSignature(params: { url: string }, options = <RequestConfigOptions>{}) {
  return request({
    url: `/uic/platform/getJsSdkSignature`,
    method: 'post',
    data: { appTypeCode: APP_TYPE_CODE, ...params },
    options
  })
}

/**
 * @method: getInspectTeacherInfo
 * @description: 获取相应督学老师信息
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function getInspectTeacherInfo(params = {}, options = <RequestConfigOptions>{}) {
  options = Object.assign(options, { login: true })
  return request({
    url: `/crm-business/inspector/getInspectTeacherInfoByUserToken`,
    method: 'post',
    data: params,
    options
  })
}

/**
 * @method: queryQrCodeScene
 * @description: 查询二维码
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function queryQrCodeScene(
  params: { query: string; sceneCode: string; sceneQrCodeId?: string },
  options = <RequestConfigOptions>{}
) {
  return request({
    url: `/marketing-business/qrCode/queryQrCodeScene`,
    method: 'post',
    data: { ...params },
    options
  })
}

/**
 * @param {*} adUniqueToken // 广告位
 * @param {*} projectCode // 二级类目
 */
export function queryAd(params: { adUniqueToken: string; projectCode: string }, options = <RequestConfigOptions>{}) {
  return new Promise((resolve, reject) => {
    try {
      request({
        url: '/zeus/ad/queryAdList',
        method: 'post',
        data: { ...params },
        options
      }).then(
        (res: any) => {
          if (res.data && res.data.length) {
            res.data.forEach((item: Advert) => {
              if (item.jumpType !== AdvJumpType.Weburl) {
                item.adJumpUrl = null
              }
            })
          }
          resolve(res)
        },
        (error) => {
          reject(error)
        }
      )
    } catch (error) {
      reject(error)
    }
  })
}

/** ********************** 类目 ************************ */
// 查询业务线下配置的类目（查询该节点及其子节点的信息）
export function queryCategoryList(params = {}, options = <RequestConfigOptions>{}) {
  return request({
    url: '/zeus/category/queryListByBizType',
    method: 'post',
    data: params,
    options
  })
}

/**
 * @method: shareArrive
 * @description: 分享触达
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 * {
 *    shareId: number, // 分享ID
 *    uuId?: string, // 匿名用户ID
 *    userToken?: string, // 用户token
 * }
 */
export function shareArrive(params = {}, options = <RequestConfigOptions>{}) {
  options = Object.assign(options, { login: true })
  return request({
    url: '/marketing-business/share/shareArrive',
    method: 'post',
    data: { arriveAppCode: APP_TYPE_CODE, ...params },
    options
  })
}

/**
 * 生成小程序码
 */
export function queryDimensionalBarcodeBase64(params = {}, options = <RequestConfigOptions>{}) {
  return request({
    url: '/zeus/pageShare/queryDimensionalBarcodeBase64',
    method: 'post',
    data: params,
    options
  })
}
