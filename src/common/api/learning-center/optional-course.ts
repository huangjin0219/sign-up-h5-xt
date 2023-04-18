import request, { RequestConfigOptions } from '@/utils/request'
// import { BIZ_TYPE, APP_TYPE, APP_TYPE_CODE, CRM_CHANNEL_FIRST, CRM_CHANNEL_SECOND } from '@/config'

/**
 * @description: 查询我的自选商品详情
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function queryUserOptionalStatistics(params: object, options = <RequestConfigOptions>{}) {
  options = Object.assign(options, { login: true })
  return request({
    url: '/crm-business/order/queryUserOptionalStatistics',
    method: 'post',
    data: params,
    options
  })
}

/**
 * @description: 查询用户自选商品已选择的子商品列表
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function queryUserProductSelectedList(params: object, options = <RequestConfigOptions>{}) {
  options = Object.assign(options, { login: true })
  return request({
    url: '/crm-business/order/queryUserProductSelectedList',
    method: 'post',
    data: params,
    options
  })
}

/**
 * @description: 查询用户自选商品可选择的子商品列表
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function queryUserProductCanSelectedList(params: object, options = <RequestConfigOptions>{}) {
  options = Object.assign(options, { login: true })
  return request({
    url: '/crm-business/order/queryUserProductCanSelectedList',
    method: 'post',
    data: params,
    options
  })
}

/**
 * @description: 查询单个商品详情页
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function queryProductDetail(params: object, options = <RequestConfigOptions>{}) {
  options = Object.assign(options, { login: true })
  return request({
    url: '/zeus/product/queryProductDetail',
    method: 'post',
    data: params,
    options
  })
}

/**
 * @description: 根据商品编号查询考试省份列表
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function queryProductProvinceList(params: object, options = <RequestConfigOptions>{}) {
  options = Object.assign(options, { login: true })
  return request({
    url: '/zeus/product/queryProductProvinceList',
    method: 'post',
    data: params,
    options
  })
}

/**
 * @description: 用户自选商品子商品有效期
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function queryUserOptionalProductEffectiveTime(params: object, options = <RequestConfigOptions>{}) {
  options = Object.assign(options, { login: true })
  return request({
    url: '/crm-business/order/queryUserOptionalProductEffectiveTime',
    method: 'post',
    data: params,
    options
  })
}

/**
 * @description: 商品开课
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function openOrderCourse(params: object, options = <RequestConfigOptions>{}) {
  options = Object.assign(options, { login: true })
  return request({
    url: '/crm-business/order/openOrderCourse',
    method: 'post',
    data: params,
    options
  })
}

/**
 * @description: 自选商品开课
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function saveUserOptionalProductSelected(params: object, options = <RequestConfigOptions>{}) {
  options = Object.assign(options, { login: true })
  return request({
    url: '/crm-business/order/saveUserOptionalProductSelected',
    method: 'post',
    data: params,
    options
  })
}
