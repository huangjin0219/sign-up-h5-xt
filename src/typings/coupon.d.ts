/*
 * @Author: jiangruohui
 * @Date: 2022-04-18 15:42:53
 * @LastEditors: jiangruohui
 * @LastEditTime: 2022-11-14 10:23:49
 * @Description: 优惠券定义
 */
export interface Coupon {
  attendClassTypes: number[] // 上课类型AttendClassTypeEnum
  canUserProductCodes: string[] // 适用于哪些商品
  couponsCode: string // 优惠券码
  couponsFaceValue: number // 优惠券面值，单位分,（折扣券9.5折或直减券150元）
  couponsName: string // 优惠券名称
  couponsTemplateId: number // 优惠券模板id
  couponsType: number // 券类型：1折扣券，2直减券(CouponsTypeEnum),枚举值:[1:折扣券,2:满减券]
  couponsTypeDesc: string
  description: string // 券描述
  exchangeCoupons: number // 是否为兑换券 1是 0否
  issueCouponsId: number // 发行id
  receiveCount: number // 已领取数量
  receiveStatus: number // 领取状态(CouponsUserReceiveStatusTypeEnum),枚举值:[1:已领取,0:未领取]
  receiveStatusDesc: string
  useMoneyRestrict: number // 满多少元可用
  useReceiveProductRange: number // 限制使用商品范围(CouponsUsedGoodsRangeTypeEnum),枚举值:[1:全平台通用,2:指定商品,3:指定类目]
  useReceiveProductRangeDesc: string
  useReduceHighest: number // 减免上线
  useValidTimeType: number // 使用有效时间类型 1固定时间，2滑动时间(CouponsUsedValidTimeTypeEnum),枚举值:[1:固定时间,2:滑动时间]
  useValidTimeTypeDesc: string
  useValidHour: number // 滑动时间 领取后多少小时可用
  validStartTime: string // 固定时间使用有效结束时间，时间戳
  validEndTime: string // 固定时间使用有效开始时间，时间戳
  [propName: string]: any
}
