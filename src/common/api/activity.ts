/*
 * @Author: jiangruohui
 * @Date: 2020-12-02 09:46:13
 * @LastEditors: jiangruohui
 * @LastEditTime: 2023-03-15 17:24:23
 * @Description:
 */
import { BIZ_TYPE, APP_TYPE, APP_TYPE_CODE } from '@/config/index'
import request, { RequestConfigOptions } from '@/utils/request'

/** ********************* 邀请注册 ********************** */
/**
 * @method: queryInvitationRegisterActivityList
 * @description: 查询邀请注册活动列表 - 销售端
 */
export function queryInvitationRegisterActivityList(
  params: { pageNum: number; pageSize: number; projectCode: string; userToken: string },
  options = <RequestConfigOptions>{}
): Promise<any> {
  return request({
    url: '/marketing-business/invitationRegisterActivity/queryInvitationRegisterActivityList',
    method: 'post',
    data: { ...params },
    options
  })
}

/**
 * @method: queryInvitationRegisterActivityDetail
 * @description: 查询邀请注册活动详情 - 销售端/用户端
 */
export function queryInvitationRegisterActivityDetail(
  params: { activityId: string; userToken?: string },
  options = <RequestConfigOptions>{}
): Promise<any> {
  options = Object.assign(options, { login: !!params.userToken })
  return request({
    url: '/marketing-business/invitationRegisterActivity/queryInvitationRegisterActivityDetail',
    method: 'post',
    data: { ...params },
    options
  })
}

/**
 * @method: queryInvitationRegisterActivityDetail
 * @description: 查询邀请注册活动数据列表 - 销售端
 */
export function queryInvitationRegisterActivityDataList(
  params: { pageNum: number; pageSize: number; activityId: string; userToken: string },
  options = <RequestConfigOptions>{}
): Promise<any> {
  return request({
    url: '/marketing-business/invitationRegisterActivity/queryInvitationRegisterActivityDataList',
    method: 'post',
    data: { ...params },
    options
  })
}

/**
 * @method: bindStaff
 * @description: 注册邀请活动员工绑定
 */
export function bindStaff(
  params: { activityId: string; invitedStaffStationCode: string; userToken: string },
  options = <RequestConfigOptions>{}
): Promise<any> {
  return request({
    url: '/marketing-business/invitationRegisterActivity/bindStaff',
    method: 'post',
    data: { ...params },
    options
  })
}
/** ********************* 邀请注册 end ********************** */

/** ********************* 扫码获课 ********************** */
/**
 * @method: scanForClassExchangePrize
 * @description: 兑换奖品
 */
export function scanForClassExchangePrize(
  params: { activityId: string; prizeIds: string[] },
  options = <RequestConfigOptions>{}
): Promise<any> {
  options = Object.assign(options, { login: true })
  return request({
    url: '/marketing-business/scanForClass/exchangePrize',
    method: 'post',
    data: { ...params, appType: APP_TYPE },
    options
  })
}

/**
 * @method: scanForClassPrizeProjectListQuery
 * @description: 查询可兑换的项目列表
 */
export function scanForClassPrizeProjectListQuery(
  params: { activityId: string },
  options = <RequestConfigOptions>{}
): Promise<any> {
  options = Object.assign(options, { login: true })
  return request({
    url: '/marketing-business/scanForClass/prizeProjectListQuery',
    method: 'post',
    data: { ...params },
    options
  })
}

/**
 * @method: scanForClassPrizeListQuery
 * @description: 获取可选奖品
 */
export function scanForClassPrizeListQuery(
  params: { activityId: string; projectCode: string },
  options = <RequestConfigOptions>{}
): Promise<any> {
  options = Object.assign(options, { login: true })
  return request({
    url: '/marketing-business/scanForClass/queryUsingPrizeList',
    method: 'post',
    data: { ...params },
    options
  })
}

/**
 * @method: scanForClassReceiveCheck
 * @description: 是否已经领取奖励（0:未领取 1：已领取）
 */
export function scanForClassReceiveCheck(
  params: { activityId: string },
  options = <RequestConfigOptions>{}
): Promise<any> {
  options = Object.assign(options, { login: true })
  return request({
    url: '/marketing-business/scanForClass/receiveCheck',
    method: 'post',
    data: { ...params },
    options
  })
}
/** ********************* 扫码获课 end ********************** */

