/*
 * @Author: jiangruohui
 * @Date: 2020-12-02 09:46:13
 * @LastEditors: jiangruohui
 * @LastEditTime: 2023-03-17 14:04:51
 * @Description:
 */
// import { BIZ_TYPE } from '@/config/index'
import request from '@/utils/adminRequest'
import { APP_CODE } from '@/config/admin'

/** ********************* 邀请注册 ********************** */
/**
 * @method: queryInvitationRegisterActivityList
 * @description: 查询邀请注册活动列表 - 销售端
 */
export function queryInvitationRegisterActivityList(params: {
  pageNum: number
  pageSize: number
  projectCode: string
}): Promise<any> {
  return request({
    url: '/marketing-boss/admin/invitationRegisterActivity/queryInvitationRegisterActivityList',
    method: 'post',
    data: { ...params }
  })
}

/**
 * @method: queryInvitationRegisterActivityDetail
 * @description: 查询邀请注册活动详情 - 销售端
 */
export function queryInvitationRegisterActivityDetail(params: { activityId: string }): Promise<any> {
  return request({
    url: '/marketing-boss/admin/invitationRegisterActivity/queryInvitationRegisterActivityDetail',
    method: 'post',
    data: { ...params }
  })
}

/**
 * @method: queryInvitationRegisterActivityDetail
 * @description: 查询邀请注册活动数据列表 - 销售端
 */
export function queryInvitationRegisterActivityDataList(params: {
  pageNum: number
  pageSize: number
  activityId: string
  staffId: string
}): Promise<any> {
  return request({
    url: '/marketing-boss/admin/invitationRegisterActivity/queryInvitationRegisterActivityDataList',
    method: 'post',
    data: { ...params }
  })
}

/**
 * @method: queryDimensionalBarcode
 * @description: 生成小程序码 - 销售端
 */
export function queryDimensionalBarcode(params: { url: string }): Promise<any> {
  return request({
    url: '/marketing-boss/admin/invitationRegisterActivity/queryDimensionalBarcode',
    method: 'get',
    data: { ...params }
  })
}

/**
 * @method: createSceneQrCode
 * @description: 生成二维码
 */
export function createSceneQrCode(params: { sceneCode: string; params: any }): Promise<any> {
  return request({
    url: '/marketing-boss/admin/qrCodeScene/createSceneQrCode',
    method: 'post',
    data: { ...params }
  })
}

/**
 * @method: saleCopyMobile
 * @description: 拷贝手机号
 */
export function getSaleCopyMobile(params: { actionType: number; id: number }): Promise<any> {
  return request({
    url: '/crm-boss/admin/clue/workbench/saleCopyMobile',
    method: 'post',
    data: { ...params }
  })
}

/** ********************* 邀请注册 end ********************** */
/**
 * @method: ShareRecord
 * @description: 员工分享 - 销售端
 * {
 *  shareAppCode: string, // 分享应用编号
 *  shareDataId: string, // 分享内容ID(活动:活动ID、章节练习(章节编号)、试券(试卷编号)、每日一练(每日一练ID)、智能组卷(组卷编号)、录播(录播ID)、直播(直播ID)、商品(商品编号))
 *  shareDataName: string, // 分享内容名称
 *  shareDataType: string, // 分享内容类型分享内容类型(ShareDataTypeEnum),枚举值:[2:章节练习,3:试卷,4:每日一练,5:智能组卷,6:课程(直播/录播/音频),7:商品,8:公开课,8:题目,9:砍价活动,10:转介绍活动,11:免费拼团,12:收费拼团,13:卡密,14:扫码获课,15:限时优惠,16:邀请注册,17:赠课活动,18:渠道投放,19:裂变活动,20:模考大赛,21:红包活动,1001:首页,1002:公开课列表,1003:创建智能组卷,1004:答疑通道,1004:试卷列表]
 *  sharePageName: string, // 分享页面名称
 *  sharePageUrl: string, // 分享页面链接
 * }
 */
export function shareRecord(params: {
  shareDataId: string
  shareDataName: string
  shareDataType: number
  sharePageName: string
  sharePageUrl: string
}): Promise<any> {
  return request({
    url: '/marketing-boss/admin/share/shareRecord',
    method: 'post',
    data: { shareAppCode: APP_CODE, ...params }
  })
}
