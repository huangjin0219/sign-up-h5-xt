/*
 * @Author: jiangruohui
 * @Date: 2022-03-24 15:31:59
 * @LastEditors: jiangruohui
 * @LastEditTime: 2023-03-13 16:49:41
 * @Description:
 */
type Item = {
  name: string
  value: any
  label?: string
}
/**
 * @Author: jiangruohui
 * @method: genPseudoEnum
 * @description: 生成伪枚举
 * @param {[Item]} list
 * @return {object} { item1.name: item1.value, item1.value: item1.label }
 */
const genPseudoEnum = (list: Array<Item>) => {
  const obj: any = {}
  list.forEach((item) => {
    obj[item.name] = item.value
    if (item.label) {
      obj[item.value] = item.label
    }
  })
  return obj
}

// 广告跳转方式 0.无跳转, 1.webUrl跳转, 2.APP跳转, 3.小程序内部跳转
export enum AdvJumpType {
  NoJump,
  Weburl,
  App,
  Minipro
}

/** ***************************  授权 start  **************************** */
// 登录验证类型(2手机号验证码，3手机号密码)
export enum LoginVerificationType {
  MobileCaptch = 2,
  MobilePsw = 3
}

// 登录操作类型（1:登录，2:注册，3:登录或注册）
export enum LoginOperationType {
  Login = 1,
  Register = 2,
  LoginOrRegister = 3
}

/** ***************************  授权 end  **************************** */

/** ***************************  课程 start  **************************** */
// 课程类型 1.直播课程 2.录播课程 3.音频课程
// export const COURSE_TYPE_LIVE = 1
// export const COURSE_TYPE_VIDEO = 2
// export const COURSE_TYPE_AUDIO = 3
export enum CourseType {
  Live = 1,
  Video = 2,
  Audio = 3
}

// // 公开课类型 1.直播课程 2.录播课程
// export const PUB_COURSE_TYPE_LIVE = 1
// export const PUB_COURSE_TYPE_RECORD = 2

// // cc播放模式 2.大屏模式（点播）, 5.文档模式（双屏，回放）
// export const CCLIVE_MODEL_SCREEN = 2
// export const CCLIVE_MODEL_DOCUMENT = 5

// 直播状态 1.未开始, 2.即将直播, 3.直播中, 4.已结束, 5.回放
export const LiveStatus = genPseudoEnum([
  { name: 'NotStart', label: '未开始', value: 1 },
  { name: 'Soon', label: '即将开始', value: 2 },
  { name: 'Living', label: '直播中', value: 3 },
  { name: 'End', label: '已结束', value: 4 },
  { name: 'Replay', label: '查看回放', value: 5 }
])

// 考期 1:固定考期,2:不固定考期)
export enum ExamPeriodType {
  Fixed = 1,
  NotFixed = 2
}
// 商品类型(SaleProductTypeEnum),枚举值:[1:常规商品,2:自选商品,3:活动商品]
export enum SaleProductType {
  Common = 1,
  Optional = 2,
  Activity = 3
}

// 商品状态(OrderProductStatusEnum),枚举值:[1:待开课,2:已开课,3:已关课,4:可申请续读,5:续读审核中,6: 休学中]
export enum OrderProductStatus {
  NotOpenCourse = 1,
  AlreadyOpenCourse = 2,
  Closed = 3,
  ContinuedReading = 4,
  ContinuedReadingCheck = 5,
  QuitSchool = 6
}
/** ***************************  课程 end  **************************** */

/** ***************************  优惠券开始  **************************** */
// 优惠券类型（1折扣券，2直减券）
export enum CouponType {
  Discount = 1,
  DirectReduction = 2
}
// 是否为兑换券（0否，1是）
export enum ExchangeCoupon {
  NoExchange,
  Exchange
}
// 限制使用商品范围(1全平台通用,2指定商品,3指定类目)
export enum CouponUseRange {
  FullPlatform = 1,
  AppointGoods = 2,
  appointCategory = 3
}
// 使用有效时间类型(1固定时间，2滑动时间)
export enum CouponEffectiveTime {
  FixedTime = 1,
  SlideTime = 2
}
/** ***************************  优惠券结束  **************************** */