/*
 * @method: saleJoinGroupUserList
 * @description: 查询活动下当销售的所有参团用户列表（销售专用）
 */
export function saleJoinGroupUserList(
  params: {
    activityId: number
    userToken?: string
  },
  options = <RequestConfigOptions>{}
): Promise<any> {
  options = Object.assign(options)
  return request({
    url: '/marketing-business/group/saleJoinGroupUserList',
    method: 'post',
    data: { ...params },
    options
  })
}
/** ********************* 扫码获课 end ********************** */
/** ********************* 拼团活动 ********************** */
/**
 * @method: queryGroupList
 * @description: 查询拼团活动列表
 */
export function queryGroupList(
  params: {
    activityTypeEnum?: number
    alreadyJoin?: number
    bizType?: number
    tokenUserId?: number
    userToken?: string
    projectCode?: string
  },
  options = <RequestConfigOptions>{}
): Promise<any> {
  options = Object.assign(options)
  return request({
    url: '/marketing-business/group/queryGroupList',
    method: 'post',
    data: { bizType: BIZ_TYPE, ...params },
    options
  })
}

/**
 * @method: queryGroupList
 * @description: 查询拼团活动项目编号
 */
export function queryGroupActivityProjectCode(params = {}, options = <RequestConfigOptions>{}): Promise<any> {
  options = Object.assign(options)
  return request({
    url: '/marketing-business/group/queryGroupActivityProjectCode',
    method: 'post',
    data: { ...params },
    options
  })
}
/** ********************* 拼团活动 end ********************** */

/** ********************* 免费领取课程 ********************** */
/**
 * @method: activityVisit
 * @description: 活动访问记录
 */
export function activityVisit(
  params: {
    activityId: string
    userToken?: string
  },
  options = <RequestConfigOptions>{}
): Promise<any> {
  options = Object.assign(options, { login: true })
  return request({
    url: '/marketing-business/activity/activityVisit',
    method: 'post',
    data: { appCode: APP_TYPE_CODE, ...params },
    options
  })
}
/**
 * @method: queryFreeClassesDetail
 * @description: 查询赠课活动详情
 */
export function queryFreeClassesDetail(
  params: { activityId: string },
  options = <RequestConfigOptions>{}
): Promise<any> {
  options = Object.assign(options)
  return request({
    url: '/marketing-business/freeClasses/queryFreeClassesDetail',
    method: 'post',
    data: { appCode: APP_TYPE_CODE, ...params },
    options
  })
}
/**
 * @method: receiveFreeClassesProduct
 * @description: 领取赠课活动商品
 */
export function receiveFreeClassesProduct(
  params: {
    activityId: string
    productCode: string
    userToken?: string
  },
  options = <RequestConfigOptions>{}
): Promise<any> {
  options = Object.assign(options, { login: true })
  return request({
    url: '/marketing-business/freeClasses/receiveFreeClassesProduct',
    method: 'post',
    data: { ...params },
    options
  })
}
/** ********************* 免费领取课程 end ********************** */

/** ********************* 渠道投放 ********************** */
/**
 * @method: queryChannelPutDetail
 * @description: 查询渠道活动详情
 */
export function queryChannelPutDetail(
  params: { activityId: string },
  options = <RequestConfigOptions>{ hideErrMsg: true }
): Promise<any> {
  options = Object.assign(options)
  return request({
    url: '/marketing-business/channelPut/queryChannelPutDetail',
    method: 'post',
    data: { appCode: APP_TYPE_CODE, ...params },
    options
  })
}
/**
 * @method: channelPutSubmit
 * @description: 渠道投放数据提交
 */
export function channelPutSubmit(
  params: {
    activityId: string
    productCode: string
    formData: object
    url?: string
  },
  options = <RequestConfigOptions>{}
): Promise<any> {
  options = Object.assign(options, { login: true })
  return request({
    url: '/marketing-business/channelPut/channelPutSubmit',
    method: 'post',
    data: { appCode: APP_TYPE_CODE, ...params },
    options
  })
}
/** ********************* 渠道投放 end ********************** */
/**
 * @method: queryProvinceCityChildList
 * @description: 查询省市列表(有层级)
 */
export function queryProvinceCityChildList(params: any, options = <RequestConfigOptions>{}): Promise<any> {
  options = Object.assign(options)
  return request({
    url: '/zeus/area/queryProvinceCityChildList',
    method: 'post',
    data: params,
    options
  })
}
