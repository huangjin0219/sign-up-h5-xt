/*
 * @Author: liushuainan
 * @Date: 2022-04-13 15:37:52
 * @LastEditors: liushuainan
 * @LastEditTime: 2022-04-13 16:20:10
 * @Description:
 */
import request, { RequestConfigOptions } from '@/utils/request'
// import { BIZ_TYPE, APP_TYPE, APP_TYPE_CODE, CRM_CHANNEL_FIRST, CRM_CHANNEL_SECOND } from '@/config'

/**
 * @method: queryListByBizType
 * @description: 查询商品组合列表
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
// eslint-disable-next-line import/prefer-default-export
export function queryListByBizType(params = {}, options = <RequestConfigOptions>{}) {
  options = Object.assign(options)
  return request({
    url: '/zeus/category/queryListByBizType',
    method: 'post',
    data: { ...params },
    options
  })
}
