/*
 * @Author: jiangruohui
 * @Date: 2023-01-05 10:04:42
 * @LastEditors: jiangruohui
 * @LastEditTime: 2023-01-05 10:18:21
 * @Description:
 */
export interface Advert {
  adImageUrl: string // 广告图片
  adJumpUrl: string | null // 广告跳转
  appType: number // app类型
  appTypeDesc: string // app类型描述
  jumpType: 0 | 1 | 2 | 3 // 广告跳转方式 NO_JUMP(0, "无跳转"),PCWEB(1, "webUrl跳转"),APP(2, "APP跳转"),WECHAT_MINIPROGRAM(3, "小程序跳转");
  jumpTypeDesc: string // 广告跳转方式描述
  sequence: number // 序列号
  validEndTime: number // 有效期开始时间
  validStartTime: number // 有效期截止时间
}
