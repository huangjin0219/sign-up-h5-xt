/*
 * @Author: jiangruohui
 * @Date: 2022-03-24 15:12:21
 * @LastEditors: jiangruohui
 * @LastEditTime: 2023-03-16 16:16:00
 * @Description:
 */
import request, { RequestConfigOptions } from '@/utils/request'
import { BIZ_TYPE, APP_TYPE, APP_TYPE_CODE, MINIPRO_APP_TYPE, MINIPRO_APP_TYPE_CODE } from '@/config'
import { useMainStore } from '@/store'

interface baseParams {
  activityId?: string // 活动Id
  activityName?: string // 活动名称
  invitedUserId?: string // 邀请人用户ID
  invitedStaffStationCode?: string // 邀请员工Code
  sourceThirdChannelCode?: string // 运营渠道ID
  sourceIntentionCodes?: string[] // 感兴趣的意向
}

export interface RegisterOrLoginParams extends baseParams {
  mobile: string
  verificationCode?: string
  password?: string
  loginVerificationType: 2 | 3 // 登录验证类型(2手机号验证码，3手机号密码)
  loginOperationType: 1 | 2 | 3 // 登录操作类型（1:登录，2:注册，3:登录或注册）
  // 固定值
  bizType?: number // 接口必传
  appType?: number // 接口必传
  appCode?: string // 接口必传
  appVersion: string
}

export interface WxLoginParams extends baseParams {
  accessInfo?: any
  thirdCode?: string
  mobile?: string
  verificationCode?: string
}

export interface BindPhoneParams extends baseParams {
  userAuthsId: string
  mobile?: string
  verificationCode?: string
}

/**
 * @Author: jiangruohui
 * @method: registerOrLogin
 * @description: 注册或登录
 * @param {RegisterOrLoginParams} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function registerOrLogin(params: RegisterOrLoginParams, options = <RequestConfigOptions>{}) {
  return request({
    url: '/uic/newUser/loginRegister',
    method: 'post',
    data: {
      bizType: BIZ_TYPE,
      appType: APP_TYPE,
      appCode: APP_TYPE_CODE,
      ...params
    },
    options
  })
}

/**
 * @Author: jiangruohui
 * @method: fetchCaptcha
 * @description: 获取验证码
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function fetchCaptcha(params: { mobile: string }, options = <RequestConfigOptions>{}) {
  return request({
    url: '/uic/verifyCode/sendLoginVerifyCode',
    method: 'post',
    data: { ...params, bizType: BIZ_TYPE },
    options
  })
}

// 注册发送验证码
export function fetchRegisterCaptcha(params: { mobile: string }, options = <RequestConfigOptions>{}) {
  return request({
    url: '/uic/verifyCode/sendRegisterVerifyCode',
    method: 'post',
    data: { ...params, bizType: BIZ_TYPE },
    options
  })
}

/**
 * @Author: jiangruohui
 * @method: weChatAuthorization
 * @description: 用户微信授权
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function weChatAuthorization(params: WxLoginParams, options = <RequestConfigOptions>{}) {
  return request({
    url: '/uic/newUser/weChatAuthorization',
    method: 'post',
    data: { ...params, bizType: BIZ_TYPE, appType: APP_TYPE, appCode: APP_TYPE_CODE },
    options
  })
}

/**
 * @Author: jiangruohui
 * @method: authorizationBindAccount
 * @description: 用户第三方授权绑定账号
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function authorizationBindAccount(params: BindPhoneParams, options = <RequestConfigOptions>{}) {
  return request({
    url: '/uic/newUser/authorizationBindAccount',
    method: 'post',
    data: { ...params, bizType: BIZ_TYPE, appType: APP_TYPE, appCode: APP_TYPE_CODE },
    options
  })
}

/**
 * @Author: jiangruohui
 * @method: fetchLogout
 * @description: 退出登录
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function fetchLogout(params: { userToken: string }, options = <RequestConfigOptions>{}) {
  return request({
    url: '/uic/user/logout',
    method: 'post',
    data: { ...params, bizType: BIZ_TYPE, appType: APP_TYPE },
    options
  })
}

/**
 * @Author: jiangruohui
 * @method: queryUserInfo
 * @description: 根据token查询用户信息
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function queryUserInfo(params: { userToken: string }, options = <RequestConfigOptions>{}) {
  return request({
    url: '/uic/newUser/userInfo',
    method: 'post',
    data: { ...params },
    options
  })
}

/**
 * @method: authLogin
 * @description: 用户重新分配
 * @param {object}
 * {
 *  ... // 同登录接口通用参数一致
 *  bizType?: number
 *  appType?: number
 *  appCode?: string
 *  userToken: ""
 * }
 */
export function userReassign(params: baseParams, options = {}) {
  options = Object.assign(options, { login: true })
  const mainStore = useMainStore()
  const appCode = mainStore.uaEnv === 'minipro' ? MINIPRO_APP_TYPE_CODE : APP_TYPE_CODE
  const appType = mainStore.uaEnv === 'minipro' ? MINIPRO_APP_TYPE : APP_TYPE
  return request({
    url: '/uic/newUser/userReassign',
    method: 'post',
    data: { ...params, bizType: BIZ_TYPE, appType, appCode },
    options
  })
}
