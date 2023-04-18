/*
 * @Author: jiangruohui
 * @Date: 2022-07-05 17:13:11
 * @LastEditors: jiangruohui
 * @LastEditTime: 2022-10-31 11:50:44
 * @Description:
 */
import request, { RequestConfigOptions } from '@/utils/request'

/**
 * @method: getLogisticsOrderRecord
 * @description: 获取所有的物流信息列表
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function getLogisticsOrderRecord(
  params: { logisticsStatus?: number | null },
  options = <RequestConfigOptions>{}
) {
  options = Object.assign(options, { login: true })
  return request({
    url: '/crm-business/logistics/getLogisticsOrderRecord',
    method: 'post',
    data: params,
    options
  })
}

/**
 * @method: getLogisticsOrderById
 * @description: 根据物流id获取物流详情
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function getLogisticsOrderById(params: { logisticsId?: string }, options = <RequestConfigOptions>{}) {
  options = Object.assign(options, { login: true })
  return request({
    url: '/crm-business/logistics/getLogisticsOrderById',
    method: 'post',
    data: params,
    options
  })
}

/**
 * @method: getLogisticsOrderRecordCount
 * @description: 根据物流id获取物流详情
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function getLogisticsOrderRecordCount(
  params: { logisticsStatusEnumList?: Array<any> },
  options = <RequestConfigOptions>{}
) {
  options = Object.assign(options, { login: true })
  return request({
    url: '/crm-business/logistics/getLogisticsOrderRecordCount',
    method: 'post',
    data: params,
    options
  })
}

/**
 * @method: logisticsUpdateAddress
 * @description: 修改物流发货地址
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function logisticsUpdateAddress(
  params: {
    logisticsAddressBO: {
      address: string
      area: string
      areaId: [number, string]
      city: string
      cityId: [number, string]
      province: string
      provinceId: [number, string]
      mobile: string
      name: string
    }
    logisticsId: number
    orderCode: string
    userAddressId: number
  },
  options = <RequestConfigOptions>{}
) {
  options = Object.assign(options, { login: true })
  return request({
    url: '/crm-business/logistics/logisticsUpdateAddress',
    method: 'post',
    data: params,
    options
  })
}
