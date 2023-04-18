/*
 * @Author: jiangruohui
 * @Date: 2022-04-07 11:52:01
 * @LastEditors: 曹双双
 * @LastEditTime: 2023-03-16 16:39:27
 * @Description: 课程相关API
 */
import request, { RequestConfigOptions } from '@/utils/request'
import { APP_TYPE_CODE, MINIPRO_APP_TYPE_CODE } from '@/config'
import { useMainStore } from '@/store'

/**
 * @method: queryUserProductCategory
 * @description: 我的类目
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function queryUserProductCategory(params = {}, options = <RequestConfigOptions>{}) {
  options = Object.assign(options, { login: true })
  return request({
    url: '/crm-business/order/queryUserProductCategory',
    method: 'post',
    data: { ...params },
    options
  })
}

/**
 * @method: queryUserProductList
 * @description: 查询我的商品列表
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function queryUserProductList(params: { projectCode?: string }, options = <RequestConfigOptions>{}) {
  options = Object.assign(options, { login: true })
  return request({
    url: '/crm-business/order/queryUserProductList',
    method: 'post',
    data: { ...params },
    options
  })
}

/**
 * @method: queryProductGroupList
 * @description: 查询商品组合列表
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function queryProductGroupList(
  params: {
    attendClassTypes?: number[]
    productCodes?: string[]
    projectCodes?: string[]
    pageSize: number
    pageNum: number
  },
  options = <RequestConfigOptions>{}
) {
  options = Object.assign(options, { login: true })
  return request({
    url: '/zeus/product/queryProductGroupList',
    method: 'post',
    data: { ...params },
    options
  })
}

/**
 * @Author: jiangruohui
 * @method: queryProductGroupDetail
 * @description: 查询商品组合详情
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function queryProductGroupDetail(params: { productGroupCode: string }, options = <RequestConfigOptions>{}) {
  options = Object.assign(options, { login: true })
  return request({
    url: '/zeus/product/queryProductGroupDetail',
    method: 'post',
    data: { ...params },
    options
  })
}

/**
 * @Author: jiangruohui
 * @method: queryPreOrderProductList
 * @description: 查询下单商品列表
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function queryPreOrderProductList(
  params: {
    products: Array<{ productCode: string; productCount: number }>
    activity?: { activityId: string; activityItemId: string }
    couponsCode?: string
    autoSelectCoupon?: boolean // 不传优惠券编号时，是否自动选择一张
  },
  options = <RequestConfigOptions>{}
) {
  options = Object.assign(options, { login: true })
  const mainStore = useMainStore()
  const appCode = mainStore.uaEnv === 'minipro' ? MINIPRO_APP_TYPE_CODE : APP_TYPE_CODE
  return request({
    url: '/zeus/product/queryPreOrderProductList',
    method: 'post',
    data: { ...params, appCode },
    options
  })
}

/**
 * @Author: jiangruohui
 * @method: queryVideoCourseDetail
 * @description: 查询录播详情
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 */
export function queryVideoCourseDetail(
  params: { courseCode: string; packageCode: string },
  options = <RequestConfigOptions>{}
) {
  options = Object.assign(options, { login: true })
  return request({
    url: '/zeus/course/queryVideoCourseDetail',
    method: 'post',
    data: { ...params },
    options
  })
}

/**
 * 查询直播详情
 */
export function queryLiveCourseDetail(
  params: { courseCode: string; packageCode: string },
  options = <RequestConfigOptions>{}
) {
  options = Object.assign(options, { login: true })
  return request({
    url: '/zeus/course/queryLiveCourseDetail',
    method: 'post',
    data: { ...params },
    options
  })
}

/**
 * 根据商品预览合同
 */
export function contractPreview(
  params: { productCode: string; shouldPayAmount: number },
  options = <RequestConfigOptions>{}
) {
  options = Object.assign(options, { login: true })
  return request({
    url: '/crm-business/contract/preview',
    method: 'post',
    data: { ...params },
    options
  })
}

/**
 * 选择考区
 */
export function choiceExamArea(
  params: {
    cityId: string // 市id
    provinceId: number // 省份id
    userProductRightId: string
  },
  options = <RequestConfigOptions>{}
) {
  options = Object.assign(options, { login: true })
  return request({
    url: '/crm-business/order/choiceExamArea',
    method: 'post',
    data: { ...params },
    options
  })
}

/**
 * 直播日历
 */
export function queryLivingDirectoryList(params = {}, options = <RequestConfigOptions>{}) {
  options = Object.assign(options, { login: true })
  return request({
    url: '/zeus/package/queryLivingDirectoryList',
    method: 'post',
    data: { ...params },
    options
  })
}