/** ***************************  订单 start  **************************** */
// 订单联合状态 1:已关闭,2:待支付,3:待补费,4:已支付
export const OrderCombinationStatus = genPseudoEnum([
  { name: 'Close', label: '已关闭', value: 1 },
  { name: 'Unpaid', label: '待支付', value: 2 },
  { name: 'Arrears', label: '待补费', value: 3 },
  { name: 'Paid', label: '已支付', value: 4 }
])

// 订单流水支付状态(OrderFlowPayStatusEnum),枚举值:[1:待支付,2:已完成,3:支付失败,4:已取消]
export enum OrderFlowPayStatus {
  Unpaid = 1,
  Success = 2,
  Fail = 3,
  Cancel = 4
}

// 订单支付方式(OrderPayTypeEnum),枚举值:[1:全款支付,2:分期支付]
export enum OrderPayType {
  FullPayment = 1,
  StagingPayment = 2
}

// 支付场景 1:pc,2:手机浏览器h5,3:扫码支付,4:小程序,5:app,6:微信jsapi,7:支付宝h5,99:无载体
export enum PayScene {
  PC = 1,
  H5 = 2,
  ScanQrcode = 3,
  MiniPro = 4,
  App = 5,
  WechatJsApi = 6,
  AliPayAuthH5 = 7,
  None = 99
}

// 支付方式
export enum PayWay {
  WechatJSAPI = 1, // 微信jsapi支付
  AlipayH5 = 11, // 支付宝h5支付
  XingYeWechatJSAPI = 15, // 兴业银行公众号小程序支付,
  XingYeAlipayH5 = 17 // 兴业银行支付宝服务窗支付
}

// 支付渠道 1.微信, 2.支付宝
export enum PayChannel {
  Wechat = 1,
  Alipay = 2
}

// 订单开票状态(OrderOpenInvoiceStatusEnum),枚举值:[1:已开票,2:未开票]
export enum OrderOpenInvoiceStatus {
  AlreadyOpenInvoice = 1,
  NotOpenInvoice = 2
}

// 续读用户申请状态(UserSubmitStatusEnum),枚举值:[1:申请中,2:申请失败,3:申请成功]
export enum ProceedReadingUserSubmitStatus {
  InReview = 1,
  Reject = 2,
  Complete = 3
}

// 是否调整优惠金额(YesNoEnum),枚举值:[0:否,1:是]
export enum WhetherAdjustAmountStatus {
  UnadjustedAmount = 0,
  AdjustmentAmount = 1
}

/** ***************************  订单 end  **************************** */

/** ***************************  物流 start  **************************** */
// 物流单状态 1待签订课程合同；2待确认；3待发货；4部分发货；5已发货；4已取消；6修改中
export const LogisticsStatus = genPseudoEnum([
  { name: 'NotSignOnline', label: '签订课程后发货', value: 1 },
  { name: 'Unconfirmed', label: '待确认', value: 2 },
  { name: 'Unshipped', label: '待发货', value: 3 },
  { name: 'PartShipped', label: '部分发货', value: 4 },
  { name: 'Shipped', label: '已发货', value: 5 },
  { name: 'Cancel', label: '已取消', value: 6 },
  { name: 'Update', label: '修改中', value: 7 }
])
/** ***************************  物流 end  **************************** */

/** ***************************  发票 start  **************************** */
// 抬头类型:1个人，2企业(InvoiceTitleTypeEnum),
export enum InvoiceTitleTypeEnum {
  Person = 1,
  Company = 2
}

// 发票类型：1普通发票(电票)(默认)，2专用发票
export enum InvoiceTypeEnum {
  Normal = 1,
  Special = 2
}
export const InvoiceTypeEnumList = [
  {
    name: '普通发票',
    value: InvoiceTypeEnum.Normal
  },
  {
    name: '专用发票',
    value: InvoiceTypeEnum.Special
  }
]
/** ***************************  发票 end  **************************** */

