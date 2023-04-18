/*
 * @Author: liushuainan
 * @Date: 2022-04-08 14:21:17
 * @LastEditors: jiangruohui
 * @LastEditTime: 2022-11-28 09:48:51
 * @Description:
 */
import request, { RequestConfigOptions } from '@/utils/request'
import { BIZ_TYPE, APP_TYPE_CODE, MINIPRO_APP_TYPE_CODE } from '@/config'
import { useMainStore } from '@/store'

const applyUrl = '/marketing-business'
// const applyUrl = ''
/**
 * @method: queryUserCouponsList
 * @description: 查询用户优惠券列表
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function queryUserCouponsList(params: { bizType: number }, options = <RequestConfigOptions>{}) {
  options = Object.assign(options, { login: true })
  return request({
    url: `${applyUrl}/coupons/queryUserCouponsList`,
    method: 'post',
    data: { ...params },
    options
  })
}

/**
 * @method: queryUserCouponsDetail
 * @description: 查询已选商品可用优惠券列表
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function queryUserCouponsDetail(params: { couponsCode: string }, options = <RequestConfigOptions>{}) {
  options = Object.assign(options, { login: true })
  return request({
    url: `${applyUrl}/coupons/queryUserCouponsDetail`,
    method: 'post',
    data: { ...params },
    options
  })
}

/**
 * @method: queryProductCouponsList
 * @description: 查询商品可用优惠券列表
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function queryProductCouponsList(
  params: { productCodes?: string[]; productGroupCode?: string },
  options = <RequestConfigOptions>{}
) {
  options = Object.assign(options, { login: true })
  const mainStore = useMainStore()
  const appCode = mainStore.uaEnv === 'minipro' ? MINIPRO_APP_TYPE_CODE : APP_TYPE_CODE
  return request({
    url: `${applyUrl}/coupons/queryProductCouponsList`,
    method: 'post',
    data: { ...params, bizType: BIZ_TYPE, appCode },
    options
  })
}

/**
 * @method: queryUserProductCouponsByProductCodes
 * @description: 根据商品编号查询用户可用的优惠券列表
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function queryUserProductCouponsByProductCodes(
  params: {
    products: Array<{ productCode: string; productCount: number }>
    activity?: { activityId: string; activityItemId: string }
  },
  options = <RequestConfigOptions>{}
) {
  options = Object.assign(options, { login: true })
  return request({
    url: `${applyUrl}/coupons/queryUserProductCouponsByProductCodes`,
    method: 'post',
    data: { ...params, bizType: BIZ_TYPE },
    options
  })
}

/**
 * @method: receiveCoupons
 * @description: 领取优惠券
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function receiveCoupons(
  params: { couponsTemplateId: number; issueCouponsId: number },
  options = <RequestConfigOptions>{}
) {
  options = Object.assign(options, { login: true })
  const mainStore = useMainStore()
  const appCode = mainStore.uaEnv === 'minipro' ? MINIPRO_APP_TYPE_CODE : APP_TYPE_CODE
  return request({
    url: `${applyUrl}/coupons/receiveCoupons`,
    method: 'post',
    data: { ...params, appCode },
    options
  })
}

/**
 * @method: receiveExchangeCodeCoupons
 * @description: 根据兑换码领取优惠券
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function receiveExchangeCodeCoupons(params: { exchangeCode: string }, options = <RequestConfigOptions>{}) {
  options = Object.assign(options, { login: true })
  return request({
    url: `${applyUrl}/coupons/receiveExchangeCodeCoupons`,
    method: 'post',
    data: { ...params },
    options
  })
}
