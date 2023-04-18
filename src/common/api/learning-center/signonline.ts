/*
 * @Author: liushuainan
 * @Date: 2022-04-18 14:55:28
 * @LastEditors: jiangruohui
 * @LastEditTime: 2022-11-15 09:50:04
 * @Description:
 */
import request, { RequestConfigOptions } from '@/utils/request'
// import { APP_TYPE } from '@/config'

/**
 * @method: getMySignOrderFile
 * @description: 我的网签合同列表
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export const getMySignOrderFile = (params = {}, options = <RequestConfigOptions>{}) => {
  options = Object.assign(options, { login: true })
  return request({
    url: '/crm-business/signonline/getMySignOrderFile',
    method: 'post',
    data: params,
    options
  })
}

/**
 * @method: getSignOrderByCode
 * @description: 根据订单编号查询网签信息
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export const getSignOrderByCode = (params: { orderCode: string }, options = <RequestConfigOptions>{}) => {
  options = Object.assign(options, { login: true })
  return request({
    url: '/crm-business/signonline/getSignOrderByCode',
    method: 'post',
    data: params,
    options
  })
}

/**
 * @method: getUserRealNameByUserId
 * @description: 根据用户id查询实名信息
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export const getUserRealNameByUserId = (params = {}, options = <RequestConfigOptions>{}) => {
  options = Object.assign(options, { login: true })
  return request({
    url: '/crm-business/signonline/getUserRealNameByUserId',
    method: 'post',
    data: params,
    options
  })
}

/**
 * @method: createTelecom3
 * @description: 发起运营商3要素核身认证
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export const createTelecom3 = (
  params: { idNo: string; mobileNo: string; name: string },
  options = <RequestConfigOptions>{}
) => {
  options = Object.assign(options, { login: true })
  return request({
    url: '/crm-business/signonline/createTelecom3',
    method: 'post',
    data: params,
    options
  })
}

/**
 * @method: createTelecom3Confirm
 * @description: 发起运营商3要素短信确认
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export const createTelecom3Confirm = (
  params: { flowId: string; authCode: string },
  options = <RequestConfigOptions>{}
) => {
  options = Object.assign(options, { login: true })
  return request({
    url: '/crm-business/signonline/createTelecom3Confirm',
    method: 'post',
    data: params,
    options
  })
}

/**
 * @method: faceIdentity
 * @description: 发起个人刷脸核身认证
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export const faceIdentity = (
  params: { idNo: string; name: string; mobile: string; callbackUrl: string },
  options = <RequestConfigOptions>{}
) => {
  options = Object.assign(options, { login: true })
  return request({
    url: '/crm-business/signonline/faceIdentity',
    method: 'post',
    data: params,
    options
  })
}

/**
 * @method: onesign
 * @description: 签署方式为一步发起签署
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export const onesign = (params: { orderCode: string; extend?: string }, options = <RequestConfigOptions>{}) => {
  options = Object.assign(options, { login: true })
  return request({
    url: '/crm-business/signonline/onesign',
    method: 'post',
    data: params,
    options
  })
}