// 用户属性 0：新用户，1：激活用户，2：已有销售跟进
export const clueFollowStatus = genPseudoEnum([
  { name: 'new', label: '新用户', value: 0 },
  { name: 'actived', label: '激活用户', value: 1 },
  { name: 'followed', label: '已有销售跟进', value: 2 }
])

export const defaultProject = {
  name: '全部分类',
  code: ''
}

/** ***************************  活动  **************************** */
// 1:砍价活动,2:转介绍活动,3:免费拼团,4:收费拼团,5:卡密,6:扫码获课,7:限时优惠,8:邀请注册
export enum ActivityTypeEnum {
  Bargain = 1,
  Spokesman = 2,
  FreeSpell = 3,
  PaidSpell = 4,
  InviteRegist = 8
}

export const activityOrderPayStatus = genPseudoEnum([
  { name: 'unPay', label: '未支付', value: 0 },
  { name: 'paid', label: '已支付', value: 1 }
])

// 分享内容类型
// 4:每日一练,6:课程(直播/录播/音频),7:商品,8:公开课,10:免费拼团,11:收费拼团,12:扫码获课,13:邀请注册,14:赠课活动,15:渠道投放,16:模考大赛,1001:首页,1002:公开课列表,1003:创建智能组卷
export enum ShareDataType {
  Invite = 13
}
/** ***************************  活动 end  **************************** */

export const NationEnum = [
  { value: 1, name: '汉族' },
  { value: 2, name: '蒙古族' },
  { value: 3, name: '回族' },
  { value: 4, name: '藏族' },
  { value: 5, name: '维吾尔族' },
  { value: 6, name: '苗族' },
  { value: 7, name: '彝族' },
  { value: 8, name: '壮族' },
  { value: 9, name: '布依族' },
  { value: 10, name: '朝鲜族' },
  { value: 11, name: '满族' },
  { value: 12, name: '侗族' },
  { value: 13, name: '瑶族' },
  { value: 14, name: '白族' },
  { value: 15, name: '土家族' },
  { value: 16, name: '哈尼族' },
  { value: 17, name: '哈萨克族' },
  { value: 18, name: '傣族' },
  { value: 19, name: '黎族' },
  { value: 20, name: '傈僳族' },
  { value: 21, name: '佤族' },
  { value: 22, name: '畲族' },
  { value: 23, name: '高山族' },
  { value: 24, name: '拉祜族' },
  { value: 25, name: '水族' },
  { value: 26, name: '东乡族' },
  { value: 27, name: '纳西族' },
  { value: 28, name: '景颇族' },
  { value: 29, name: '柯尔克孜族' },
  { value: 30, name: '土族' },
  { value: 31, name: '达斡尔族' },
  { value: 32, name: '仫佬族' },
  { value: 33, name: '羌族' },
  { value: 34, name: '布朗族' },
  { value: 35, name: '撒拉族' },
  { value: 36, name: '毛南族' },
  { value: 37, name: '仡佬族' },
  { value: 38, name: '锡伯族' },
  { value: 39, name: '阿昌族' },
  { value: 40, name: '普米族' },
  { value: 41, name: '塔吉克族' },
  { value: 42, name: '怒族' },
  { value: 43, name: '乌孜别克族' },
  { value: 44, name: '俄罗斯族' },
  { value: 45, name: '鄂温克族' },
  { value: 46, name: '德昂族' },
  { value: 47, name: '保安族' },
  { value: 48, name: '裕固族' },
  { value: 49, name: '京族' },
  { value: 50, name: '塔塔尔族' },
  { value: 51, name: '独龙族' },
  { value: 52, name: '鄂伦春族' },
  { value: 53, name: '赫哲族' },
  { value: 54, name: '门巴族' },
  { value: 55, name: '珞巴族' },
  { value: 56, name: '基诺族' },
  { value: 57, name: '其他' },
  { value: 58, name: '外国血统中国籍人士' }
]

export const GenderEnum = [
  { value: 0, name: '未知' },
  { value: 1, name: '男' },
  { value: 2, name: '女' }
]
