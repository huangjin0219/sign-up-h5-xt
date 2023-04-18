/*
 * @Author: jiangruohui
 * @Date: 2022-03-24 15:12:21
 * @LastEditors: jiangruohui
 * @LastEditTime: 2022-07-15 10:19:46
 * @Description:
 */
import request, { RequestConfigOptions } from '@/utils/request'
import { BIZ_TYPE } from '@/config'

const applyUrl = '/crm-business'

/**
 * @method: queryInvoiceListByOrderCode
 * @description: 查询某个订单的开票记录
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function queryInvoiceListByOrderCode(params: any, options = <RequestConfigOptions>{}) {
  options = Object.assign(options, { login: true })
  return request({
    url: `${applyUrl}/invoice/listByOrderCode`,
    method: 'post',
    data: params,
    options
  })
}

/**
 * @method: openInvoice
 * @description: 申请开票
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function openInvoice(
  params: any,
  // {
  //   address?: string // 发票邮寄地址，纸质票必填json字符串：{“id”:1,”phone”:”12345678922”,”address”:”浙江杭州下城城建大厦”，”name”:”张三”}
  //   invoiceAmount: number
  //   invoiceLine: number // 开票金额
  //   invoiceTaxNum?: string // 发票种类：1普通发票(电票)(默认)，2专用发票(InvoiceLineEnum),枚举值:[1:普通发票,2:专用发票]
  //   invoiceTitle: string // 购方税号，企业票必填
  //   invoiceTitleType: number // 抬头名称
  //   orderCode: string
  // },
  options = <RequestConfigOptions>{}
) {
  options = Object.assign(options, { login: true })
  return request({
    url: `${applyUrl}/invoice/issueInvoice`,
    method: 'post',
    data: { ...params, bizType: BIZ_TYPE },
    options
  })
}

/**
 * @method: invoiceDetele
 * @description: 删除发票
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function invoiceDetele(params: any, options = <RequestConfigOptions>{}) {
  options = Object.assign(options, { login: true })
  return request({
    url: `${applyUrl}/invoice/delete`,
    method: 'post',
    data: params,
    options
  })
}
