/*
 * @Author: jiangruohui
 * @Date: 2022-07-12 14:05:32
 * @LastEditors: jiangruohui
 * @LastEditTime: 2022-07-15 17:01:02
 * @Description:
 */
export interface PayChannelParam {
  appCode: string // 支付应用
  payChannel: 1 | 2 | 100 // 支付渠道(PayChannelEnum),枚举值:[1:微信,2:支付宝,100:其他]
  payWay: number
  payRouteId: number // 支付路由
  payScene: number // 支付场景(PaySceneEnum),枚举值:[1:pc,2:手机浏览器h5,3:扫码支付,4:小程序,5:app,6:微信jsapi,99:无载体]
  remarks?: string // 备注内容
  sequence?: number // 支付渠道排序
}
