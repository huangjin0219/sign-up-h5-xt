/*
 * @Author: jiangruohui
 * @Date: 2022-05-23 15:33:46
 * @LastEditors: jiangruohui
 * @LastEditTime: 2022-06-10 15:19:18
 * @Description:
 */
export type OrderStatus = 1 | 2 | 3 | 4 // 1:已关闭,2:待支付,3:待补费,4:已支付
// 订单商品
export interface OrderProduct {
  productName: number // 商品名称
  productCode: string // 商品编码
  productImage: string // 商品图片
  purchaseNum: number // 商品数量
  isHaveGift: 0 | 1 // 是否附带赠品(YesNoEnum),枚举值:[0:否,1:是]
  originalPrice: number // 原价
  activityPrice: number // 活动价
  realPrice: number // 实付金额
  couponDeductionAmount: number // 优惠券减免金额
  isUesCoupon: 0 | 1 // 是否使用优惠券(YesNoEnum),枚举值:[0:否,1:是]
  serviceEndTime: number // 服务截止时间
  startClassTime: number // 开课时间
  closeClassTime: number // 关课时间
}
// 订单流水
export interface OrderFlow {
  amount: number // 金额
  orderFlowNo: string // 流水编码
  orderFlowSource: number // 订单流水来源(OrderFlowSourceEnum),枚举值:[1:交易流水,2:绑定预支付(预支付流水绑订单时产生),3:换课收款(换课订单多余的金额绑定而来),4:奖学金退费(奖学金退费而来),5:结算]
  orderFlowType: string // 枚举: COLLECT_MONEY,CHANGE_CLASS_COLLECT_MONEY,REFUND,CHANGE_CLASS_REFUND,SETTLEMENT
  payTime: number // 支付时间
}
// 订单列表项
export interface OrderItem {
  arrearsAmount: number // 待补费金额
  lastCloseClassTime?: number // 最晚关课时间
  lastServiceEndTime?: number // 最晚服务截止时间
  orderCanCancel?: boolean // 订单是否可以取消
  orderCode: string // 订单号
  orderCombinationStatus: OrderStatus // 订单状态
  orderOpenInvoiceStatus: 1 | 2 // 订单开票状态,枚举值:[1:已开票,2:未开票]
  orderPayType?: 1 | 2 // 订单支付方式(OrderPayTypeEnum),枚举值:[1:全款支付,2:分期支付]
  orderProductList: Array<OrderProduct> // 商品列表
  purchaseNum: number // 商品数量
  realPayAmount: number // 实付金额
  startClassTime: number // 开课时间
}
// 订单详情
export interface Order {
  orderCode: string // 订单号
  orderCombinationStatus: OrderStatus // 订单状态
  isCanUpdateAddress?: 0 | 1 // 是否可编辑地址(YesNoEnum),枚举值:[0:否,1:是]
  consigneeMobile?: string // 收货手机号
  consigneeName?: string // 收货人姓名
  userAddress?: string // 收货地址
  userAddressId?: string // 收货地址id
  couponCode?: string // 优惠券
  couponCodeName?: string // 优惠券名称
  discountAmount?: string // 优惠金额
  activityAmount: number // 活动价
  orderAmount: number // 原价
  lowestRefundAmount?: number // 最低还款金额
  openClassAmount?: number // 开课金额
  residueShouldPayAmount?: number // 剩余应付金额
  shouldPayAmount?: number // 订单应付金额
  orderFlowList: Array<OrderFlow> // 订单流水列表
  orderPayType: 1 | 2 // 订单支付方式(OrderPayTypeEnum),枚举值:[1:全款支付,2:分期支付]
  orderProductList: Array<OrderProduct> // 商品列表
  orderProductOnlineSignatureStatus: number // 枚举: NOT_ONLINE_SIGNATURE,ALREADY_ONLINE_SIGNATURE,NOT_YET_ONLINE_SIGNATURE
}
