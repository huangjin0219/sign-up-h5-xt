/*
 * @Author: liushuainan
 * @Date: 2022-04-18 14:55:28
 * @LastEditors: jiangruohui
 * @LastEditTime: 2022-12-08 11:31:55
 * @Description:
 */
import request, { RequestConfigOptions } from '@/utils/request'
import { APP_TYPE, APP_TYPE_CODE, BIZ_TYPE, MINIPRO_APP_TYPE_CODE } from '@/config'
import { useMainStore } from '@/store'

/**
 * @method: queryStayOrderNum
 * @description: 待支付和待补费的订单数量
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function queryStayOrderNum(params = {}, options = <RequestConfigOptions>{}) {
  options = Object.assign(options, { login: true })
  return request({
    url: '/crm-business/order/queryStayOrderNum',
    method: 'post',
    data: params,
    options
  })
}

/**
 * @method: createOrder
 * @description: 创建订单
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export const createOrder = (
  params: {
    orderAmount?: number // 原价
    activityAmount?: number // 活动价
    shouldPayAmount?: number // 应付金额
    couponCode?: number // 优惠券编码
    discountAmount?: number // 优惠金额
    orderCreateProductList: Array<{ productCode: string; purchaseNum: number }> // 商品列表
    userAddressId?: number | string // 收货地址id
    channelId?: number // 运营渠道
    invitedStaffStationCode?: number // 员工id
    invitedStaffId?: number // 员工id
  },
  options = <RequestConfigOptions>{}
) => {
  options = Object.assign(options, { login: true })
  const mainStore = useMainStore()
  const appCode = mainStore.uaEnv === 'minipro' ? MINIPRO_APP_TYPE_CODE : APP_TYPE_CODE
  return request({
    url: '/crm-business/order/createOrder',
    method: 'post',
    data: { appType: APP_TYPE, appCode, bizType: BIZ_TYPE, ...params },
    options
  })
}

/**
 * @method: queryMyOrderList
 * @description: 查询我的订单列表
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function queryMyOrderList(
  params: { orderCombinationStatus?: number | null },
  options = <RequestConfigOptions>{}
) {
  options = Object.assign(options, { login: true })
  return request({
    url: '/crm-business/order/queryMyOrderList',
    method: 'post',
    data: params,
    options
  })
}

/**
 * @method: queryOrderDetail
 * @description: 查询订单详情
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function queryOrderDetail(params: { orderCode: string }, options = <RequestConfigOptions>{}) {
  options = Object.assign(options, { login: true })
  return request({
    url: '/crm-business/order/queryOrderDetail',
    method: 'post',
    data: params,
    options
  })
}

/**
 * @method: updateOrder
 * @description: 修改订单
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function updateOrder(
  params: { orderCode: string; userAddressId: number | string },
  options = <RequestConfigOptions>{}
) {
  options = Object.assign(options, { login: true })
  return request({
    url: '/crm-business/order/updateOrder',
    method: 'post',
    data: params,
    options
  })
}

/**
 * @method: cancelOrder
 * @description: 取消订单
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function cancelOrder(params: { orderCode: string }, options = <RequestConfigOptions>{}) {
  options = Object.assign(options, { login: true })
  return request({
    url: '/crm-business/order/cancelOrder',
    method: 'post',
    data: params,
    options
  })
}
/** ********************* 工单 ********************** */
/**
 * @method: endSuspension
 * @description: 复学
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function endSuspension(params: { userProductRightId: string }, options = <RequestConfigOptions>{}) {
  options = Object.assign(options, { login: true })
  return request({
    url: '/crm-business/order/endSuspension',
    method: 'post',
    data: params,
    options
  })
}

/**
 * @method: queryEndSuspensionExamTime
 * @description: 查询复学考试时间
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function queryEndSuspensionExamTime(params: { userProductRightId: string }, options = <RequestConfigOptions>{}) {
  options = Object.assign(options, { login: true })
  return request({
    url: '/crm-business/order/queryEndSuspensionExamTime',
    method: 'post',
    data: params,
    options
  })
}

/**
 * @method: applyContinuedReading
 * @description: 查询续读申请
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function queryContinuedReading(params: { userProductRightId: string }, options = <RequestConfigOptions>{}) {
  options = Object.assign(options, { login: true })
  return request({
    url: '/crm-business/order/queryContinuedReading',
    method: 'post',
    data: params,
    options
  })
}

/**
 * @method: applyProceedReading
 * @description: 提交续读申请
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function applyProceedReading(
  params: { userProductRightId: string; certificateUrls: Array<string> },
  options = <RequestConfigOptions>{}
) {
  options = Object.assign(options, { login: true })
  return request({
    url: '/crm-business/order/applyProceedReading',
    method: 'post',
    data: params,
    options
  })
}

/**
 * @method: queryChangeClassWorkOrderDetail
 * @description: 查询换课详情
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function queryChangeClassWorkOrderDetail(params: { workOrderId: string }, options = <RequestConfigOptions>{}) {
  options = Object.assign(options, { login: true })
  return request({
    url: '/crm-business/order/queryChangeClassWorkOrderDetail',
    method: 'post',
    data: params,
    options
  })
}

/**
 * @method: confirmChangeClassWorkOrder
 * @description: 确认换课
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function confirmChangeClassWorkOrder(
  params: { workOrderId: string; payAmount: number; userAddressId: number },
  options = <RequestConfigOptions>{}
) {
  options = Object.assign(options, { login: true })
  return request({
    url: '/crm-business/order/confirmChangeClassWorkOrder',
    method: 'post',
    data: params,
    options
  })
}

/** ********************* 支付 ********************** */
/**
 * @method: queryOrderForCashier
 * @description: 查询订单详情
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function queryOrderPaymentDetail(
  params: { orderCode: string; orderFlowCode?: string; userToken?: string },
  options = <RequestConfigOptions>{}
) {
  options = Object.assign(options, { login: true })
  return request({
    url: '/crm-business/order/queryOrderPaymentDetail',
    method: 'post',
    data: params,
    options
  })
}

/**
 * @method: queryPayChannel
 * @description: 收银台查支付方式
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function queryPayChannel(
  params: { payScene: number; appCode?: string; userToken?: string },
  options = <RequestConfigOptions>{}
) {
  const { payScene, appCode, userToken } = params
  return request({
    url: '/payment-business/cashier/queryPayChannel/v1',
    method: 'post',
    data: { payScene, appCode: appCode || APP_TYPE_CODE, userToken },
    options
  })
}

/**
 * @method: getOrderPaymentFlowCode
 * @description: 获取订单支付流水号
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function getOrderPaymentFlowCode(
  params: { amount?: number; orderCode: string },
  options = <RequestConfigOptions>{}
) {
  options = Object.assign(options, { login: true })
  return request({
    url: '/crm-business/order/getOrderPaymentFlowCode',
    method: 'post',
    data: params,
    options
  })
}

/**
 * @method: paymentOrder
 * @description: 订单支付
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function paymentOrder(
  params: {
    amount?: number
    bizAttach?: string // 业务方附带信息
    cashierNo?: string // 收银台编号 第一次创建时为空
    orderCode: string // 订单编号
    orderFlowCode?: string // 订单流水编号
    payExpireTime?: string // 支付过期时间
    title?: string // 支付标题
    payKernelParam?: {
      appCode: string // 支付应用
      ip?: string // 地址
      payAccount?: string // 用户支付账户, 比如openId
      payChannel: 1 | 2 | 100 // 支付渠道(PayChannelEnum),枚举值:[1:微信,2:支付宝,100:其他]
      payRouteId: number // 支付路由
      payScene: number // 支付场景(PaySceneEnum),枚举值:[1:pc,2:手机浏览器h5,3:扫码支付,4:小程序,5:app,6:微信jsapi,99:无载体]
      returnUrl: string // 网页支付跳转地址
    }
    thirdCode?: string
    userToken?: string
  },
  options = <RequestConfigOptions>{}
) {
  options = Object.assign(options, { login: true })
  return request({
    url: '/crm-business/order/paymentOrder',
    method: 'post',
    data: { ...params, bizType: BIZ_TYPE, appType: APP_TYPE, appCode: APP_TYPE_CODE },
    options
  })
}

/**
 * @method: queryPrePayDetail
 * @description: 查询预付款详情
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function queryPrePayDetail(params: { prePaymentNo: string }, options = <RequestConfigOptions>{}) {
  options = Object.assign(options, { login: true })
  return request({
    url: '/crm-business/prePay/queryPrePayDetail',
    method: 'post',
    data: params,
    options
  })
}

/**
 * @method: queryPrePayDetail
 * @description: 预支付-支付
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function paymentPrePay(
  params: {
    bizAttach?: string // 业务方附带信息
    prePaymentNo: string // 预支付编号
    payExpireTime?: string // 支付过期时间
    payKernelParam?: {
      appCode: string // 支付应用
      ip?: string // 地址
      payAccount?: string // 用户支付账户, 比如openId
      payChannel: 1 | 2 | 100 // 支付渠道(PayChannelEnum),枚举值:[1:微信,2:支付宝,100:其他]
      payRouteId: number // 支付路由
      payScene: number // 支付场景(PaySceneEnum),枚举值:[1:pc,2:手机浏览器h5,3:扫码支付,4:小程序,5:app,6:微信jsapi,99:无载体]
      returnUrl: string // 网页支付跳转地址
    }
    title?: string // 支付标题
    thirdCode?: string
  },
  options = <RequestConfigOptions>{}
) {
  options = Object.assign(options, { login: true })
  return request({
    url: '/crm-business/prePay/pay',
    method: 'post',
    data: { ...params, bizType: BIZ_TYPE, appType: APP_TYPE, appCode: APP_TYPE_CODE },
    options
  })
}
/** ********************* 支付 end ********************** */

/**
 * @method: setTopProduct
 * @description: 置顶
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function setTopProduct(
  params: { userProductRightId: string; whetherTop: number },
  options = <RequestConfigOptions>{}
) {
  options = Object.assign(options, { login: true })
  return request({
    url: '/crm-business/order/setTopProduct',
    method: 'post',
    data: params,
    options
  })
}
